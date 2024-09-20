import { Types } from "mongoose";

export interface ILog {
  _id: Types.ObjectId;
  studentID: Types.ObjectId;
  teacherID: Types.ObjectId;
  action: string;
  time: Date;
}