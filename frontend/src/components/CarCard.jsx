import React from 'react';
import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <img src={car.image || 'https://via.placeholder.com/400x200'} alt={car.name} className="w-full h-48 object-cover rounded" />
      <h3 className="mt-3 text-lg font-semibold">{car.brand} - {car.name}</h3>
      <p className="text-sm text-gray-600">{car.description?.slice(0,120)}</p>
      <div className="mt-3 flex justify-between items-center">
        <div>
          <div className="text-xl font-bold">${car.dailyRate}/day</div>
          <div className="text-sm text-gray-500">{car.seats} seats</div>
        </div>
        <Link to={`/car/${car._id}`} className="btn bg-blue-600 text-white">Book</Link>
      </div>
    </div>
  )
}
