import { Request, Response } from "express";
import Log from "../models/log.model";
import { ILog } from "../types/log.type";

export const getLogs = async(req: Request, res: Response) => {
  try{
    const logs: ILog[] = await Log.find().sort({ createdAt: -1 }).limit(100)
    .populate({
      path: "studentID",
      select: "_id name email"
    }).populate({
      path: "teacherID",
      select: "_id name email"
    }).select("-createdAt -updatedAt -__v");
    res.status(200).json(logs);
  }
  catch (error) {
    console.log(`[ERROR] - Get Logs Controller: ${(error as Error).message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
}