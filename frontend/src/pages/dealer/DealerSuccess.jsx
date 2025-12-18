import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DealerSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const upgradeRole = async () => {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/auth/upgrade-to-dealer",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/dealer/dashboard");
    };

    upgradeRole();
  }, [navigate]);

  return <h2 style={{ padding: "40px" }}>Upgrading your account...</h2>;
}
