import express, { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addNote, deleteNote } from "../controllers/notes.controller";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const router: Router = express.Router();

router.post("/add", verifyTeacher, upload.single('file'), addNote);

router.delete("/delete/:id", verifyTeacher, deleteNote);

export default router;