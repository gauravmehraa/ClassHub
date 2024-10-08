import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getClasses, addClass, editClass } from "../controllers/class.controller";

const router: Router = Router();

router.get("/", verifyUser, getClasses);

router.post("/add", verifyTeacher, addClass);

router.patch("/edit/:id", verifyTeacher, editClass);

export default router;