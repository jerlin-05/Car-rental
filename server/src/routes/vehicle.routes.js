import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { requireSeller, requireAdminOrSeller } from "../middleware/roles.js";
import * as vehicleController from "../controllers/vehicle.controller.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {

    if (vehicleController.listVehicles) return vehicleController.listVehicles(req, res, next);

    const Vehicle = (await import("../models/vehicle.model.js")).default;
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json({ ok: true, vehicles });
  } catch (err) {
    next(err);
  }
});


router.get("/:id", async (req, res, next) => {
  try {
    if (vehicleController.getVehicle) return vehicleController.getVehicle(req, res, next);

    const Vehicle = (await import("../models/vehicle.model.js")).default;
    const v = await Vehicle.findById(req.params.id);
    if (!v) return res.status(404).json({ ok: false, message: "Vehicle not found" });
    res.json({ ok: true, vehicle: v });
  } catch (err) {
    next(err);
  }
});


router.post("/", auth, requireSeller, async (req, res, next) => {
  try {
    if (vehicleController.createVehicle) return vehicleController.createVehicle(req, res, next);

    const Vehicle = (await import("../models/vehicle.model.js")).default;
    const { name, brand, pricePerDay, fuelType, seats, transmission } = req.body;
    if (!name || pricePerDay == null) return res.status(400).json({ ok: false, message: "Name and price required" });

    const vehicle = await Vehicle.create({
      name,
      brand,
      pricePerDay: Number(pricePerDay),
      fuelType,
      seats: Number(seats || 4),
      transmission: transmission || "manual",
      owner: req.userId || req.user?.id,
    });

    res.status(201).json({ ok: true, vehicle });
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", auth, requireAdminOrSeller, async (req, res, next) => {
  try {
    if (vehicleController.updateVehicle) return vehicleController.updateVehicle(req, res, next);

    const Vehicle = (await import("../models/vehicle.model.js")).default;
    const updated = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ ok: false, message: "Vehicle not found" });
    res.json({ ok: true, vehicle: updated });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", auth, requireAdminOrSeller, async (req, res, next) => {
  try {
    if (vehicleController.deleteVehicle) return vehicleController.deleteVehicle(req, res, next);

    const Vehicle = (await import("../models/vehicle.model.js")).default;
    const removed = await Vehicle.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ ok: false, message: "Vehicle not found" });
    res.json({ ok: true, message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
});

export default router;
