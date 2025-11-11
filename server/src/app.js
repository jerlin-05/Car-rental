import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "express-async-errors";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import sellerRoutes from "./routes/seller.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import paymentRoutes from "./routes/payment.routes.js";


export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(",") || "*",
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));

  // Root + health
  app.get("/", (_req, res) =>
    res.send("Car Rental API is running. See /health for status.")
  );
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  // Feature routes
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/seller", sellerRoutes);
  app.use("/api/vehicles", vehicleRoutes);
  app.use("/api/payments", paymentRoutes);

  // 404
  app.use((req, res, _next) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Global error handler
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  });

  return app;
};
