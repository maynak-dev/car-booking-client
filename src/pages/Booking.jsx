import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { differenceInDays, format } from 'date-fns';
import API from '../services/api';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Booking() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { startDate, endDate } = location.state || {};

  const { data: car, isLoading: carLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => API.get(`/cars/${id}`).then(res => res.data)
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

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
    return (
      <div className="container-custom py-20 text-center">
        <p className="text-red-600">Please select dates first.</p>
        <button onClick={() => navigate(`/cars/${id}`)} className="btn-primary mt-4">
          Go Back
        </button>
      </div>
    );
  }

  if (carLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const days = differenceInDays(new Date(endDate), new Date(startDate));
  const totalPrice = days * car.pricePerDay;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container-custom py-8 max-w-2xl"
    >
      <h1 className="text-3xl font-display font-bold mb-8">Complete Your Booking</h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Car:</span>
            <span className="font-medium">{car.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Pick-up:</span>
            <span className="font-medium">{format(new Date(startDate), 'PPP')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Drop-off:</span>
            <span className="font-medium">{format(new Date(endDate), 'PPP')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{days} days</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-3">
            <span>Total:</span>
            <span className="text-primary-600">${totalPrice}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
              className="input"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              className="input"
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className="btn-primary w-full py-3 text-lg disabled:opacity-50"
          >
            {mutation.isPending ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}