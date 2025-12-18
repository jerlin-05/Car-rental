import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function BecomeDealer() {
  const { user, role, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
    if (role === "dealer") navigate("/dealer/dashboard");
  }, [user, role, navigate]);

  if (!user || role !== "user") return null;

  // 🔥 STRIPE PAYMENT HANDLER (FIXED URL)
  const startPayment = async (plan) => {
    try {
      const res = await axios.post(
  "http://localhost:5000/api/dealer/dealer-subscription",
  { plan },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

window.location.href = res.data.url;
      // 🚀 Redirect to Stripe Checkout
      window.location.href = res.data.url;
    } catch (err) {
      console.error(err);
      alert("Unable to start payment");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "60px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>
          Become a Dealer 🚗
        </h1>

        <p style={{ color: "#64748b", marginBottom: "30px" }}>
          Upgrade your account to list cars, manage bookings, and earn money daily.
        </p>

        {/* FEATURES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div>✔ List unlimited cars</div>
          <div>✔ Manage bookings</div>
          <div>✔ Monthly earnings</div>
          <div>✔ Dealer dashboard</div>
        </div>

        {/* PLANS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {/* MONTHLY PLAN */}
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "16px",
              padding: "30px",
            }}
          >
            <h2>Monthly Plan</h2>
            <p style={{ fontSize: "28px", fontWeight: "700" }}>
              ₹999 <span style={{ fontSize: "16px" }}>/ month</span>
            </p>

            <ul style={{ marginTop: "16px", color: "#475569" }}>
              <li>Unlimited car listings</li>
              <li>Dealer dashboard</li>
              <li>Booking management</li>
            </ul>

            <button
              className="btn primary"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={() => startPayment("monthly")}
            >
              Subscribe Monthly
            </button>
          </div>

          {/* YEARLY PLAN */}
          <div
            style={{
              border: "2px solid #2563eb",
              borderRadius: "16px",
              padding: "30px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "-12px",
                right: "20px",
                background: "#2563eb",
                color: "#fff",
                padding: "4px 12px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              BEST VALUE
            </span>

            <h2>Yearly Plan</h2>
            <p style={{ fontSize: "28px", fontWeight: "700" }}>
              ₹9,999 <span style={{ fontSize: "16px" }}>/ year</span>
            </p>

            <p style={{ color: "#16a34a", fontWeight: "600" }}>
              Save ₹1,989 yearly 🎉
            </p>

            <ul style={{ marginTop: "16px", color: "#475569" }}>
              <li>Everything in Monthly</li>
              <li>Priority dealer support</li>
              <li>One-time yearly payment</li>
            </ul>

            <button
              className="btn primary"
              style={{ marginTop: "20px", width: "100%" }}
              onClick={() => startPayment("yearly")}
            >
              Subscribe Yearly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
