const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  const adminExists = await User.findOne({ email: "admin@car.com" });

  if (adminExists) {
    console.log("⚠️ Admin already exists");
    process.exit();
  }

  await User.create({
    name: "Admin",
    email: "admin@car.com",
    password: "admin123",
    role: "admin",
  });

  console.log("✅ Admin created: admin@car.com / admin123");
  process.exit();
};

seedAdmin();
