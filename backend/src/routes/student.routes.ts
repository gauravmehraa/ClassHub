import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getStudentsByTeacher, deleteStudent, editStudent } from "../controllers/student.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getStudentsByTeacher);

router.patch("/edit/:id", verifyTeacher, editStudent);

router.delete("/delete/:id", verifyTeacher, deleteStudent);

export default router;