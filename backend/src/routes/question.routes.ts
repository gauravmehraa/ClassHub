import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { addQuestion, editQuestion, deleteQuestion } from "../controllers/question.controller";

const router: Router = Router();

router.post("/add", verifyTeacher, addQuestion);

router.patch("/edit/:id", verifyTeacher, editQuestion)

router.delete("/delete/:id", verifyTeacher, deleteQuestion);

export default router;