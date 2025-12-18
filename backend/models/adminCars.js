import express from "express";
import Car from "../models/Car.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// GET ALL CARS
router.get("/", protectAdmin, async (req, res) => {
  res.json(await Car.find());
});

// ADD CAR
router.post("/", protectAdmin, async (req, res) => {
  const car = await Car.create(req.body);
  res.json(car);
});

// DELETE CAR
router.delete("/:id", protectAdmin, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

export default router;
