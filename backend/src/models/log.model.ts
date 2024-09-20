import { model, Schema } from "mongoose";
import { ILog } from "../types/log.type";

const logSchema = new Schema<ILog>({
  userType: {
    type: String,
    enum: ['Teacher', 'Student'],
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    refPath: 'userType',
    required: true,
  },
  targetType: {
    type: String,
    enum: ['Teacher', 'Student'],
    required: false,
  },
  targetID: {
    type: Schema.Types.ObjectId,
    refPath: 'targetType',
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