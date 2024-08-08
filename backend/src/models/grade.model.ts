import { model, Schema } from "mongoose";
import { IGrade } from "../types/grade.type";

const gradeSchema = new Schema<IGrade>({
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  quizID: {
    type: Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Grade = model<IGrade>("Grade", gradeSchema);

export default Grade;