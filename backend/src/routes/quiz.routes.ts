import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getQuizzesBySubject, getQuizzesByTeacher, addQuiz, deleteQuiz, editQuiz } from "../controllers/quiz.controller";

const router: Router = Router();

router.get("/", verifyUser, getQuizzesBySubject)

router.get("/teacher", verifyTeacher, getQuizzesByTeacher);

router.post("/add", verifyTeacher, addQuiz);

router.patch("/edit/:id", verifyTeacher, editQuiz);

router.delete("/delete/:id", verifyTeacher, deleteQuiz);

export default router;