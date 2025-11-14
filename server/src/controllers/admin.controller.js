import mongoose from "mongoose";


const getUserModel = async () => {
  const mod = await import("../models/User.js");
 
  return mod.default || mod.User || mod;
};
const getVehicleModel = async () => {
  const mod = await import("../models/vehicle.model.js");
  return mod.default || mod.Vehicle || mod;
};

export const dashboard = async (req, res, next) => {
  try {
    const User = await getUserModel();
    const Vehicle = await getVehicleModel();

    const [usersCount, vehiclesCount] = await Promise.all([
      User.countDocuments(),
      Vehicle.countDocuments(),
    ]);

    res.json({ ok: true, stats: { usersCount, vehiclesCount } });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const User = await getUserModel();
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ ok: true, users });
  } catch (err) {
    next(err);
  }
};


export const updateUserRole = async (req, res, next) => {
  try {
    const User = await getUserModel();
    const { id } = req.params;
    const { role } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, message: "Invalid user id" });
    }
    if (!role) {
      return res.status(400).json({ ok: false, message: "Role required" });
    }

    
    const allowed = ["user", "seller", "admin"];
    if (!allowed.includes(role)) {
      return res.status(400).json({ ok: false, message: "Invalid role" });
    }

    if (role !== "admin") {
      // count admins
      const adminCount = await User.countDocuments({ role: "admin" });
      const target = await User.findById(id);
      if (!target) return res.status(404).json({ ok: false, message: "User not found" });

      if (target.role === "admin" && adminCount <= 1) {
        return res.status(400).json({ ok: false, message: "Cannot demote the only admin" });
      }
    }

    const updated = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!updated) return res.status(404).json({ ok: false, message: "User not found" });

    res.json({ ok: true, user: updated });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const User = await getUserModel();
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, message: "Invalid user id" });
    }

    const removed = await User.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ ok: false, message: "User not found" });

  

    res.json({ ok: true, message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

export const getAllVehicles = async (req, res, next) => {
  try {
    const Vehicle = await getVehicleModel();
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    res.json({ ok: true, vehicles });
  } catch (err) {
    next(err);
  }
};

export const deleteVehicle = async (req, res, next) => {
  try {
    const Vehicle = await getVehicleModel();
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ ok: false, message: "Invalid vehicle id" });
    }

    const removed = await Vehicle.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ ok: false, message: "Vehicle not found" });

    res.json({ ok: true, message: "Vehicle deleted" });
  } catch (err) {
    next(err);
  }
};
