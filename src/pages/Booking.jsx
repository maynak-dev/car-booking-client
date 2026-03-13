import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import API from '../services/api';
import toast from 'react-hot-toast';

export default function Booking() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate } = location.state || {};

  const { data: car } = useQuery({
    queryKey: ['car', id],
    queryFn: () => API.get(`/cars/${id}`).then(res => res.data)
  });

  const { register, handleSubmit } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => API.post('/bookings', data),
    onSuccess: () => {
      toast.success('Booking created successfully');
      navigate('/dashboard');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  });

  const onSubmit = (formData) => {
    mutation.mutate({
      carId: id,
      startDate,
      endDate,
      ...formData
    });
  };

  if (!startDate || !endDate) {
    return <div className="container mx-auto px-4 py-8">Please select dates first.</div>;
  }

  const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
  const totalPrice = car ? days * car.pricePerDay : 0;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>
      {car && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold">{car.name}</h2>
          <p>${car.pricePerDay} per day</p>
          <p>Dates: {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</p>
          <p className="text-2xl font-bold mt-4">Total: ${totalPrice}</p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input {...register('name')} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input type="email" {...register('email')} className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input {...register('phone')} className="w-full border p-2 rounded" required />
        </div>
        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {mutation.isPending ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
}