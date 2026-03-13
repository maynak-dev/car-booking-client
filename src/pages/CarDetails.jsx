import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaGasPump, FaCogs, FaUserFriends, FaCalendarAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { format, differenceInDays } from 'date-fns';
import API from '../services/api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().setDate(new Date().getDate() + 1)));
  const [checking, setChecking] = useState(false);

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => API.get(`/cars/${id}`).then(res => res.data)
  });

  const handleCheckAvailability = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    setChecking(true);
    try {
      const { data } = await API.get('/bookings/check-availability', {
        params: {
          carId: id,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      if (data.available) {
        navigate(`/booking/${id}`, {
          state: { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
        });
      } else {
        toast.error('Car not available for selected dates');
      }
    } catch (error) {
      toast.error('Error checking availability');
    } finally {
      setChecking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const images = car.images ? JSON.parse(car.images) : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-custom py-8"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg mb-4">
            <img
              src={images[0] || '/default-car.jpg'}
              alt={car.name}
              className="w-full h-96 object-cover"
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt=""
                  className="h-20 w-full object-cover rounded-lg cursor-pointer hover:opacity-80 transition"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-3xl font-display font-bold mb-2">{car.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{car.brand} {car.model} {car.year}</p>

          <div className="flex items-center mb-6">
            <span className="text-4xl font-bold text-primary-600">${car.pricePerDay}</span>
            <span className="text-gray-500 ml-2">/ day</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-700">
              <FaGasPump className="mr-2 text-primary-500" />
              <span>{car.fuelType}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaCogs className="mr-2 text-primary-500" />
              <span>{car.transmission}</span>
            </div>
            <div className="flex items-center text-gray-700">
              <FaUserFriends className="mr-2 text-primary-500" />
              <span>{car.seats} Seats</span>
            </div>
            <div className="flex items-center text-gray-700">
              {car.isAvailable ? (
                <>
                  <FaCheck className="mr-2 text-green-500" />
                  <span className="text-green-600">Available</span>
                </>
              ) : (
                <>
                  <FaTimes className="mr-2 text-red-500" />
                  <span className="text-red-600">Not Available</span>
                </>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-6">{car.description}</p>

          {/* Booking Widget */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Book This Car</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    minDate={new Date()}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Date</label>
                <div className="relative">
                  <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                  <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <div className="flex justify-between mb-2">
                <span>Total days:</span>
                <span className="font-semibold">{differenceInDays(endDate, startDate)} days</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total price:</span>
                <span className="text-primary-600">
                  ${differenceInDays(endDate, startDate) * car.pricePerDay}
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckAvailability}
              disabled={checking || !car.isAvailable}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50"
            >
              {checking ? 'Checking...' : car.isAvailable ? 'Check Availability & Book' : 'Not Available'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}