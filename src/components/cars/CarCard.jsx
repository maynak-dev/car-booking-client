import { Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaUserFriends } from 'react-icons/fa';

export default function CarCard({ car }) {
  const images = car.images ? JSON.parse(car.images) : [];
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
      <img src={images[0] || '/default-car.jpg'} alt={car.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{car.name}</h3>
        <p className="text-gray-600">{car.brand} {car.model} {car.year}</p>
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span className="flex items-center gap-1"><FaGasPump /> {car.fuelType}</span>
          <span className="flex items-center gap-1"><FaCogs /> {car.transmission}</span>
          <span className="flex items-center gap-1"><FaUserFriends /> {car.seats}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}<span className="text-sm font-normal text-gray-500">/day</span></span>
          <Link to={`/cars/${car.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}