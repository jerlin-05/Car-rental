import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings")
      .then(res => setBookings(res.data));
  }, []);

  return (
    <div className="page">
      <h1 className="section-title">Bookings</h1>

      {bookings.length === 0 && <p>No bookings yet</p>}

      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>Dates</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b._id}>
              <td>{b.userName}</td>
              <td>{b.carName}</td>
              <td>
                {new Date(b.startDate).toDateString()} –{" "}
                {new Date(b.endDate).toDateString()}
              </td>
              <td>₹{b.totalPrice}</td>
              <td>{b.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
