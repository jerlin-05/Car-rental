import express from "express";
import Car from "../models/Car.js";
import { dealerAuth } from "../middleware/dealerAuth.js";

const router = express.Router();

const LOCATIONS = ["Bangalore", "Chennai", "Hyderabad", "Kerala"];

/* GET DEALER CARS */
router.get("/", dealerAuth, async (req, res) => {
  const cars = await Car.find({ dealer: req.user.id });
  res.json(cars);
});

/* ADD CAR */
router.post("/", dealerAuth, async (req, res) => {
  if (!LOCATIONS.includes(req.body.location)) {
    return res.status(400).json({ message: "Invalid location" });
  }

  const car = await Car.create({
    ...req.body,
    dealer: req.user.id,
  });

  res.status(201).json(car);
});

/* DELETE CAR */
router.delete("/:id", dealerAuth, async (req, res) => {
  await Car.findOneAndDelete({
    _id: req.params.id,
    dealer: req.user.id,
  });

  res.json({ message: "Car deleted" });
});

export default router;
