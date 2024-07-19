import express, { Express } from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const PORT: string = process.env.PORT || "8080";

const app: Express = express();

app.use(express.json());

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`[START] - Server running on Port ${PORT}`);
})