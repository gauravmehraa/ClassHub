import { Request, Response } from "express";
import Feedback from "../models/feedback.model";
import { IFeedback } from "../types/feedback.type";

export const getFeedback = async(req: Request, res: Response) => {
  try{
    const id  = req.user._id;
    const role = req.cookies.role;
    let feedbacks: IFeedback[];
    if(role === 'Teacher') feedbacks = await Feedback.find({
      teacherID: { $eq: id }
    });
    else feedbacks = await Feedback.find({
      studentID: { $eq: id }
    });
    res.status(200).json(feedbacks);
  }
  catch (error) {
    console.log(`[ERROR] - Get Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addFeedback = async(req: Request, res: Response) => {
  try{
    const { studentID, teacherID, content } = req.body;
    const newFeedback = new Feedback({ studentID, teacherID, content });
    if(newFeedback){
      await newFeedback.save();
      res.status(201).json({
        _id: newFeedback._id,
        studentID: newFeedback.studentID,
        teacherID: newFeedback.teacherID,
        content: newFeedback.content
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
    const { content } = req.body;

    const feedback = await Feedback.findOneAndUpdate(
      { _id: feedbackID, teacherID },
      { content },
      { new: true }
    );

    if(!feedback){
      res.status(500).json({ error: "No feedback to be edited" });
      return;
    }

    await feedback.save();
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

    await Feedback.findByIdAndDelete(feedbackID);
    res.status(200).json({ message: "Feedback successfully deleted" });

  }
  catch (error) {
    console.log(`[ERROR] - Delete Feedback Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}