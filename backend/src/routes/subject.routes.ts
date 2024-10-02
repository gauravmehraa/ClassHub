import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addSubject, getSubjects, getAllSubjects, editSubject, allocateSubject, getSubjectsByClass } from "../controllers/subject.controller";

const router: Router = Router();

router.get("/", verifyUser, getSubjects);

router.get("/all", verifyTeacher, getAllSubjects);

router.get("/class/:id", verifyTeacher, getSubjectsByClass);

router.post("/add", verifyTeacher, addSubject);

router.patch("/edit/:id", verifyTeacher, editSubject);

router.post("/allocate", verifyTeacher, allocateSubject);

export default router;