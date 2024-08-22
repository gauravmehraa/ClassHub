import { Request, Response } from "express";import Student from "../models/student.model";
import bcrypt from "bcryptjs";
import Class from "../models/class.model";
import { ISubject } from "../types/subject.type";
import Subject from "../models/subject.model";
import { IClass } from "../types/class.type";
import { IStudent } from "../types/student.type";
import Grade from "../models/grade.model";

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
    }).select("-hashedPassword -updatedAt -__v")//.lean(); // lean for converting to js object (for deleting keys)

    const formattedStudents: any = {}
    for(let student of students){
      const course = student.classID.year.toString() + " " + student.classID.program.toString();
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

export const addStudent = async(req: Request, res: Response): Promise<void> => {
  try{
    const { name, email, password, confirmPassword, dateOfBirth, address, phoneNumber, gender, classID } = req.body;

    // check password fields
    if(password !== confirmPassword){
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const user: IStudent | null = await Student.findOne({ email });

    if(user){
      res.status(400).json({error: "Email is already registered"});
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Student({ name, email, hashedPassword, dateOfBirth, address, phoneNumber, gender, classID });

    if(newUser){
      await newUser.save();
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        role: "Student"
      });
    }
    else{
      res.status(400).json({ error: "Invalid data" });
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editStudent = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: studentID } = req.params;
    const { name, email, dateOfBirth, address, phoneNumber, gender, classID } = req.body;

    const student = await Student.findByIdAndUpdate(
      studentID,
      { name, email, dateOfBirth, address, phoneNumber, gender, classID },
      { new: true }
    );

    if(!student){
      res.status(500).json({ error: "No student to be deleted" });
      return;
    }

    await student.save();
    res.status(200).json(student);
  }
  catch (error) {
    console.log(`[ERROR] - Edit Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteStudent = async(req: Request, res: Response): Promise<void> => {
  try{
    const { id: studentID } = req.params;
    const student = await Student.findById(studentID);

    if(!student){
      res.status(500).json({ error: "Student does not exist" });
      return;
    }

    await Grade.deleteMany(
      { studentID: { $eq: studentID }}
    );
    await Student.findByIdAndDelete(studentID);
    res.status(200).json({ message: "Student successfully deleted" });
  }
  catch (error) {
    console.log(`[ERROR] - Delete Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}