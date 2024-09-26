import { Request, Response } from "express";
import Quiz from "../models/quiz.model";
import Grade from "../models/grade.model";
import Class from "../models/class.model";
import Student from "../models/student.model";
import Teacher from "../models/teacher.model";
import Subject from "../models/subject.model";
import Note from "../models/notes.model";


export const getAverageGrades = async(req: Request, res: Response) => {
  try{
    const id = req.user._id;
    const subjects = await Subject.find({ teacherID: { $eq: id }}).select("_id");
    if(!subjects){
      res.status(500).json({ error: "No subjects alloted" });
      return;
    }
    const subjectIDs = subjects.map((subject: any) => subject._id);
    const quizzes = await Quiz.find({ subjectID: { $in: subjectIDs }}).select("topic score subjectID");
    const data: any = {}
    for(let quiz of quizzes){
      const key = quiz._id.toString();
      const scores = await Grade.find({ quizID: quiz._id }).select("score -_id");
      const classes = await Class.find({ subjects: { $in: [quiz.subjectID] } }).select("_id");
      const classIDs = classes.map(element => element._id);
      const students = await Student.find({ classID: { $in: classIDs } }).select("_id");

      const attempted = (scores.length / students.length) * 100;
      const totalScore = scores.reduce((accumulator, score) => accumulator + score.score, 0);
      const averageScore = totalScore / scores.length;
      const averagePercent = parseFloat(((averageScore / quiz.score) * 100).toFixed(2));
      data[key] = { topic: quiz.topic, total: quiz.score, averagePercent, attempted };
    }
    res.status(200).json(data);
  }
  catch (error) {
    console.log(`[ERROR] - Get Average Grades Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const getStatistics = async(req: Request, res: Response) => {
  try{
    const id = req.user._id;
    const role = req.cookies.role;
    const classID = req.user.classID;
    const data: any = [];
    let studentClass: any;
    if(role === "Student"){
      studentClass = await Class.findById(classID);
      if(!studentClass){ res.status(500).json({ error: "No class" }); return; }
      const subjectIDs = studentClass.subjects.map((subject: any) => subject._id);
      const quizzes: any = await Quiz.find({ subjectID: { $in: subjectIDs } }).select("-updatedAt -__v");
      const quizIDs = quizzes.map((quiz: any) => quiz._id);
      const grades = await Grade.find({
        quizID: { $in: quizIDs },
        studentID: { $in: id },
      });
      const attemptedQuizIDs = grades.map((grade: any) => grade.quizID.toString());
      const filteredQuizzes = quizzes.filter((quiz: any) => { return !attemptedQuizIDs.includes(quiz._id.toString()) });
      const attemptPercentage = (filteredQuizzes.length / quizzes.length) * 100;
      data.push({ title: "Quizzes Attempted", stat: attemptPercentage, value: `${filteredQuizzes.length} out of ${quizzes.length}`, description: ""})
    }
    if(role === "Student"){
      const subjectsMap: Record<string, string> = studentClass.subjects.reduce((acc: any, subject: any) => {
        acc[subject._id] = subject.name;
        return acc;
      }, {});
      const notes = await Note.find(
        { subjectID: { $in: Object.keys(subjectsMap) }}
      ).select("-updatedAt -__v");
      data.push({ title: "Notes", stat: notes.length, value: notes.length, description: "Notes given by faculty"});
    }

    res.status(200).json(data);
  }
  catch (error) {
    console.log(`[ERROR] - Get Statistics Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}