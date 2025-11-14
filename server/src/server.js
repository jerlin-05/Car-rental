import cors from "cors";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  process.env.PROD_CLIENT_DOMAIN,
  "https://car-rental-frontend-seven-xi.vercel.app", 
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.options("*", cors());
