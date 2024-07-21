import e, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ITeacher } from "../types/teacher.type";
import Teacher from "../models/teacher.model";
import { generateTeacherToken, generateStudentToken } from "../utils/token";
import Student from "../models/student.model";

export const signupTeacher = async(req: Request, res: Response) => {
  try{
    const { name, email, password, confirmPassword, qualification, secret } = req.body;

    if(!process.env.SECRET_PHRASE){
      throw new Error("No secret phrase defined");
    }

    if(secret !== process.env.SECRET_PHRASE){
      res.status(401).json({ error: "Invalid secret phrase" });
      return;
    }

    // check password fields
    if(password !== confirmPassword){
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    const teacher: ITeacher | null = await Teacher.findOne({ email });

    if(teacher){
      res.status(400).json({error: "Email is already registered"});
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newTeacher = new Teacher({
      name, email, hashedPassword, qualification
    });

    if(newTeacher){
      generateTeacherToken(newTeacher._id, res);
      await newTeacher.save();
      res.status(201).json({ message: "Teacher successully registered" })
    }
    else{
      res.status(400).json({ error: "Invalid data" })
    }
  }
  catch (error) {
    console.log(`[ERROR] - Signup Teacher Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const signupStudent = (req: Request, res: Response) => {
  try{

  }
  catch (error) {
    console.log(`[ERROR] - Signup Student Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const login = async(req: Request, res: Response) => {
  try{
    const { role, email, password } = req.body;
    let user;
    if(role === 'Teacher') user = await Teacher.findOne({ email });
    else user = await Student.findOne({ email });

    if (!user || !user.hashedPassword) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    const validPassword: boolean = await bcrypt.compare(password, user.hashedPassword);

    if (!validPassword) {
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    if(role === 'Teacher') generateTeacherToken(user._id, res);
    else generateStudentToken(user._id, res);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });


  }
  catch (error) {
    console.log(`[ERROR] - Login Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = (req: Request, res: Response) => {
  try{
    const email: string = req.user.email;
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `Logged out successfully from ${email}`});
  }
  catch (error) {
    console.log(`[ERROR] - Logout Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}