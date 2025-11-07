import { Router } from "express";
import { sellerDashboard } from "../controllers/seller.controller.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = Router();

router.get("/dashboard", auth, authorize("seller"), sellerDashboard);

export default router;