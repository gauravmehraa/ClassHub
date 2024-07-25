import { model, Schema } from "mongoose";
import { IFeedback } from "../types/feedback.type";

const feedbackSchema = new Schema<IFeedback>({
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  teacherID: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Feedback = model<IFeedback>("Feedback", feedbackSchema);

export default Feedback;