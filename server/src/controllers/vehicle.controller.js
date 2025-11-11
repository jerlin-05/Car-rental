import Vehicle from "../models/vehicle.model.js";

export const listVehicles = async (req, res) => {
  const { q } = req.query;
  const filter = q ? { name: new RegExp(q, "i") } : {};
  const vehicles = await Vehicle.find(filter).lean();
  res.json({ vehicles });
};

export const getVehicle = async (req, res) => {
  const v = await Vehicle.findById(req.params.id).lean();
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ vehicle: v });
};

export const createVehicle = async (req, res) => {
  const v = await Vehicle.create(req.body);
  res.status(201).json({ vehicle: v });
};

export const updateVehicle = async (req, res) => {
  const v = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ vehicle: v });
};

export const deleteVehicle = async (req, res) => {
  const v = await Vehicle.findByIdAndDelete(req.params.id);
  if (!v) return res.status(404).json({ message: "Vehicle not found" });
  res.json({ message: "Vehicle deleted" });
};
