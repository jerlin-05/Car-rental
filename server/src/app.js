
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

 
  const raw = process.env.CORS_ORIGIN || "http://localhost:5173";
  const allowedOrigins = raw.split(",").map(s => s.trim()).filter(Boolean);

  const corsOptions = {
    origin: (origin, callback) => { 
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    optionsSuccessStatus: 204,
  };

  app.use(cors(corsOptions));

  app.options("*", cors(corsOptions));

  app.use(express.json());
  app.use(cookieParser());
  app.use(morgan("dev"));

 
  app.get("/", (_req, res) =>
    res.send("Car Rental API is running. See /health for status.")
  );
  app.get("/health", (_req, res) => res.json({ status: "ok" }));

  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/seller", sellerRoutes);
  app.use("/api/vehicles", vehicleRoutes);
  app.use("/api/payments", paymentRoutes);


  app.use((req, res, _next) => {
    res.status(404).json({ message: "Route not found" });
  });


  app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err && err.stack ? err.stack : err);
    if (err && err.message && err.message.startsWith("CORS policy")) {
      return res.status(403).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  });

  return app;
};

export default createApp;
