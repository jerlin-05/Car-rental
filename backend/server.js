// 🔥 MUST BE FIRST — DO NOT MOVE
import dotenv from "dotenv";
dotenv.config();

// -----------------------------

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// ROUTES
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import adminCarRoutes from "./routes/admin.cars.routes.js";
import carRoutes from "./routes/car.routes.js";
import bookingRoutes from "./routes/bookings.routes.js";
import dealerCarRoutes from "./routes/dealer.cars.routes.js";
import dealerBookingRoutes from "./routes/dealer.bookings.routes.js";
import dealerUpgradeRoutes from "./routes/dealer.upgrade.routes.js";

// 🔍 ENV DEBUG (KEEP THIS)
console.log("STRIPE KEY FROM ENV:", process.env.STRIPE_SECRET_KEY);
console.log("MONGO URI FROM ENV:", process.env.MONGO_URI);

// -----------------------------

const app = express();

app.use(cors());
app.use(express.json());

// -----------------------------
// DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB error:", err.message);
    process.exit(1);
  });

// -----------------------------
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminCarRoutes);

app.use("/api/dealer/cars", dealerCarRoutes);
app.use("/api/dealer/bookings", dealerBookingRoutes);
app.use("/api/dealer", dealerUpgradeRoutes);

app.use("/api/bookings", bookingRoutes);

// -----------------------------
// SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
