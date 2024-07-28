import express, { Router } from "express";
import { allocateClassToStudent, allocateSubjectToClass } from "../controllers/allocate.controller";
import { verifyTeacher } from "../middleware/verify";

const router: Router = express.Router();

router.post("/class/:id", verifyTeacher, allocateClassToStudent);

router.post("/subject/:id", verifyTeacher, allocateSubjectToClass);

export default router;