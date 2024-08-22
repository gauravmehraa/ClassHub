import { Types } from "mongoose"

export interface IFeedback {
  _id: Types.ObjectId;
  studentID: Types.ObjectId;
  teacherID: Types.ObjectId;
  content: string;
  rating: Number;
}