import { useEffect, useState } from "react";
import axios from "axios";

export default function DealerCars() {
  const token = localStorage.getItem("token");

  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    name: "",
    fuel: "",
    seats: "",
    price: "",
    image: "",
    location: "",
  });

  const loadCars = async () => {
    const res = await axios.get("http://localhost:5000/api/dealer/cars", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCars(res.data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const addCar = async () => {
    if (!form.location) {
      alert("Select location");
      return;
    }

    await axios.post("http://localhost:5000/api/dealer/cars", form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setForm({
      name: "",
      fuel: "",
      seats: "",
      price: "",
      image: "",
      location: "",
    });

    loadCars();
  };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/dealer/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCars();
  };

  return (
    <div className="admin-page">
      <h2>My Cars</h2>

      <div className="form-row">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Fuel" value={form.fuel} onChange={(e) => setForm({ ...form, fuel: e.target.value })} />
        <input placeholder="Seats" value={form.seats} onChange={(e) => setForm({ ...form, seats: e.target.value })} />
        <input placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />

        <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
          <option value="">Select Location</option>
          <option>Bangalore</option>
          <option>Chennai</option>
          <option>Hyderabad</option>
          <option>Kerala</option>
        </select>

        <button className="btn primary" onClick={addCar}>Add Car</button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>{car.location}</td>
              <td>₹{car.price}</td>
              <td><img src={car.image} width="80" /></td>
              <td>
                <button className="btn danger" onClick={() => deleteCar(car._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
