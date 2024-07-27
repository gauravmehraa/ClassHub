import express, { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addSubject, getSubjects, editSubject, deleteSubject } from "../controllers/subject.controller";

const router: Router = express.Router();

router.get("/", verifyUser, getSubjects);

router.post("/add", verifyTeacher, addSubject);

router.patch("/edit/:id", verifyTeacher, editSubject);

router.delete("/delete/:id", verifyTeacher, deleteSubject);

export default router;