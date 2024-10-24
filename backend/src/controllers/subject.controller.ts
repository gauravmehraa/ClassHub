import { Request, Response } from "express";
import Subject from "../models/subject.model";
import { ISubject } from "../types/subject.type";
import Class from "../models/class.model";
import insertLog from "../utils/log";

export const getSubjects = async(req: Request, res: Response) => {
  try{
    const { _id, classID } = req.user;
    const role = req.cookies.role;
    let subjects: any[] = [];
    if(role === "Teacher"){
      subjects = await Subject.find({
        teacherID: { $eq: { _id } }
      }).select("-createdAt -updatedAt -__v");
    }
    else{
      const temp = await Class.findById(classID).select("subjects").populate({
        path: "subjects",
        select: "-createdAt -updatedAt -__v"
      });
      if(!temp){
        res.status(500).json({error: "No subjects"});
        return;
      }
      subjects = temp.subjects;
    }
    res.status(200).json(subjects);
  }
  catch (error) {
    console.log(`[ERROR] - Get Subjects Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getAllSubjects = async(req: Request, res: Response) => {
  try{
    const subjects: ISubject[] = await Subject.find().select("-createdAt -updatedAt -__v");
    res.status(200).json(subjects);
  }
  catch (error) {
    console.log(`[ERROR] - Get Subjects Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getSubjectsByClass = async(req: Request, res: Response) => {
  try{
    const { id: classID } = req.params;
    const subjects = await Class.findById(classID).select("subjects").populate({
      path: "subjects",
      select: "-createdAt -updatedAt -__v"
    });
    res.status(200).json(subjects?.subjects || []);
  }
  catch (error) {
    console.log(`[ERROR] - Get Subjects By Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addSubject = async(req: Request, res: Response) => {
  try{
    const { id: teacherID } = req.user;
    const { name } = req.body;

    const existingSubject: ISubject[] = await Subject.find({ name: { $eq: name } });

    if(existingSubject.length !== 0){
      res.status(400).json({error: "Subject is already registered"});
      return;
    }
    
    const newSubject = new Subject({ name, teacherID });
    if(newSubject){
      await newSubject.save();
      await insertLog({
        userID: teacherID,
        userType: "Teacher",
        action: `created subject `,
        targetID: newSubject._id,
        targetType: "Subject"
      });
      res.status(201).json({
        _id: newSubject._id,
        name: newSubject.name,
        teacherID: newSubject.teacherID
      });
    }
    else{
      res.status(400).json({ error: "Invalid data" });
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Subject Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editSubject = async(req: Request, res: Response) => {
  try{
    const { id: subjectID } = req.params;
    const { name, teacherID } = req.body;

    const subject = await Subject.findOneAndUpdate(
      { _id: subjectID },
      { name, teacherID },
      { new: true }
    );

    if(!subject){
      res.status(500).json({ error: "No subject to be edited" });
      return;
    }

    await subject.save();
    res.status(200).json(subject);

  }
  catch (error) {
    console.log(`[ERROR] - Edit Subject Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const allocateSubject = async(req: Request, res: Response) => {
  try{
    const { classID, subjectID } = req.body;
    const id = req.user._id;

    const updatedClass = await Class.findById(classID);
    
    if(!updatedClass){
      res.status(500).json({ error: "No class to be allocated" });
      return;
    }

    updatedClass.subjects.push(subjectID);
    await updatedClass.save();
    await insertLog({
      userID: id,
      userType: "Teacher",
      action: `alloted subject for `,
      targetID: classID,
      targetType: "Class"
    });
    res.status(200).json(updatedClass);
  }
  catch (error) {
    console.log(`[ERROR] - Allocate Subject to Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}