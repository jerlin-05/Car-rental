import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());


const rawOrigins = process.env.CORS_ORIGIN || "";
const allowedOrigins = rawOrigins
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);


if (allowedOrigins.length === 0) {
 
  allowedOrigins.push(
    "http://localhost:5173",
    "https://car-rental-frontend-seven-xi.vercel.app",
    "https://car-rental-frontend-jerlins-projects-a1b0590a.vercel.app"
  );
  console.warn("CORS: no CORS_ORIGIN env provided — using default allowlist:", allowedOrigins);
}

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    return next();
  } else {

    res.status(403).json({ message: "CORS: origin not allowed", origin });
  }
});


app.get("/health", (req, res) => res.json({ status: "ok" }));


app.get("/", (req, res) => {
  res.send("Car Rental API - running");
});


const PORT = process.env.PORT || 7000;
const MONGO_URI = process.env.MONGO_URI;

async function start() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    console.log("STARTUP: connecting to MongoDB...");
    await mongoose.connect(MONGO_URI, {
    
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("STARTUP: MongoDB connected");

    
    try {
     
      const routesModule = await import("./src/routes/index.js");
      const apiRouter = routesModule.default || routesModule.router || routesModule;
      if (apiRouter) {
        app.use("/api", apiRouter);
        console.log("STARTUP: mounted API routes at /api");
      } else {
        console.warn("STARTUP: ./src/routes/index.js did not export a router default.");
      }
    } catch (err) {
      console.warn("STARTUP: no ./src/routes/index.js found or error importing routes. Continuing without mounted API routes.");
    }

 
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });

  
    const shutdown = (code = 0) => {
      console.log("Shutting down server, code=", code);
      server.close(async () => {
        try {
          await mongoose.disconnect();
        } catch (e) {
          console.warn("Error disconnecting mongoose:", e);
        } finally {
          process.exit(code);
        }
      });
    };
    process.on("SIGTERM", () => shutdown(0));
    process.on("SIGINT", () => shutdown(0));
  } catch (err) {
    console.error("STARTUP ERROR:", err && err.stack ? err.stack : err);
   
    setTimeout(() => process.exit(1), 3000);
  }
}

start();

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err && err.stack ? err.stack : err);
  setTimeout(() => process.exit(1), 2000);
});
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason && reason.stack ? reason.stack : reason);
  setTimeout(() => process.exit(1), 2000);
});
