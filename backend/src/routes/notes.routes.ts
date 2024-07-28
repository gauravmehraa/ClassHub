import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getNotesByClass, addNote, editNote, deleteNote, getNotesByTeacher } from "../controllers/notes.controller";
import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

const router: Router = Router();

router.get("/class/:id", verifyUser, getNotesByClass);

router.get("/", verifyTeacher, getNotesByTeacher);

router.post("/add", verifyTeacher, upload.single('file'), addNote);

router.patch("/edit/:id", verifyTeacher, upload.single('file'), editNote);

router.delete("/delete/:id", verifyTeacher, deleteNote);

export default router;