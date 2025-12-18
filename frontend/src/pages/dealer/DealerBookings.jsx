import { useEffect, useState } from "react";
import axios from "axios";

export default function DealerBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/dealer/bookings",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBookings(res.data);
  };

  return (
    <div className="admin-page">
      <h2>My Car Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings yet</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Car</th>
              <th>User</th>
              <th>From</th>
              <th>To</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.car?.name}</td>
                <td>{b.user?.name}</td>
                <td>{b.startDate}</td>
                <td>{b.endDate}</td>
                <td>₹{b.totalPrice}</td>
                <td>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
