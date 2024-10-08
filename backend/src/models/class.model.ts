import { model, Schema } from "mongoose";
import { IClass } from "../types/class.type";

const classSchema = new Schema<IClass>({
  year: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  subjects: {
    type: [Schema.Types.ObjectId],
    ref: "Subject",
    required: true,
    default: []
  }
}, { timestamps: true });

const Class = model<IClass>("Class", classSchema);

export default Class;