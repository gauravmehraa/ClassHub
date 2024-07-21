import { model, Schema } from "mongoose";
import { ISubject } from "../types/subject.type";

const subjectSchema = new Schema<ISubject>({
  name: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Subject = model<ISubject>("Subject", subjectSchema);

export default Subject;