import { model, Schema } from "mongoose";
import { ITeacher } from "../types/teacher.type";

const teacherSchema = new Schema<ITeacher>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  qualification: {
    type: [String],
    required: true,
  }
}, { timestamps: true });

const Teacher = model<ITeacher>("Teacher", teacherSchema);

export default Teacher;