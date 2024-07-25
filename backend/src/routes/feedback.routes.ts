import express, { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addFeedback, getFeedback, editFeedback } from "../controllers/feedback.controller";

const router: Router = express.Router();

router.get("/", verifyUser, getFeedback);

router.post("/add", verifyTeacher, addFeedback);

router.patch("/edit/:id", verifyTeacher, editFeedback);

export default router;