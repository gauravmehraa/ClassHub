import { Types } from "mongoose";
import Log from "../models/log.model";

const insertLog = async({ userID, userType, action, targetID, targetType }: { userID: Types.ObjectId, userType: "Student" | "Teacher", action: string, targetID?: Types.ObjectId, targetType?: string }) => {
  const newLog = new Log({
    userID, action, userType, targetID, targetType,
    time: new Date().toISOString(),
  })
  await newLog.save();
}

export default insertLog;