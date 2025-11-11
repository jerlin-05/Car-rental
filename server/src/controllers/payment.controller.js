import Stripe from "stripe";
import Vehicle from "../models/vehicle.model.js"; 

const stripeKey = process.env.STRIPE_PRIVATE_KEY || process.env.STRIPE_SECRET_KEY || "";
let stripe = null;
if (stripeKey) {
  stripe = new Stripe(stripeKey);
} else {
  console.warn("⚠️ Stripe not configured (STRIPE_PRIVATE_KEY missing). Payment routes will return 501.");
}

// POST /api/payments/create-session
export const createCheckoutSession = async (req, res) => {
  if (!stripe) {
    return res.status(501).json({ ok: false, message: "Payments not configured on server." });
  }

  try {
    const { vehicleId, days = 1, startDate, endDate } = req.body;
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const unitAmount = Number(vehicle.pricePerDay || 0) * 100;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{
        price_data: {
          currency: "inr",
          product_data: { name: `${vehicle.name} (${vehicle.brand})` },
          unit_amount: unitAmount,
        },
        quantity: Math.max(1, Number(days)),
      }],
      success_url: `${process.env.CLIENT_DOMAIN || "http://localhost:5173"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_DOMAIN || "http://localhost:5173"}/checkout/cancel`,
      metadata: { vehicleId: String(vehicle._id), days: String(days), userId: req.user?.id || "" },
    });

    return res.json({ url: session.url, id: session.id });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};
