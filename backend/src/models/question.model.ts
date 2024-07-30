import { model, Schema } from "mongoose";
import { IQuestion } from "../types/question.type";

const questionSchema = new Schema<IQuestion>({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Question = model<IQuestion>("Question", questionSchema);

export default Question;