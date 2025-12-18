import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #020617, #020617)",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LOGO */}
      <Link
        to="/"
        style={{
          color: "#fff",
          fontSize: "22px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        CarRental
      </Link>

      {/* LINKS */}
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/cars">Cars</Link>

        {/* ADMIN */}
        {user && role === "admin" && (
          <Link className="nav-link" to="/admin/dashboard">
            Admin
          </Link>
        )}

        {/* DEALER */}
        {user && role === "dealer" && (
          <>
            <Link className="nav-link" to="/dealer/dashboard">Dealer</Link>
            <Link className="nav-link" to="/dealer/cars">Manage Cars</Link>
            <Link className="nav-link" to="/dealer/bookings">Bookings</Link>
          </>
        )}

        {/* BEFORE LOGIN */}
        {!user && (
          <>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/signup">Signup</Link>
          </>
        )}

        {/* AFTER LOGIN */}
        {user && (
          <button
            onClick={handleLogout}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
