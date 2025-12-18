import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    fuel: "",
    seats: "",
    price: "",
    image: "",
    location: "",
  });

  const token = localStorage.getItem("token");

  const loadCars = async () => {
    const res = await axios.get("http://localhost:5000/api/admin/cars", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCars(res.data);
  };

  useEffect(() => {
    loadCars();
  }, []);

  const submit = async () => {
    if (!form.location) {
      alert("Select location");
      return;
    }

    if (editId) {
      await axios.put(
        `http://localhost:5000/api/admin/cars/${editId}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditId(null);
    } else {
      await axios.post("http://localhost:5000/api/admin/cars", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({
      name: "",
      type: "",
      fuel: "",
      seats: "",
      price: "",
      image: "",
      location: "",
    });

    loadCars();
  };

  const editCar = (car) => {
    setEditId(car._id);
    setForm(car);
  };

  const deleteCar = async (id) => {
    await axios.delete(`http://localhost:5000/api/admin/cars/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadCars();
  };

  return (
    <div className="admin-container">
      <h1>Manage Cars</h1>

      <div className="form-row">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Type" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
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

        <button className="btn primary" onClick={submit}>
          {editId ? "Update Car" : "Add Car"}
        </button>
      </div>

      <div className="car-grid">
        {cars.map((car) => (
          <div className="car-card" key={car._id}>
            <img src={car.image} alt={car.name} />
            <h3>{car.name}</h3>
            <p>{car.location}</p>
            <p>₹{car.price}/day</p>
            <button className="btn primary" onClick={() => editCar(car)}>Edit</button>
            <button className="btn danger" onClick={() => deleteCar(car._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
