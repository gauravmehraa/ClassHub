import { Types } from "mongoose"

export interface IStudent {
  _id: Types.ObjectId;
  name: string;
  email: string;
  hashedPassword: string;
  dateOfBirth: Date;
  address: string;
  phoneNumber: string;
  gender: "Male" | "Female";
  classID: Types.ObjectId;
}