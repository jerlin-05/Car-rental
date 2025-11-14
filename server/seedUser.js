import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDB } from './src/config/db.js';
import User from './src/models/user.js';

const run = async () => {
  await connectDB(process.env.MONGO_URI);

  await User.deleteMany({}); 

  const hashed = await bcrypt.hash("password", 10);

  await User.create({
    name: "Admin",
    email: "admin@example.com",
    password: hashed,
    role: "admin"
  });

  console.log("Admin user created!");
  process.exit(0);
};

run();
