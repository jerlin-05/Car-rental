import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { authorize } from "../middleware/roles.js";
import {
  listVehicles,
  getVehicle,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller.js";

const router = Router();

// Public
router.get("/", listVehicles);
router.get("/:id", getVehicle);

// Admin/Seller
router.post("/", auth, authorize("admin","seller"), createVehicle);
router.patch("/:id", auth, authorize("admin","seller"), updateVehicle);

// Admin only
router.delete("/:id", auth, authorize("admin"), deleteVehicle);

export default router;
