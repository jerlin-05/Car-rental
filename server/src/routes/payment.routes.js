import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { auth } from "../middleware/auth.js";

const router = Router();

router.post("/create-session", auth, createCheckoutSession);

export default router;
