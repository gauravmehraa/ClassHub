import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./connections/mongo";

import authRoutes from "./routes/auth.routes";
import classRoutes from "./routes/class.routes";
import notesRoutes from "./routes/notes.routes";
import subjectRoutes from "./routes/subject.routes";
import allocateRoutes from "./routes/allocate.routes";
import feedbackRoutes from "./routes/feedback.routes";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/class', classRoutes);
app.use('/api/subject', subjectRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/allocate', allocateRoutes);
app.use('/api/feedback', feedbackRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`[START] - Server running on Port ${PORT}`);
})