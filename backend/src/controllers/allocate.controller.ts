import { Request, Response } from "express";
import Student from "../models/student.model";
import Class from "../models/class.model";

export const allocateClassToStudent = async(req: Request, res: Response) => {
  try{
    const { id: studentID } = req.params;
    const { classID } = req.body;

    const updatedStudent = await Student.findByIdAndUpdate(
      studentID,
      { classID },
      { new: true }
    );

    if(!updatedStudent){
      res.status(500).json({ error: "No student to be allocated" });
      return;
    }

    await updatedStudent.save();
    res.status(200).json(updatedStudent);
  }
  catch (error) {
    console.log(`[ERROR] - Allocate Class to Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const allocateSubjectToClass = async(req: Request, res: Response) => {
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