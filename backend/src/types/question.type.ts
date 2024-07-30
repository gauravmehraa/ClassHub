import { Types } from "mongoose"

export interface IQuestion {
  _id: Types.ObjectId;
  question: string;
  options: string[];
  answer: number;
  score: number;
}