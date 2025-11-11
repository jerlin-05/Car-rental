import { Router } from "express";
import { createCheckoutSession } from "../controllers/payment.controller.js";
import { auth } from "../middleware/auth.js"; // keep your existing auth

const router = Router();

// protect the route so only logged-in users can pay
router.post("/create-session", auth, createCheckoutSession);

export default router;
