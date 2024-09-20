import { model, Schema } from "mongoose";
import { ILog } from "../types/log.type";

const logSchema = new Schema<ILog>({
  studentID: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: false,
  },
  teacherID: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
    required: false,
  },
  action: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

const Log = model<ILog>("Log", logSchema);

export default Log;