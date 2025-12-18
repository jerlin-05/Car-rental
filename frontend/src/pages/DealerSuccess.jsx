import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function DealerSuccess() {
  const { token, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const upgrade = async () => {
      await axios.post(
        "http://localhost:5000/api/dealer/upgrade-success",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // update role locally
      login(token, "dealer");
      navigate("/dealer/dashboard");
    };

    upgrade();
  }, []);

  return <h2 style={{ padding: "40px" }}>Processing payment...</h2>;
}
