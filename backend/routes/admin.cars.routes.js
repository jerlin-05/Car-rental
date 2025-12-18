import express from "express";
import Car from "../models/Car.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

const LOCATIONS = ["Bangalore", "Chennai", "Hyderabad", "Kerala"];

/* GET ALL CARS */
router.get("/cars", protect, adminOnly, async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

/* ADD CAR */
router.post("/cars", protect, adminOnly, async (req, res) => {
  if (!LOCATIONS.includes(req.body.location)) {
    return res.status(400).json({ message: "Invalid location" });
  }

  const car = await Car.create(req.body);
  res.status(201).json(car);
});

/* UPDATE CAR */
router.put("/cars/:id", protect, adminOnly, async (req, res) => {
  if (req.body.location && !LOCATIONS.includes(req.body.location)) {
    return res.status(400).json({ message: "Invalid location" });
  }

  const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updated);
});

/* DELETE CAR */
router.delete("/cars/:id", protect, adminOnly, async (req, res) => {
  await Car.findByIdAndDelete(req.params.id);
  res.json({ message: "Car deleted" });
});

export default router;
