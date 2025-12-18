import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  // FILTER STATES
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [fuel, setFuel] = useState("");
  const [seats, setSeats] = useState("");

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchCars();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [search, location, fuel, seats, cars]);

  const fetchCars = async () => {
    const res = await axios.get("http://localhost:5000/api/cars");
    setCars(res.data);
    setFilteredCars(res.data);
  };

  const applyFilters = () => {
    let data = [...cars];

    if (search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      data = data.filter((c) => c.location === location);
    }

    if (fuel) {
      data = data.filter((c) => c.fuel === fuel);
    }

    if (seats) {
      data = data.filter((c) => c.seats === Number(seats));
    }

    setFilteredCars(data);
  };

  return (
    <div className="cars-page">
      <h1>Available Cars</h1>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <input
          placeholder="Search car"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">Location</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Kerala">Kerala</option>
        </select>

        <select value={fuel} onChange={(e) => setFuel(e.target.value)}>
          <option value="">Fuel</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>

        <select value={seats} onChange={(e) => setSeats(e.target.value)}>
          <option value="">Seats</option>
          <option value="5">5</option>
          <option value="7">7</option>
        </select>
      </div>

      {/* CARS GRID */}
      <div className="car-grid">
        {filteredCars.map((car) => (
          <div className="car-card" key={car._id}>
            <img src={car.image} alt={car.name} />

            <h3>{car.name}</h3>
            <p>{car.location}</p>
            <p>
              {car.fuel} • {car.seats} Seats
            </p>

            <div className="card-footer">
              <span>₹{car.price}/day</span>

              <button
                className="btn primary"
                onClick={() => {
                  if (!user) {
                    navigate("/login", {
                      state: { redirectTo: `/cars/${car._id}` },
                    });
                  } else {
                    navigate(`/cars/${car._id}`);
                  }
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
