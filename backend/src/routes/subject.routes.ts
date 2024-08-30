import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addSubject, getSubjects, editSubject, deleteSubject, allocateSubject } from "../controllers/subject.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getSubjects);

router.post("/add", verifyTeacher, addSubject);

router.patch("/edit/:id", verifyTeacher, editSubject);

router.delete("/delete/:id", verifyTeacher, deleteSubject);

router.post("/allocate", verifyTeacher, allocateSubject);

export default router;