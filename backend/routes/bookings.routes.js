import express from "express";
import stripe from "../config/stripe.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", protect, async (req, res) => {
  try {
    const { carId, startDate, endDate, totalAmount } = req.body;

    // 🔍 HARD LOGS (important)
    console.log("USER:", req.user);
    console.log("AMOUNT:", totalAmount);

    if (!req.user || !req.user.email) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: req.user.email,

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Car Rental Booking",
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/booking-success`,
      cancel_url: `${process.env.FRONTEND_URL}/cars/${carId}`,
    });

    console.log("STRIPE SESSION CREATED:", session.url);

    // ✅ THIS IS WHAT FRONTEND NEEDS
    return res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Booking Error FULL:", error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
