import { Types } from "mongoose";

export interface ILog {
  _id: Types.ObjectId;
  userID: Types.ObjectId;
  userType: "Student" | "Teacher";
  targetID: Types.ObjectId;
  targetType: "Student" | "Teacher" | "Subject" | "Note" | "Quiz" | "Class";
  action: string;
  time: Date;
}