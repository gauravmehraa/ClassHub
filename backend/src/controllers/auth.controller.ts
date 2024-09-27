import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ITeacher } from "../types/teacher.type";
import Teacher from "../models/teacher.model";
import Student from "../models/student.model";
import { generateTeacherToken, generateStudentToken } from "../utils/token";
import insertLog from "../utils/log";

export const signup = async(req: Request, res: Response) => {
  try{
    const { name, email, password, confirmPassword, qualification, gender, secret } = req.body;

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

    const user: ITeacher | null = await Teacher.findOne({ email });

    if(user){
      res.status(400).json({error: "Email is already registered"});
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Teacher({ name, email, hashedPassword, gender, qualification });

    if(newUser){
      generateTeacherToken(newUser._id, res);
      await newUser.save();
      await insertLog({ userID: newUser._id, userType: "Teacher", action: "created faculty account"});
      res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        role: "Teacher"
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
      if(role === "Teacher") await insertLog({ userID: user._id, userType: "Teacher", action: "failed login"});
      else await insertLog({ userID: user._id, userType: "Student", action: "failed login"});
      res.status(400).json({ error: "Invalid username or password" });
      return;
    }

    if(role === 'Teacher') generateTeacherToken(user._id, res);
    else generateStudentToken(user._id, res);

    const data: any = {
      name: user.name,
      email: user.email,
      gender: user.gender,
      role
    }

    if(user instanceof Student){
      data.classID = user.classID;
      await insertLog({ userID: user._id, userType: "Student", action: "logged in successfully"});
    }
    else await insertLog({ userID: user._id, userType: "Teacher", action: "logged in successfully"});

    res.status(201).json(data);
  }
  catch (error) {
    console.log(`[ERROR] - Login Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const logout = async(req: Request, res: Response) => {
  try{
    const { email, _id } = req.user;
    const { role } = req.cookies;
    if(role === "Teacher") await insertLog({ userID: _id, userType: "Teacher", action: "logged out"});
    else await insertLog({ userID: _id, userType: "Student", action: "logged out"});

    res.cookie("jwt", "", { maxAge: 0 });
    res.cookie("role", "", { maxAge: 0 });
    res.status(200).json({ message: `Logged out successfully from ${email}`});
  }
  catch (error) {
    console.log(`[ERROR] - Logout Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}