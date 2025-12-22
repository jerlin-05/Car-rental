import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaShieldAlt,
  FaDollarSign,
  FaHeartbeat,
  FaUserShield,
  FaMoneyBillWave,
} from "react-icons/fa";

export default function Home() {
  const navigate = useNavigate();

  const today = new Date().toISOString().split("T")[0];

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const isValidSearch =
    location &&
    startDate &&
    endDate &&
    new Date(endDate) > new Date(startDate);

  const handleSearch = () => {
    if (!isValidSearch) {
      alert("Please select valid location and dates");
      return;
    }

    navigate(
      `/cars?location=${location}&start=${startDate}&end=${endDate}`
    );
  };

  return (
    <div className="page">
     
      <div
  style={{
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "60px",
  }}
>

  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: "url('/public/hero-car.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.55)",
    }}
  />

  
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(90deg, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.6) 50%, rgba(2,6,23,0.3) 100%)",
    }}
  />

 
  <div
    style={{
      position: "relative",
      padding: "80px 60px",
      color: "white",
      maxWidth: "1100px",
    }}
  >
    <h1 style={{ fontSize: "44px", fontWeight: "800" }}>
      Self Drive Car Rentals in India
    </h1>

    <p style={{ marginTop: "12px", fontSize: "18px", color: "#e5e7eb" }}>
      Affordable daily rentals across major Indian cities
    </p>

    
    <div
      style={{
        marginTop: "28px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <select
  className="input"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="">Select Location</option>
  <option value="Bangalore">Bangalore</option>
  <option value="Chennai">Chennai</option>
  <option value="Hyderabad">Hyderabad</option>
</select>

<input
  type="date"
  className="input"
  min={today}
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
/>

<input
  type="date"
  className="input"
  min={startDate}
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
/>

<button className="btn-primary" onClick={handleSearch}>
  Search Cars
</button>
    </div>
  </div>
</div>

<div
  style={{
    maxWidth: "1200px",
    margin: "40px auto",
    padding: "40px",
    borderRadius: "20px",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  }}
>
  <div>
    <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
      Earn Money by Listing Your Cars 🚗
    </h2>
    <p style={{ color: "#cbd5f5", maxWidth: "500px" }}>
      Become a verified dealer on CarRental. List your vehicles, manage bookings,
      and earn daily income with full admin support.
    </p>
  </div>

  <button
    className="btn primary"
    style={{
      padding: "14px 26px",
      fontSize: "16px",
      fontWeight: "600",
    }}
    onClick={() => navigate("/become-dealer")}
  >
    Become a Dealer
  </button>
</div>

      {/* BENEFITS */}
      <h2 className="section-title" style={{ textAlign: "center" }}>
        OUR BENEFITS
      </h2>

      <div className="benefits-grid">
        <div className="benefit-item">
          <FaCalendarCheck className="benefit-icon" />
          <div>
            <h3>Free Cancellation</h3>
            <p>Cancel your reservation up to 48 hours before pickup</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaShieldAlt className="benefit-icon" />
          <div>
            <h3>All Inclusive+ Rate</h3>
            <p>Best benefits and coverage included</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaDollarSign className="benefit-icon" />
          <div>
            <h3>No Additional Costs</h3>
            <p>Guaranteed savings on every booking</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaHeartbeat className="benefit-icon" />
          <div>
            <h3>Free Travel Insurance</h3>
            <p>Coverage up to $150,000</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaUserShield className="benefit-icon" />
          <div>
            <h3>Maximum Coverage</h3>
            <p>No deductibles included</p>
          </div>
        </div>

        <div className="benefit-item">
          <FaMoneyBillWave className="benefit-icon" />
          <div>
            <h3>Cashback on Tolls</h3>
            <p>Toll charges reimbursed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

<div className="dealer-cta">
  <h2>Become a Dealer & Earn Money</h2>
  <p>
    List your cars, manage bookings, and earn daily income by becoming
    an authorized dealer on CarRental.
  </p>

  <div className="dealer-benefits">
    <div>🚗 List Unlimited Cars</div>
    <div>💰 Earn Per Booking</div>
    <div>📊 Dealer Dashboard</div>
    <div>🔒 Secure Payments</div>
  </div>

  <button
    className="btn primary"
    onClick={() => navigate("/dealer/subscribe")}
  >
    Become a Dealer
  </button>
</div>