import { Types } from "mongoose"

export interface IClass {
  _id: Types.ObjectId;
  year: string;
  program: string;
  seats: number;
  subjects: Types.ObjectId[];
}