import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js"; 


export const signup = async (req, res) => {
  try {
    const { name, email, password, role = "user" } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "Name, email and password required" });

    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already in use" });

   
    const user = await UserModel.create({ name, email, password, role });
    return res.status(201).json({
      ok: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("signup error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !user.password) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    if (!process.env.JWT_SECRET) {
      console.error("Missing JWT_SECRET env var");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });

   
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });

    return res.json({
      ok: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("login error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ ok: true });
};


export const profile = async (req, res) => {
  if (!req.user || !req.user.id) return res.status(401).json({ message: "Unauthorized" });
  const user = await UserModel.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ ok: true, user });
};


export const checkUser = async (req, res) => res.json({ ok: true });
export const checkAdmin = async (req, res) => {
  const user = await UserModel.findById(req.user?.id);
  if (!user || user.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  res.json({ ok: true });
};
