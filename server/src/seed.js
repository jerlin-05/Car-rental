import 'dotenv/config';
import { connectDB } from './config/db.js';
import Vehicle from './models/vehicle.model.js';

const vehicles = [
  { name:"Swift", brand:"Maruti", fuelType:"petrol", seats:5, transmission:"manual", pricePerDay:1800 },
  { name:"Baleno", brand:"Maruti", fuelType:"petrol", seats:5, transmission:"manual", pricePerDay:2200 },
  { name:"Creta", brand:"Hyundai", fuelType:"diesel", seats:5, transmission:"automatic", pricePerDay:3500 }
];

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  await Vehicle.deleteMany({});
  await Vehicle.insertMany(vehicles);
  console.log("Seeded vehicles");
  process.exit(0);
};
run();
