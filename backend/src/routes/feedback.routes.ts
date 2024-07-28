import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { addFeedback, getFeedback, editFeedback, deleteFeedback } from "../controllers/feedback.controller";

const router: Router = Router();

router.get("/", verifyUser, getFeedback);

router.post("/add", verifyTeacher, addFeedback);

router.patch("/edit/:id", verifyTeacher, editFeedback);

router.delete("/delete/:id", verifyTeacher, deleteFeedback);

export default router;