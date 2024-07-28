import { Types } from "mongoose";

export interface INote {
  _id: Types.ObjectId;
  subjectID: Types.ObjectId;
  title: String;
  description?: string;
  url: String;
}