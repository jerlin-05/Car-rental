import mongoose from "mongoose";
import dotenv from "dotenv";
import Car from "./models/Car.js";

dotenv.config();

mongoose.connect("mongodb://127.0.0.1:27017/car_rental_db");

const cars = [
  {
    name: "Hyundai Creta",
    type: "SUV",
    fuel: "Petrol",
    seats: 5,
    price: 2500,
    location: "Bangalore",
    image:
      "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png",
  },
  {
    name: "Toyota Innova Hycross",
    type: "MPV",
    fuel: "Diesel",
    seats: 7,
    price: 3500,
    location: "Chennai",
    image:
      "https://static.toyotabharat.com/images/showroom/innova-hycross/super-white.png",
  },
  {
    name: "Maruti Swift",
    type: "Hatchback",
    fuel: "Petrol",
    seats: 5,
    price: 1800,
    location: "Hyderabad",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH4IRC9hR9v0C4SHjcF60r6mrFFGhySXGGvg&s",
  },
  {
    name: "Kia Seltos",
    type: "SUV",
    fuel: "Diesel",
    seats: 5,
    price: 2800,
    location: "Kerala",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7n6acI7ygGzJj_ATXmOENuYWz0Nn7LCzbUSfsIfbN1hL_TOJM0inUzfw9qnKJXndPgCZzs6R4OiHI3CphJI5iVJyKwBRT-tkaPNRCVo&s=10",
  },
];

const seed = async () => {
  await Car.deleteMany();
  await Car.insertMany(cars);
  console.log("✅ Cars seeded");
  process.exit();
};

seed();
