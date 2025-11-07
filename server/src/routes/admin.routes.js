import { Router } from "express";
import { listUsers } from "../controllers/admin.controller.js";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";

const router = Router();

router.get("/users", auth, authorize("admin"), listUsers);

export default router;