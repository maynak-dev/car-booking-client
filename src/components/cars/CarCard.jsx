import { Link } from 'react-router-dom';
import { FaGasPump, FaCogs, FaUserFriends, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function CarCard({ car }) {
  const images = car.images ? JSON.parse(car.images) : [];
  const firstImage = images[0] || '/default-car.jpg';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card overflow-hidden group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={firstImage}
          alt={car.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {!car.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Not Available</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{car.name}</h3>
            <p className="text-gray-600 text-sm">{car.brand} {car.model} {car.year}</p>
          </div>
          <div className="flex items-center text-yellow-500">
            <FaStar className="mr-1" />
            <span className="text-sm font-medium">4.5</span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span className="flex items-center"><FaGasPump className="mr-1" /> {car.fuelType}</span>
          <span className="flex items-center"><FaCogs className="mr-1" /> {car.transmission}</span>
          <span className="flex items-center"><FaUserFriends className="mr-1" /> {car.seats}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-2xl font-bold text-primary-600">${car.pricePerDay}</span>
            <span className="text-gray-500 text-sm"> / day</span>
          </div>
          <Link
            to={`/cars/${car.id}`}
            className="btn-primary px-4 py-2 text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}