import { Request, Response } from "express";
import Subject from "../models/subject.model";
import { ISubject } from "../types/subject.type";
import Class from "../models/class.model";

export const getSubjects = async(req: Request, res: Response) => {
  try{
    const subjects: ISubject[] = await Subject.find().select("-createdAt -updatedAt -__v");
    res.status(200).json(subjects);
  }
  catch (error) {
    console.log(`[ERROR] - Get Subjects Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addSubject = async(req: Request, res: Response) => {
  try{
    const { id: teacherID } = req.user._id;
    const { name } = req.body;

    const existingSubject: ISubject[] = await Subject.find({ name: { $eq: name } });

    if(existingSubject.length !== 0){
      res.status(400).json({error: "Subject is already registered"});
      return;
    }
    
    const newSubject = new Subject({ name, teacherID });
    if(newSubject){
      await newSubject.save();
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

export const deleteSubject = async(req: Request, res: Response) => {
  try{
    const { id: subjectID } = req.params;

    const subject = await Subject.findById(subjectID);

    if(!subject){
      res.status(500).json({ error: "No subject to be deleted" });
      return;
    }

    await Subject.findByIdAndDelete(subjectID);
    res.status(200).json({ message: "Subject successfully deleted" });

  }
  catch (error) {
    console.log(`[ERROR] - Delete Subject Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const allocateSubject = async(req: Request, res: Response) => {
  try{
    const { id: classID } = req.params;
    const { subjects } = req.body;

    const updatedClass = await Class.findByIdAndUpdate(
      classID,
      { subjects },
      { new: true }
    );

    if(!updatedClass){
      res.status(500).json({ error: "No class to be allocated" });
      return;
    }

    await updatedClass.save();
    res.status(200).json(updatedClass);
  }
  catch (error) {
    console.log(`[ERROR] - Allocate Subject to Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}