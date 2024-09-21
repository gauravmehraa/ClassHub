import { Request, Response } from "express";
import Feedback from "../models/feedback.model";
import { IFeedback } from "../types/feedback.type";
import insertLog from "../utils/log";

export const getFeedback = async(req: Request, res: Response) => {
  try{
    const id  = req.user._id;
    const role = req.cookies.role;
    let feedbacks: IFeedback[];
    if(role === 'Teacher'){
      feedbacks = await Feedback.find({ teacherID: { $eq: id } }).populate({
        path: "studentID",
        select: "-hashedPassword -teacherID -dateOfBirth -address -phoneNumber -gender -createdAt -updatedAt -__v "
      }).select("-__v -updatedAt -teacherID");
    }
    else{
      feedbacks = await Feedback.find({ studentID: { $eq: id } }).populate({
        path: "teacherID",
        select: "-hashedPassword -studentID -qualification -createdAt -updatedAt -__v "
      }).select("-__v -updatedAt -studentID");
    }

    res.status(200).json(feedbacks);
  }
  catch (error) {
    console.log(`[ERROR] - Get Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addFeedback = async(req: Request, res: Response) => {
  try{
    const teacherID = req.user._id;
    const { studentID, content, rating } = req.body
    const newFeedback = new Feedback({ studentID, teacherID, content, rating });
    if(newFeedback){
      await newFeedback.save();
      await insertLog({
        userID: teacherID,
        userType: "Teacher",
        action: `gave feedback for `,
        targetID: studentID,
        targetType: "Student"
      });
      res.status(201).json({
        _id: newFeedback._id,
        studentID: newFeedback.studentID,
        teacherID: newFeedback.teacherID,
        content: newFeedback.content,
        rating: newFeedback.rating
      });
    }
    else{
      res.status(400).json({ error: "Invalid data" });
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editFeedback = async(req: Request, res: Response) => {
  try{
    const { id: feedbackID } = req.params;
    const teacherID = req.user._id;
    const { content, rating } = req.body;

    const feedback = await Feedback.findOneAndUpdate(
      { _id: feedbackID, teacherID },
      { content, rating },
      { new: true }
    );

    if(!feedback){
      res.status(500).json({ error: "No feedback to be edited" });
      return;
    }

    await feedback.save();
    await insertLog({
      userID: teacherID,
      userType: "Teacher",
      action: `edited feedback for `,
      targetID: feedback.studentID,
      targetType: "Student"
    });
    res.status(200).json(feedback);

  }
  catch (error) {
    console.log(`[ERROR] - Edit Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteFeedback = async(req: Request, res: Response) => {
  try{
    const { id: feedbackID } = req.params;
    const teacherID = req.user._id;

    const feedback = await Feedback.findOne({ _id: feedbackID, teacherID });

    if(!feedback){
      res.status(500).json({ error: "No feedback to be deleted" });
      return;
    }
    await insertLog({
      userID: teacherID,
      userType: "Teacher",
      action: `deleted feedback for `,
      targetID: feedback.studentID,
      targetType: "Student"
    });
    await feedback.deleteOne();
    res.status(200).json({ message: "Feedback successfully deleted" });

  }
  catch (error) {
    console.log(`[ERROR] - Delete Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}