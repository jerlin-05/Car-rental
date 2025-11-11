import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    fuelType: { type: String, enum: ["petrol","diesel","electric","hybrid"], required: true },
    seats: { type: Number, min: 2, max: 12, required: true },
    transmission: { type: String, enum: ["manual","automatic"], required: true },
    pricePerDay: { type: Number, min: 0, required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Vehicle = mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;   
