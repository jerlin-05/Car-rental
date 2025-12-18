import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectAdmin = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token" });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }

  req.user = user;
  next();
};
