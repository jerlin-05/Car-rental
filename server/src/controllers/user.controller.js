import mongoose from "mongoose";
import User from "../models/User.js";


export const getProfile = async (req, res, next) => {
  try {
    const id = req.userId || req.user?.id;
    if (!id) return res.status(401).json({ ok: false, message: "Unauthorized" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ ok: false, message: "User not found" });

    res.json({ ok: true, user });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const id = req.userId || req.user?.id;
    if (!id) return res.status(401).json({ ok: false, message: "Unauthorized" });

    const { name, email, password } = req.body;
    const update = {};

    if (name) update.name = name;
    if (email) update.email = email;
 
    if (password) {
      const user = await User.findById(id).select("+password");
      if (!user) return res.status(404).json({ ok: false, message: "User not found" });
      user.password = password;
      if (name) user.name = name;
      if (email) user.email = email;
      await user.save();
      const out = await User.findById(id).select("-password");
      return res.json({ ok: true, user: out });
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ ok: false, message: "Nothing to update" });
    }

    const updated = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
    res.json({ ok: true, user: updated });
  } catch (err) {

    if (err?.code === 11000) return res.status(409).json({ ok: false, message: "Email already in use" });
    next(err);
  }
};


export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ ok: true, users });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ ok: false, message: "Invalid user id" });

    const user = await User.findById(id).select("-password");
    if (!user) return res.status(404).json({ ok: false, message: "User not found" });

    res.json({ ok: true, user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ ok: false, message: "Invalid user id" });

    const removed = await User.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ ok: false, message: "User not found" });


    res.json({ ok: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export default {
  getProfile,
  updateProfile,
  getAllUsers,
  getUser,
  deleteUser,
};
