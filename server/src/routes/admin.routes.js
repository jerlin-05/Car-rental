import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/roles.js";
import * as adminController from "../controllers/admin.controller.js";

const router = Router();

router.use(auth, requireAdmin);


router.get("/", adminController.dashboard);

router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/role", adminController.updateUserRole); 
router.delete("/users/:id", adminController.deleteUser);


router.get("/vehicles", adminController.getAllVehicles);
router.delete("/vehicles/:id", adminController.deleteVehicle);

export default router;
