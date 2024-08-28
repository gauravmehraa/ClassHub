import { model, Schema } from "mongoose";
import { IQuiz } from "../types/quiz.type";

const quizSchema = new Schema<IQuiz>({
  topic: {
    type: String,
    required: true,
  },
  subjectID: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  questions: {
    type: [Schema.Types.ObjectId],
    ref: "Question",
    required: true,
    default: []
  },
  score: {
    type: Number,
    required: false,
  }
}, { timestamps: true });

const Quiz = model<IQuiz>("Quiz", quizSchema);

export default Quiz;