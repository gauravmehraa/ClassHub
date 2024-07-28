import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getStudentsByClass, deleteStudent } from "../controllers/student.controller";

const router: Router = Router();

router.get("/:id", verifyTeacher, getStudentsByClass);

router.delete("/delete/:id", verifyTeacher, deleteStudent);

export default router;