import { Request, Response } from "express";import Student from "../models/student.model";
import Class from "../models/class.model";

export const getStudentsByClass = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: classID } = req.params;
    const existingClass = await Class.findById(classID);
    if(!existingClass){
      res.status(500).json({ error: "Class does not exist" });
      return;
    }
    const students = await Student.find({ classID: { $eq: classID } }).select("-hashedPassword -createdAt -updatedAt -__v");
    res.status(200).json(students);
  }
  catch (error) {
    console.log(`[ERROR] - Get Students by Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteStudent = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: studentID } = req.params;
    const student = await Student.findByIdAndDelete(studentID);
    if(!student){
      res.status(500).json({ error: "Student does not exist" });
      return;
    }
    res.status(200).json({ message: "Student deleted" });
  }
  catch (error) {
    console.log(`[ERROR] - Delete Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}