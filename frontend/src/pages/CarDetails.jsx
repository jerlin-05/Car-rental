import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  /* 🔹 Fetch car */
  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cars/${id}`
        );
        setCar(res.data);
      } catch (err) {
        console.error(err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  if (!car) return <h2 style={{ padding: "40px" }}>Car not found</h2>;

  /* 📅 Date validation */
  const isValidDateRange =
    startDate &&
    endDate &&
    new Date(endDate) >= new Date(startDate);

  const days = isValidDateRange
    ? Math.floor(
        (new Date(endDate) - new Date(startDate)) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : 0;

  const total = isValidDateRange ? days * car.price : 0;

  /* 💳 Stripe Payment */
  const handlePayment = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings/create",
        {
          carId: car._id,
          startDate,
          endDate,
          totalAmount: total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = res.data.url;
    } catch (err) {
      console.error("Payment error:", err);
      alert("Unable to start payment. Try again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        background: "#fff",
        borderRadius: "16px",
        padding: "30px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      }}
    >
      <img
        src={car.image}
        alt={car.name}
        style={{
          width: "100%",
          height: "320px",
          objectFit: "contain",
          background: "#f8fafc",
          borderRadius: "12px",
        }}
      />

      <h2 style={{ marginTop: "20px" }}>{car.name}</h2>
      <p style={{ color: "#64748b" }}>
        {car.type} • {car.fuel} • {car.seats} Seats
      </p>

      <h3 style={{ marginTop: "10px" }}>₹{car.price} / day</h3>

      {/* 📅 Date pickers */}
      <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
        <input
          type="date"
          min={today}
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setEndDate("");
          }}
        />

        <input
          type="date"
          min={startDate || today}
          value={endDate}
          disabled={!startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* 💰 Total */}
      {isValidDateRange && (
        <p style={{ marginTop: "16px", fontWeight: "600" }}>
          Total ({days} days): ₹{total}
        </p>
      )}

      {/* 🔘 Button */}
      <button
        className="btn"
        disabled={!isValidDateRange}
        style={{
          marginTop: "20px",
          opacity: isValidDateRange ? 1 : 0.6,
          cursor: isValidDateRange ? "pointer" : "not-allowed",
        }}
        onClick={handlePayment}
      >
        Proceed to Payment
      </button>
    </div>
  );
}
