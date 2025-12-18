import { Link } from "react-router-dom";

export default function DealerDashboard() {
  return (
    <div className="admin-container">
      <h1 className="admin-title">Dealer Dashboard</h1>
      <p className="admin-subtitle">
        Welcome Dealer 👋 Manage your cars & bookings
      </p>

      {/* STATS */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <h3>My Cars</h3>
          <p>Manage your listed vehicles</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <h3>Bookings</h3>
          <p>View customer bookings</p>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <h3>Earnings</h3>
          <p>Track rental income</p>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="admin-sections">
        <div className="admin-box">
          <h2>Manage Cars</h2>
          <p>Add, edit or remove your cars</p>
          <Link to="/dealer/cars" className="btn">
            Go to Cars
          </Link>
        </div>

        <div className="admin-box">
          <h2>View Bookings</h2>
          <p>Check customer bookings</p>
          <Link to="/dealer/bookings" className="btn">
            View Bookings
          </Link>
        </div>
      </div>
    </div>
  );
}
