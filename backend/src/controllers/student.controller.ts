import { Request, Response } from "express";import Student from "../models/student.model";
import Class from "../models/class.model";
import { ISubject } from "../types/subject.type";
import Subject from "../models/subject.model";
import { IClass } from "../types/class.type";
import { IStudent } from "../types/student.type";

export const getStudentsByTeacher = async(req: Request, res: Response): Promise<void> => {
  try{
    const id  = req.user._id;
    const subjects: ISubject[] = await Subject.find(
      { teacherID: { $eq: id } }
    );
    const classes: IClass[] = await Class.find(
      { subjects: { $in: subjects }}
    );
    const students: any = await Student.find(
      { classID: { $in: classes }}
    ).populate({
      path: "classID",
      select: "classID year program"
    }).select("-hashedPassword -updatedAt -__v").lean(); // lean for converting to js object (for deleting keys)

    const formattedStudents: any = {}
    for(let student of students){
      const course = student.classID.year.toString() + " " + student.classID.program.toString();
      delete student.classID;
      if (!formattedStudents[course]) {
        formattedStudents[course] = [];
      }
      formattedStudents[course].push(student);
    }
    res.status(200).json(formattedStudents);
  }
  catch (error) {
    console.log(`[ERROR] - Get Students by Teacher Controller: ${(error as Error).message}`);
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