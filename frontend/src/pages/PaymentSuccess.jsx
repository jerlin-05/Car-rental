import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const upgrade = async () => {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/dealer/upgrade",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("🎉 You are now a Dealer!");
      navigate("/dealer/dashboard");
    };

    upgrade();
  }, [navigate]);

  return <h2 style={{ padding: "40px" }}>Processing upgrade...</h2>;
}
