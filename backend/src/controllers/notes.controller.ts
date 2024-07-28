import { Request, Response } from "express";
import { connectToS3 } from "../connections/aws";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { generateFilename, extractFilename } from "../utils/filename";
import Note from "../models/notes.model";

export const addNote = async(req: Request, res: Response) => {
  try{
    const { subjectID, title, description } = req.body;
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

export const deleteNote = async(req: Request, res: Response) => {
  try{
    const { id: noteID } = req.params;
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

    await note.deleteOne();
    res.status(201).json({message: "Note successfully deleted"});
  }
  catch (error) {
    console.log(`[ERROR] - Delete Note Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}