import { Router } from "express";
import { allocateClassToStudent, allocateSubjectToClass } from "../controllers/allocate.controller";
import { verifyTeacher } from "../middleware/verify";

const router: Router = Router();

router.patch("/class/:id", verifyTeacher, allocateClassToStudent);

router.patch("/subject/:id", verifyTeacher, allocateSubjectToClass);

export default router;