import express, { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getClasses, addClass } from "../controllers/class.controller";

const router: Router = express.Router();

router.get("/", verifyUser, getClasses);

router.post("/add", verifyTeacher, addClass);

export default router;