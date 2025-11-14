import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireSeller } from "../middleware/roles.js";
import * as sellerController from "../controllers/seller.controller.js";

const router = Router();


router.post("/vehicles", auth, requireSeller, sellerController.createVehicle);

export default router;
