import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getAllLogs, getLogs } from "../controllers/log.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getLogs);

router.get("/all", verifyTeacher, getAllLogs);

export default router;