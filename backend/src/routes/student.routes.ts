import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getStudentsByTeacher, deleteStudent } from "../controllers/student.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getStudentsByTeacher);

router.delete("/delete/:id", verifyTeacher, deleteStudent);

export default router;