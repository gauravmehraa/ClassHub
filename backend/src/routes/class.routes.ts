import { Router } from "express";
import { verifyTeacher, verifyUser } from "../middleware/verify";
import { getClasses, addClass, editClass, deleteClass } from "../controllers/class.controller";

const router: Router = Router();

router.get("/", verifyUser, getClasses);

router.post("/add", verifyTeacher, addClass);

router.patch("/edit/:id", verifyTeacher, editClass);

router.delete("/delete/:id", verifyTeacher, deleteClass);

export default router;