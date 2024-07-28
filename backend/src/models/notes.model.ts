import { model, Schema } from "mongoose";
import { INote } from "../types/notes.type";

const noteSchema = new Schema<INote>({
  subjectID: {
    type: Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  url: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Note = model<INote>("Note", noteSchema);

export default Note;