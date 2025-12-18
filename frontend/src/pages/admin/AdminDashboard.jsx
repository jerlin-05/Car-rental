import { FaUsers, FaCar, FaClipboardList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>
      <p className="admin-subtitle">Welcome Admin 👋</p>

      {/* TOP CARDS */}
      <div className="admin-stats">
        <div className="stat-card" onClick={() => navigate("/admin/users")}>
          <FaUsers className="stat-icon" />
          <h3>Users</h3>
          <p>Manage all users</p>
        </div>

        <div className="stat-card" onClick={() => navigate("/admin/cars")}>
          <FaCar className="stat-icon" />
          <h3>Cars</h3>
          <p>Add / Edit / Delete cars</p>
        </div>

        <div className="stat-card" onClick={() => navigate("/admin/bookings")}>
          <FaClipboardList className="stat-icon" />
          <h3>Bookings</h3>
          <p>View all bookings</p>
        </div>
      </div>

      {/* ACTION SECTIONS */}
      <div className="admin-sections">
        <div className="admin-box">
          <h2>Manage Users</h2>
          <p>View users, change roles, block accounts</p>
          <button className="btn" onClick={() => navigate("/admin/users")}>
            View Users
          </button>
        </div>

        <div className="admin-box">
          <h2>Manage Cars</h2>
          <p>Add new cars, edit details, delete listings</p>
          <button className="btn" onClick={() => navigate("/admin/cars")}>
            Manage Cars
          </button>
        </div>

        <div className="admin-box">
          <h2>View Bookings</h2>
          <p>See all bookings and payment status</p>
          <button className="btn" onClick={() => navigate("/admin/bookings")}>
            View Bookings
          </button>
        </div>
      </div>
    </div>
  );
}
