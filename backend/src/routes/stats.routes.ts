import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getAverageGrades } from "../controllers/stats.controller";

const router: Router = Router();

router.get("/grades", verifyTeacher, getAverageGrades)

export default router;