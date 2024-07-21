import express, { Express } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDB } from "./connections/mongo";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`[START] - Server running on Port ${PORT}`);
})