import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const redirectTo = location.state?.redirectTo || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      // ✅ SAVE FULL USER OBJECT
      login(res.data.token, res.data.user);

      // ✅ ROLE BASED REDIRECT
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else if (res.data.user.role === "dealer") {
        navigate("/dealer/dashboard");
      } else {
        navigate(redirectTo);
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          show="*"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn primary" type="submit">
          Login
        </button>
      </form>

      <p className="hint">
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
}
