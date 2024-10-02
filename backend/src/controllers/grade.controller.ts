import { Request, Response } from "express";
import Grade from "../models/grade.model";

export const getGrades = async(req: Request, res: Response) => {
  try{
    const id = req.user._id;
    const role = req.cookies.role;
    const { id: studentID } = req.params;

    if(studentID != "none" && role === "Student" && id !== studentID){
      res.status(403).json({error: "Forbidden resource"});
      return;
    }
    const grades = await Grade.find({ studentID: { $eq: role === "Teacher"? studentID: id } }).populate({
      path: "quizID",
      select: "-createdAt -subjectID -updatedAt -questions -__v "
    }).select("-__v -updatedAt -studentID");
    res.status(200).json(grades);
  }
  catch (error) {
    console.log(`[ERROR] - Get Grades Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}