import express, { Router } from "express";
import { signupTeacher, signupStudent, login, logout } from "../controllers/auth.controller";
import protectRoute from "../middleware/protectRoute";

const router: Router = express.Router();

router.post("/signup/teacher", signupTeacher);

router.post("/signup/student", signupStudent);

router.post("/login", login);

router.post("/logout", protectRoute, logout);

export default router;