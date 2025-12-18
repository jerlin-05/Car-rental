import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    fuel: {
      type: String,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      enum: ["Bangalore", "Chennai", "Hyderabad", "Kerala"],
      required: true,
    },

    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", carSchema);
