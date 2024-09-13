import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addSubject, getSubjects, getAllSubjects, editSubject, allocateSubject } from "../controllers/subject.controller";

const router: Router = Router();

router.get("/", verifyUser, getSubjects);

router.get("/all", verifyTeacher, getAllSubjects);

router.post("/add", verifyTeacher, addSubject);

router.patch("/edit/:id", verifyTeacher, editSubject);

router.post("/allocate", verifyTeacher, allocateSubject);

export default router;