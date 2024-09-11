import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addSubject, getSubjects, getAllSubjects, editSubject, deleteSubject, allocateSubject } from "../controllers/subject.controller";

const router: Router = Router();

router.get("/", verifyUser, getSubjects);

router.get("/all", verifyTeacher, getAllSubjects);

router.post("/add", verifyTeacher, addSubject);

router.patch("/edit/:id", verifyTeacher, editSubject);

router.delete("/delete/:id", verifyTeacher, deleteSubject);

router.post("/allocate", verifyTeacher, allocateSubject);

export default router;