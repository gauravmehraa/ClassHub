import { model, Schema } from "mongoose";
import { IStudent } from "../types/student.type";

const studentSchema = new Schema<IStudent>({
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
  dateOfBirth: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    required: true,
  },
  classID: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  }
}, { timestamps: true });

const Student = model<IStudent>("Student", studentSchema);

export default Student;