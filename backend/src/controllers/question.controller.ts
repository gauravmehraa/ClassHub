import { Request, Response } from "express";
import Question from "../models/question.model";
import Quiz from "../models/quiz.model";

export const addQuestion = async(req: Request, res: Response) => {
  try{
    const { question, options, answer, score, quizID } = req.body;

    const quiz = await Quiz.findById(quizID);
    if(!quiz){
      res.status(500).json({ error: "Quiz does not exist" });
      return;
    }
  
    const newQuestion = new Question({ question, options, answer, score });
    if(newQuestion){
      await newQuestion.save();
      res.status(201).json({
        _id: newQuestion._id,
        options: newQuestion.options,
        answer: newQuestion.answer,
        score: newQuestion.score,
      });
      quiz.questions.push(newQuestion._id)
      await quiz.save();
    }
    else{
      res.status(400).json({ error: "Invalid data" })
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Question Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editQuestion = async(req: Request, res: Response) => {
  try{
    const { id: questionID } = req.params;
    const { question, options, answer, score } = req.body;

    const updatedQuestion = await Question.findByIdAndUpdate(
      questionID,
      { question, options, answer, score },
      { new: true }
    );

    if(!updatedQuestion){
      res.status(500).json({ error: "No question to be edited" });
      return;
    }

    await updatedQuestion.save();
    res.status(200).json(updatedQuestion);
  }
  catch (error) {
    console.log(`[ERROR] - Edit Question Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteQuestion = async(req: Request, res: Response) => {
  try{
    const { id: questionID } = req.params;

    const existingQuestion = await Question.findById(questionID);

    if(!existingQuestion){
      res.status(500).json({ error: "No question to be deleted" });
      return;
    }

    await Question.findByIdAndDelete(questionID);
    res.status(200).json({ message: "Question successfully deleted" });
  }
  catch (error) {
    console.log(`[ERROR] - Delete Question Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}