import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function DealerSubscribe() {
  const { user, role } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  if (role === "dealer") {
    navigate("/dealer/dashboard");
    return null;
  }

  return (
    <div className="page">
      <h1>Dealer Membership</h1>

      <div className="card" style={{ maxWidth: "500px", margin: "auto" }}>
        <h2>₹1999 / Year</h2>
        <ul style={{ marginTop: "20px" }}>
          <li>✔ Unlimited car listings</li>
          <li>✔ Dealer dashboard</li>
          <li>✔ Booking management</li>
          <li>✔ Secure payments</li>
        </ul>

        <button
          className="btn primary"
          style={{ marginTop: "20px", width: "100%" }}
          onClick={() => alert("Stripe payment integration here")}
        >
          Pay & Become Dealer
        </button>
      </div>
    </div>
  );
}
