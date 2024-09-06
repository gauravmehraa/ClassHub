import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./connections/mongo";

import authRoutes from "./routes/auth.routes";
import classRoutes from "./routes/class.routes";
import studentRoutes from "./routes/student.routes";
import notesRoutes from "./routes/notes.routes";
import subjectRoutes from "./routes/subject.routes";
import quizRoutes from "./routes/quiz.routes";
import gradeRoutes from "./routes/grades.routes";
import feedbackRoutes from "./routes/feedback.routes";
import statsRoutes from "./routes/stats.routes";
import lecturesRoutes from "./routes/lecture.routes";

import { app, server } from "./sockets/socket"

dotenv.config();

const PORT: string = process.env.PORT || "8080";

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/student/', studentRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/lectures', lecturesRoutes);

server.listen(PORT, () => {
  connectToDB();
  console.log(`[START] - Server running on Port ${PORT}`);
})