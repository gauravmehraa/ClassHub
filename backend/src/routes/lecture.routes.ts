import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addLecture, deleteLecture, editLecture, getLecturesByClass, getLecturesByTeacher } from "../controllers/lecture.controller";

const router: Router = Router();

router.get("/class/:id", verifyUser, getLecturesByClass);

router.get("/", verifyTeacher, getLecturesByTeacher);

router.post("/add", verifyTeacher, addLecture);

router.patch("/edit/:id", verifyTeacher, editLecture);

router.delete("/delete/:id", verifyTeacher, deleteLecture);

export default router;