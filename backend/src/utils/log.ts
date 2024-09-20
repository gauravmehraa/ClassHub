import { Types } from "mongoose";
import Log from "../models/log.model";

const insertLog = async({ studentID, teacherID, action }: { studentID?: Types.ObjectId, teacherID?: Types.ObjectId, action: string }) => {
  const newLog = new Log({
    studentID, teacherID,  action,
    time: new Date().toISOString(),
  })
  await newLog.save();
}

export default insertLog;