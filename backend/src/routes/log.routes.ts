import { Router } from "express";
import { verifyTeacher } from "../middleware/verify";
import { getLogs } from "../controllers/log.controller";

const router: Router = Router();

router.get("/", verifyTeacher, getLogs);

export default router;