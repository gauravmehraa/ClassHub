import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getQuizzesByClass, getQuizzesByTeacher, addQuiz, deleteQuiz, editQuiz, submitQuiz } from "../controllers/quiz.controller";

const router: Router = Router();

router.get("/", verifyUser, getQuizzesByClass)

router.get("/teacher", verifyTeacher, getQuizzesByTeacher);

router.post("/add", verifyTeacher, addQuiz);

router.patch("/edit/:id", verifyTeacher, editQuiz);

router.delete("/delete/:id", verifyTeacher, deleteQuiz);

router.post("/submit", verifyUser, submitQuiz);

export default router;