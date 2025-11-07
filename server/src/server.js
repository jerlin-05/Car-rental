import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 7000;

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  const app = createApp();
  app.listen(PORT, () => console.log(`✓ Server running on http://localhost:${PORT}`));
};

start();