import express from "express";
import Booking from "../models/Booking.js";
import { dealerAuth } from "../middleware/dealerAuth.js";

const router = express.Router();

/* GET DEALER BOOKINGS */
router.get("/", dealerAuth, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate({
        path: "car",
        match: { dealer: req.user.id },
        select: "name price",
      })
      .populate("user", "name email");

    // remove bookings that don't belong to dealer
    const dealerBookings = bookings.filter(b => b.car !== null);

    res.json(dealerBookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
