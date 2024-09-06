import { Types } from "mongoose";

export interface ILecture {
  _id: Types.ObjectId;
  subjectID: Types.ObjectId;
  title: string;
  startTime: Date;
  endTime: Date;
  status: "Live" | "Finished" | "Scheduled";
}