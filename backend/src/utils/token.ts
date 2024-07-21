import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";

export const generateTeacherToken = (teacherId: Types.ObjectId, res: Response) => {
  if (!process.env.JWT_TEACHER_SECRET) {
    throw new Error("No JWT secret defined");
  }
  const token: string = jwt.sign( { teacherId }, process.env.JWT_TEACHER_SECRET, {
    expiresIn: '7d',
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    httpOnly: true, // XSS safe
    sameSite: "strict", // CSRF safe
    secure: process.env.NODE_ENV !== "dev"
  });
  res.cookie("role", "Teacher", {
    maxAge: 7 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    httpOnly: true, // XSS safe
    sameSite: "strict", // CSRF safe
    secure: process.env.NODE_ENV !== "dev"
  });
}

export const generateStudentToken = (studentId: Types.ObjectId, res: Response) => {
  if (!process.env.JWT_STUDENT_SECRET) {
    throw new Error("No JWT secret defined");
  }
  const token: string = jwt.sign( { studentId }, process.env.JWT_STUDENT_SECRET, {
    expiresIn: '3d',
  });

  res.cookie("jwt", token, {
    maxAge: 3 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    httpOnly: true, // XSS safe
    sameSite: "strict", // CSRF safe
    secure: process.env.NODE_ENV !== "dev"
  });
  res.cookie("role", "Student", {
    maxAge: 7 * 24 * 60 * 60 * 1000, // days * hours * minutes * seconds * milliseconds
    httpOnly: true, // XSS safe
    sameSite: "strict", // CSRF safe
    secure: process.env.NODE_ENV !== "dev"
  });
}