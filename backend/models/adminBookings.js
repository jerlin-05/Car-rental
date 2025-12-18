import express from "express";
import Booking from "../models/Booking.js";
import { protectAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get("/", protectAdmin, async (req, res) => {
  res.json(await Booking.find());
});

export default router;
