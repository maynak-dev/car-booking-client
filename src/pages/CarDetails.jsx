import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import API from '../services/api';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';

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

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  const images = car.images ? JSON.parse(car.images) : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img src={images[0] || '/default-car.jpg'} alt={car.name} className="w-full h-96 object-cover rounded-lg" />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {images.slice(1).map((img, i) => (
              <img key={i} src={img} alt="" className="w-full h-24 object-cover rounded cursor-pointer" />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{car.name}</h1>
          <p className="text-gray-600 text-xl">{car.brand} {car.model} {car.year}</p>
          <div className="mt-4 space-y-2">
            <p><strong>Type:</strong> {car.type}</p>
            <p><strong>Fuel:</strong> {car.fuelType}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
            <p><strong>Seats:</strong> {car.seats}</p>
            <p><strong>Price:</strong> <span className="text-2xl font-bold text-blue-600">${car.pricePerDay}</span> / day</p>
          </div>
          <p className="mt-4">{car.description}</p>

          <div className="mt-8 border-t pt-8">
            <h2 className="text-xl font-bold mb-4">Book this car</h2>
            <div className="flex gap-4 mb-4">
              <DatePicker
                selected={startDate}
                onChange={date => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                className="border p-2 rounded"
              />
              <DatePicker
                selected={endDate}
                onChange={date => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                className="border p-2 rounded"
              />
            </div>
            <button
              onClick={handleCheckAvailability}
              disabled={checking}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {checking ? 'Checking...' : 'Check Availability & Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}