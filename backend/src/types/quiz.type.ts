import { Types } from "mongoose"

export interface IQuiz {
  _id: Types.ObjectId;
  topic: string;
  subjectID: Types.ObjectId;
  questions: Types.ObjectId[];
  score: number;
}