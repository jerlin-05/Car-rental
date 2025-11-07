import { Router } from "express";
import { signup, login, logout, profile, checkUser, checkAdmin } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/profile", auth, profile);
router.get("/check-user", auth, checkUser);
router.get("/check-admin", auth, checkAdmin);

export default router;