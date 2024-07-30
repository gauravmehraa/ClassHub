import { Types } from "mongoose"

export interface IGrade {
  _id: Types.ObjectId;
  studentID: Types.ObjectId;
  quizID: Types.ObjectId;
  score: number;
}