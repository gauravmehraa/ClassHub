import { Request, Response } from "express";
import { connectToS3 } from "../connections/aws";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { generateFilename, extractFilename } from "../utils/filename";
import Note from "../models/notes.model";
import Class from "../models/class.model";
import Subject from "../models/subject.model";
import insertLog from "../utils/log";

export const getNotesByClass = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: classID } = req.params;
    const existingClass = await Class.findById(classID).select("subjects").populate("subjects");
    if(!existingClass){
      res.status(500).json({error: "Invalid class ID"});
      return;
    }

    const subjectsMap: Record<string, string> = existingClass.subjects.reduce((acc: any, subject: any) => {
      acc[subject._id] = subject.name;
      return acc;
    }, {});

    const notes = await Note.find(
      { subjectID: { $in: Object.keys(subjectsMap) }}
    ).select("-updatedAt -__v");

    const formattedNotes: any = {}
    for(const note of notes){
      const subjectName = subjectsMap[note.subjectID.toString()];
      if (!formattedNotes[subjectName]) {
        formattedNotes[subjectName] = [];
      }
      formattedNotes[subjectName].push(note);
    }
    res.status(200).json(formattedNotes);
  }
  catch (error) {
    console.log(`[ERROR] - Get Notes by Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getNotesByTeacher = async(req: Request, res: Response): Promise<void> => {
  try{
    const teacherID = req.user._id;

    const subjects = await Subject.find({ teacherID: { $eq: teacherID }});
    if(!subjects){
      res.status(500).json({error: "No subjects alloted"});
      return;
    }

    const subjectsMap: Record<string, string> = subjects.reduce((acc: any, subject: any) => {
      acc[subject._id] = subject.name;
      return acc;
    }, {});

    const notes = await Note.find(
      { subjectID: { $in: Object.keys(subjectsMap) }}
    ).select("-updatedAt -__v");

    const formattedNotes: any = {}
    for(const note of notes){
      const subjectName = subjectsMap[note.subjectID.toString()];
      if (!formattedNotes[subjectName]) {
        formattedNotes[subjectName] = [];
      }
      formattedNotes[subjectName].push(note);
    }
    res.status(200).json(formattedNotes);
  }
  catch (error) {
    console.log(`[ERROR] - Get Notes by Teacher Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addNote = async(req: Request, res: Response) => {
  try{
    const { subjectID, title, description } = req.body;
    const { id: teacherID } = req.user;
    const file = req.file;
    
    const s3 = await connectToS3();

    if(!s3){
      throw new Error("Error connecting to S3");
    }

    let url = '';
    const filename = generateFilename(title, (file.originalname || file.filename) as string);

    const putParameters = {
      Bucket: 'student-management-dev',
      Body: file.buffer,
      Key: filename,
      ContentType: file.mimetype
    }
    const putCommand = new PutObjectCommand(putParameters);
    await s3.send(putCommand);

    url = `https://student-management-dev.s3.ap-south-1.amazonaws.com/${filename}`

    const data: any = { subjectID, title, url };
    if(description) data.description = description;

    const note = new Note(data);
    if(note){
      await note.save();
      await insertLog({
        userID: teacherID,
        userType: "Teacher",
        action: `uploaded notes `,
        targetID: note._id,
        targetType: "Note"
      });
      res.status(201).json(note);
    }
    else{
      res.status(400).json({error: "Invalid Note Data"});
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Note Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editNote = async(req: Request, res: Response) => {
  try{
    const { id: noteID } = req.params;
    const { id: teacherID } = req.user;
    const { title, description } = req.body;
    const file = req.file;
    
    const s3 = await connectToS3();

    if(!s3){
      throw new Error("Error connecting to S3");
    }

    const note = await Note.findById(noteID);
    if(!note){
      res.status(500).json({ error: "No note to be edited" });
      return;
    }

    const updatedData: any = { title, description };
    if(file){
      const deleteParameters = {
        Bucket: 'student-management-dev',
        Key: extractFilename(note.url),
      }
      const deleteCommand = new DeleteObjectCommand(deleteParameters);
      await s3.send(deleteCommand);
      
      const filename = generateFilename(title, (file.originalname || file.filename) as string);
      const putParameters = {
        Bucket: 'student-management-dev',
        Body: file.buffer,
        Key: filename,
        ContentType: file.mimetype
      }
      const putCommand = new PutObjectCommand(putParameters);
      await s3.send(putCommand);
      updatedData.url = `https://student-management-dev.s3.ap-south-1.amazonaws.com/${filename}`
    }
    const updatedNote = await Note.findByIdAndUpdate(
      noteID,
      updatedData,
      { new: true }
    );
    if(!updatedNote){
      res.status(500).json({error: "No note to be edited"});
      return;
    }
    await updatedNote.save();
    await insertLog({
      userID: teacherID,
      userType: "Teacher",
      action: `edited notes `,
      targetID: updatedNote._id,
      targetType: "Note"
    });
    res.status(200).json(updatedNote);

  }
  catch (error) {
    console.log(`[ERROR] - Edit Note Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteNote = async(req: Request, res: Response) => {
  try{
    const { id: noteID } = req.params;
    const { id: teacherID } = req.user;
    const s3 = await connectToS3();

    if(!s3){
      throw new Error("Error connecting to S3");
    }

    const note = await Note.findById(noteID);
    
    if(!note){
      res.status(500).json({error: "No note to be deleted"});
      return;
    }
    const deleteParameters = {
      Bucket: 'student-management-dev',
      Key: extractFilename(note.url),
    }

    const deleteCommand = new DeleteObjectCommand(deleteParameters);
    await s3.send(deleteCommand);
    await insertLog({
      userID: teacherID,
      userType: "Teacher",
      action: `delete note ${note.title}`,
    });
    await note.deleteOne();
    res.status(201).json({message: "Note successfully deleted"});
  }
  catch (error) {
    console.log(`[ERROR] - Delete Note Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}