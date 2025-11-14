import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  pricePerDay: { type: Number, required: true, min: 0 },
  fuelType: { type: String, required: true, trim: true }, 
  seats: { type: Number, required: true, min: 2, max: 14 },
  transmission: { type: String, enum: ["manual", "automatic"], default: "manual" },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;
