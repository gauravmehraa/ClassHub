import express, { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { verifyUser } from "../middleware/verify";

const router: Router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", verifyUser, logout);

export default router;