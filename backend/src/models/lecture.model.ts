import { model, Schema } from "mongoose";
import { ILecture } from "../types/lecture.type";

const lectureSchema = new Schema<ILecture>({
  subjectID: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Live", "Completed", "Scheduled"],
    required: true,
  },
}, { timestamps: true });

const Lecture = model<ILecture>("Lecture", lectureSchema);

export default Lecture;