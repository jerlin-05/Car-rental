import express from "express";
import Stripe from "stripe";
import { protect } from "../middleware/auth.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/dealer-subscription", protect, async (req, res) => {
  const { plan } = req.body;

  const amount = plan === "yearly" ? 10000 * 100 : 999 * 100;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
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

    metadata: {
      userId: req.user._id.toString(),
    },

    success_url: `${process.env.CLIENT_URL}/dealer-success`,
    cancel_url: `${process.env.CLIENT_URL}/become-dealer`,
  });

  res.json({ url: session.url });
});

export default router;
