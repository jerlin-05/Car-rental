import express from "express";
import Stripe from "stripe";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/dealer-subscription", protect, async (req, res) => {
  try {
    // 🔥 CREATE STRIPE HERE (NOT AT TOP)
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const { plan } = req.body;

    const amount = plan === "yearly" ? 9999 * 100 : 999 * 100;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: req.user.email,

      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name:
                plan === "yearly"
                  ? "Dealer Yearly Subscription"
                  : "Dealer Monthly Subscription",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/dealer-success`,
      cancel_url: `${process.env.FRONTEND_URL}/become-dealer`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
