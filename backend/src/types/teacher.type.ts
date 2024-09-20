import { Types } from "mongoose"

export interface ITeacher {
  _id: Types.ObjectId;
  name: string;
  email: string;
  hashedPassword: string;
  gender: "Male" | "Female";
  qualification: string[];
}