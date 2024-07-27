import { model, Schema } from "mongoose";
import { ISubject } from "../types/subject.type";

const subjectSchema = new Schema<ISubject>({
  name: {
    type: String,
    required: true,
  },
  teacherID: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  }
}, { timestamps: true });

const Subject = model<ISubject>("Subject", subjectSchema);

export default Subject;