import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getGrades } from "../controllers/grade.controller";

const router: Router = Router();

router.get("/:id", verifyUser, getGrades);

export default router;