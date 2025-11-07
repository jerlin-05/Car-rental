import jwt from "jsonwebtoken";
import { User, validRoles } from "../models/User.js";

const signToken = (user) =>
  jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const signup = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "name, email, password required" });
  if (!validRoles.includes(role)) return res.status(400).json({ message: "Invalid role" });
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });
  const user = await User.create({ name, email, password, role });
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "email and password required" });
  const user = await User.findOne({ email }).select("+password");
  if (!user) return res.status(401).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

export const logout = async (req, res) => {
  // For JWT stateless logout, the client should discard the token.
  res.json({ message: "Logged out (client should discard token)" });
};

export const profile = async (req, res) => {
  res.json({ user: req.user });
};

export const checkUser = async (req, res) => {
  res.json({ ok: true, role: req.user?.role, isUser: req.user?.role === "user" });
};

export const checkAdmin = async (req, res) => {
  res.json({ ok: true, role: req.user?.role, isAdmin: req.user?.role === "admin" });
};