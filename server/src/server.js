import "dotenv/config"; 
console.log("server.js: top - dotenv loaded");

import { createApp } from "./app.js";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 7000;

const start = async () => {
  console.log("start(): beginning");
  try {
    console.log("start(): connecting to DB ->", process.env.MONGO_URI || "(no MONGO_URI)");
    await connectDB(process.env.MONGO_URI);
    console.log("start(): connectDB resolved");

    const app = createApp();
    console.log("start(): app created, now listening on port", PORT);

    
    const server = app.listen(PORT, () => {
      console.log(`✓ Server running on http://localhost:${PORT}`);
    });

   
    server.on("close", () => {
      console.log("server: close event emitted");
    });

    await new Promise(() => {}); 
  } catch (err) {
    console.error("start(): fatal error:", err && err.stack ? err.stack : err);
    
  }
};

start();
