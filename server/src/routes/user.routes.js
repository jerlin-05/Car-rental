import { Router } from "express";
import { getMyProfile } from "../controllers/user.controller.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = Router();

router.get("/me", auth, authorize("user", "admin", "seller"), getMyProfile);

export default router;