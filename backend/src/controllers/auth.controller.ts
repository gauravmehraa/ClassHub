import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ITeacher } from "../types/teacher.type";
import { IStudent } from "../types/student.type";
import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { generateTeacherToken, generateStudentToken } from "../utils/token";

export const signup = async(req: Request, res: Response) => {
  try{
    const { role, name, email, password, confirmPassword, qualification, dateOfBirth, address, phoneNumber, gender, classID, secret } = req.body;
    
    if(!process.env.SECRET_PHRASE){
      throw new Error("No secret phrase defined");
    }

    if(role === "Teacher" && secret !== process.env.SECRET_PHRASE){
      res.status(401).json({ error: "Invalid secret phrase" });
      return;
    }

    // check password fields
    if(password !== confirmPassword){
      res.status(400).json({ error: "Passwords do not match" });
      return;
    }

    let user: ITeacher | IStudent | null;
    if(role === "Teacher") user = await Teacher.findOne({ email });
    else user = await Student.findOne({ email });

    if(user){
      res.status(400).json({error: "Email is already registered"});
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;
    if(role === "Teacher") newUser = new Teacher({ name, email, hashedPassword, qualification });
    else newUser = new Student({ name, email, hashedPassword, dateOfBirth, address, phoneNumber, gender, classID });

    if(newUser){
      if(role === "Teacher") generateTeacherToken(newUser._id, res);
      else generateStudentToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        role
      });
    }
    else{
      res.status(400).json({ error: "Invalid data" });
    }
  }
  catch (error) {
    console.log(`[ERROR] - Signup Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const login = async(req: Request, res: Response) => {
  try{
    const { role, email, password } = req.body;
    
    let user;
    if(role === 'Teacher') user = await Teacher.findOne({ email });
    else user = await Student.findOne({ email });

    if (!user || !password) {
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

    const data: any = {
      name: user.name,
      email: user.email,
      role
    }

    if(user instanceof Student) data.classID = user.classID;
    res.status(201).json(data);
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
    res.cookie("role", "", { maxAge: 0 });
    res.status(200).json({ message: `Logged out successfully from ${email}`});
  }
  catch (error) {
    console.log(`[ERROR] - Logout Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}