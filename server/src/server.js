import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());


const allowedOrigins = [
  process.env.CORS_ORIGIN || "http://localhost:5173",
  process.env.PROD_CLIENT_DOMAIN,
  "https://car-rental-frontend-seven-xi.vercel.app/"
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("CORS not allowed by server"), false);
  },
  credentials: true
}));


app.get("/health", (req, res) => res.json({ status: "ok" }));


console.log("STARTUP: NODE_ENV =", process.env.NODE_ENV);
console.log("STARTUP: PORT env present =", !!process.env.PORT);
console.log("STARTUP: MONGO_URI env present =", !!process.env.MONGO_URI);
console.log("STARTUP: JWT_SECRET env present =", !!process.env.JWT_SECRET);
console.log("STARTUP: STRIPE_PRIVATE_KEY env present =", !!process.env.STRIPE_PRIVATE_KEY);
console.log("STARTUP: PROD_CLIENT_DOMAIN =", process.env.PROD_CLIENT_DOMAIN);


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

   
    const server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });


    const shutdown = (code = 0) => {
      console.log("Shutting down, code=", code);
      server.close(() => {
        mongoose.disconnect().finally(() => process.exit(code));
      });
    };
    process.on("SIGTERM", () => shutdown(0));
    process.on("SIGINT", () => shutdown(0));

  } catch (err) {
    console.error("STARTUP ERROR:", err && err.stack ? err.stack : err);

    setTimeout(() => process.exit(1), 5000);
  }
}

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err && err.stack ? err.stack : err);
  setTimeout(() => process.exit(1), 5000);
});
process.on("unhandledRejection", (reason) => {
  console.error("UNHANDLED REJECTION:", reason && reason.stack ? reason.stack : reason);
  setTimeout(() => process.exit(1), 5000);
});

start();
