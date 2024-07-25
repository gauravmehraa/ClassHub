import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Teacher from "../models/teacher.model";
import Student from "../models/student.model";

export const verifyUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const token: string | undefined = req.cookies.jwt;
    const role: string | undefined = req.cookies.role;

    if(!process.env.JWT_TEACHER_SECRET || !process.env.JWT_STUDENT_SECRET){
      throw new Error("No teacher/student secret defined");
    }

    if(!token || !role){
      res.status(401).json({error: "Unauthorized - No token provided"});
      return;
    }

    let decoded;
    if(role === 'Teacher') decoded = jwt.verify(token, process.env.JWT_TEACHER_SECRET) as JwtPayload;
    else decoded = jwt.verify(token, process.env.JWT_STUDENT_SECRET) as JwtPayload;
    
    if(!decoded){
      res.status(401).json({error: "Unauthorized - Invalid token"});
      return;
    }

    let user;

    if(role === 'Teacher') user = await Teacher.findById((decoded as JwtPayload).teacherId).select("-hashedPassword -__v -createdAt -updatedAt");
    else user = await Student.findById((decoded as JwtPayload).studentId).select("-hashedPassword -__v -createdAt -updatedAt");;

    if(!user){
      res.status(404).json({error: "User not found"});
      return;
    }

    req.user = user;

    next();
  }
  catch (error){
    console.log(`[ERROR] - Verify User Middleware: ${(error as Error).message}`);
    res.status(500).json({error: "Internal Server Error"});
  }
}

export const verifyTeacher = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try{
    const token: string | undefined = req.cookies.jwt;
    const role: string | undefined = req.cookies.role;

    if(!process.env.JWT_TEACHER_SECRET){
      throw new Error("No teacher secret defined");
    }

    if(!token || !role){
      res.status(401).json({error: "Unauthorized - No token provided"});
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_TEACHER_SECRET) as JwtPayload;
    
    if(!decoded){
      res.status(401).json({error: "Unauthorized - Invalid token"});
      return;
    }

    const user = await Teacher.findById((decoded as JwtPayload).teacherId).select("-hashedPassword -__v -createdAt -updatedAt");

    if(!user){
      res.status(404).json({error: "Teacher not found"});
      return;
    }

    req.user = user;

    next();
  }
  catch (error){
    console.log(`[ERROR] - Verify Teacher Middleware: ${(error as Error).message}`);
    res.status(500).json({error: "Internal Server Error"});
  }
}
