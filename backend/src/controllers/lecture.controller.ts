import { Request, Response } from "express";
import Class from "../models/class.model";
import Subject from "../models/subject.model";
import Lecture from "../models/lecture.model";

export const getLecturesByClass = async(req: Request, res: Response): Promise<void> => {
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

    const lectures = await Lecture.find({
      subjectID: { $in: Object.keys(subjectsMap) },
      status: { $ne: "Finished" },
    }
    ).select("-createdAt -updatedAt -__v");

    res.status(200).json(lectures);
  }
  catch (error) {
    console.log(`[ERROR] - Get Lectures by Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getLecturesByTeacher = async(req: Request, res: Response): Promise<void> => {
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

    const lectures = await Lecture.find({
      teacherID: { $eq: teacherID },
      subjectID: { $in: Object.keys(subjectsMap) },
      status: { $ne: "Finished" },
    });

    res.status(200).json(lectures);
  }
  catch (error) {
    console.log(`[ERROR] - Get Lectures by Teacher Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addLecture = async(req: Request, res: Response) => {
  try{

  }
  catch (error) {
    console.log(`[ERROR] - Add Lecture Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editLecture = async(req: Request, res: Response) => {
  try{

  }
  catch (error) {
    console.log(`[ERROR] - Edit Lecture Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteLecture = async(req: Request, res: Response) => {
  try{
    
  }
  catch (error) {
    console.log(`[ERROR] - Delete Lecture Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}