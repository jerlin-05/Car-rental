import dotenv from "dotenv";
dotenv.config(); // 🔥 REQUIRED HERE

import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ STRIPE_SECRET_KEY missing");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export default stripe;
