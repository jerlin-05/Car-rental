import Vehicle from "../models/vehicle.model.js";

export const createVehicle = async (req, res) => {
  try {
    const { name, brand, pricePerDay, fuelType, seats, transmission } = req.body;

   
    if (!name) return res.status(400).json({ ok: false, message: "Missing name" });
    if (pricePerDay == null) return res.status(400).json({ ok: false, message: "Missing pricePerDay" });

    const price = Number(pricePerDay);
    const seatCount = seats != null ? Number(seats) : undefined;
    if (Number.isNaN(price)) return res.status(400).json({ ok: false, message: "pricePerDay must be a number" });
    if (seatCount != null && Number.isNaN(seatCount))
      return res.status(400).json({ ok: false, message: "seats must be a number" });

   
    const owner = req.userId || null;

    const vehicle = await Vehicle.create({
      name,
      brand,
      pricePerDay: price,
      fuelType,
      seats: seatCount,
      transmission,
      owner,
    });

    res.status(201).json({ ok: true, vehicle });
  } catch (err) {
 
    console.error("createVehicle error:", err && err.stack ? err.stack : err);

    const message = err?.message || "Internal Server Error";
    res.status(500).json({ ok: false, message });
  }
};
