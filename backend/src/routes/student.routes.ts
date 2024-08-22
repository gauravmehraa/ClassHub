import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getStudentsByTeacher, deleteStudent, editStudent, addStudent } from "../controllers/student.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getStudentsByTeacher);

router.post("/register", verifyTeacher, addStudent);

router.patch("/edit/:id", verifyTeacher, editStudent);

router.delete("/delete/:id", verifyTeacher, deleteStudent);

export default router;