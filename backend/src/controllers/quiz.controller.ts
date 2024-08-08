import { Request, Response } from "express";
import { Types } from "mongoose";
import Quiz from "../models/quiz.model";
import Subject from "../models/subject.model";
import Question from "../models/question.model";
import { ISubject } from "../types/subject.type";
import { IQuiz } from "../types/quiz.type";
import Class from "../models/class.model";
import Grade from "../models/grade.model";

export const getQuizzesByTeacher = async(req: Request, res: Response) => {
  try{
    const teacherID = req.user._id;
    const teachersSubjects = await Subject.find(
      { teacherID: { $eq: teacherID }}
    );
    const subjectIDs = teachersSubjects.map((subject: ISubject) => { return subject._id } );
    const quizzes = await Quiz.find(
      { subjectID: { $in: subjectIDs }}
    ).select("-updatedAt -__v").populate("questions");
    res.status(200).json(quizzes);
  }
  catch (error) {
    console.log(`[ERROR] - Get Quiz by Teacher Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getQuizzesByClass = async(req: Request, res: Response) => {
  try{
    const classID = req.user.classID;
    const studentClass: any = await Class.findById(classID);

    if(!studentClass){
      res.status(500).json({ error: "No class" });
      return;
    }
    const subjectIDs = studentClass.subjects.map((subject: any) => subject._id);

    const quizzes: any = await Quiz.find({ subjectID: { $in: subjectIDs } }).populate({
      path: "subjectID",
      select: "name"
    }).populate({
      path: "questions",
      select: "-createdAt -updatedAt -__v"
    }).select("-updatedAt -__v");

    const quizIDs = quizzes.map((quiz: any) => quiz._id);
    const grades = await Grade.find({ quizID: { $in: quizIDs }});
    const attemptedQuizIDs = grades.map((grade: any) => grade.quizID.toString());
    const filteredQuizzes = quizzes.filter((quiz: any) => { return !attemptedQuizIDs.includes(quiz._id.toString()) });
    res.status(200).json(filteredQuizzes);
  }
  catch (error) {
    console.log(`[ERROR] - Get Quiz by Class Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const addQuiz = async(req: Request, res: Response) => {
  try{
    const { topic, subjectID, questions } = req.body;

    const existingQuiz: IQuiz[] = await Quiz.find({
      topic: { $eq: topic },
      subjectID: { $eq: subjectID },
    });

    if(existingQuiz.length !== 0){
      res.status(400).json({error: "Quiz is already registered"});
      return;
    }

    const insertedQuestions = await Question.insertMany(questions);
    
    if(!insertedQuestions){
      res.status(400).json({ error: "Invalid question data" });
    }
    
    const questionIDs: Types.ObjectId[] = insertedQuestions.map(question => { return question._id });
    const quiz = new Quiz({ topic, subjectID, questions: questionIDs });

    if(quiz){
      await quiz.save();
      res.status(201).json(quiz);
    }
    else{
      res.status(400).json({ error: "Invalid quiz data" });
    }
  }
  catch (error) {
    console.log(`[ERROR] - Add Quiz Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const editQuiz = async(req: Request, res: Response) => {
  try{
    const { id: quizID } = req.params;
    const { topic, subjectID } = req.body;

    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizID,
      { topic, subjectID },
      { new: true }
    );

    if(!updatedQuiz){
      res.status(500).json({ error: "No quiz to be edited" });
      return;
    }

    await updatedQuiz.save();
    res.status(200).json(updatedQuiz);
  }
  catch (error) {
    console.log(`[ERROR] - Edit Quiz Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteQuiz = async(req: Request, res: Response) => {
  try{
    const { id: quizID } = req.params;
    const quiz = await Quiz.findById(quizID);

    if(!quiz){
      res.status(500).json({ error: "No quiz to be deleted" });
      return;
    }

    await Question.deleteMany(
      { _id: { $in: quiz.questions }}
    );
    await Quiz.findByIdAndDelete(quizID);
    res.status(200).json({ message: "Quiz successfully deleted" });
  }
  catch (error) {
    console.log(`[ERROR] - Delete Quiz Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const submitQuiz = async(req: Request, res: Response) => {
  try{
    const studentID = req.user._id;
    const { quizID, submittedQuestions } = req.body;

    const quiz: any = await Quiz.find(quizID).populate({
      path: "questions",
      select: "question options answer score"
    });
    if(!quiz){
      res.status(500).json({ error: "Quiz does not exist" });
      return;
    }
    const { questions } = quiz;
    let score = 0;
    let totalscore = 0;
    let response: any = { results: {} }
    questions.forEach((question: any) => {
      const id = question._id;
      totalscore += question.score;
      if(question.answer === submittedQuestions[id]) score += question.score;
      response.results[id] = question.answer === submittedQuestions[id];
    });
    const percentage = (score/totalscore)*100.0;
    let grade='';
    if(percentage <= 100 && percentage >= 80) grade = 'A';
    else if(percentage < 80 && percentage >= 60) grade = 'B';
    else grade = 'C';
    response = { ...response, quizID, studentID, score, grade };
    const newGrade = new Grade({studentID, quizID, score, grade});
    if(newGrade){
      await newGrade.save();
      res.status(200).json(response);
    }
    else{
      res.status(400).json({ error: "Invalid data" })
    }
  }
  catch (error) {
    console.log(`[ERROR] - Submit Quiz Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}