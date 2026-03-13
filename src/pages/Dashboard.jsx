import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { format } from 'date-fns';
import { FaCar, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => API.get('/bookings/my').then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container-custom py-8"
    >
      <h1 className="text-3xl font-display font-bold mb-8">My Dashboard</h1>

      {bookings?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">You have no bookings yet.</p>
          <a href="/cars" className="btn-primary inline-block mt-4">Browse Cars</a>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings?.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  {booking.car?.images && (
                    <img
                      src={JSON.parse(booking.car.images)[0] || '/default-car.jpg'}
                      alt={booking.car.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{booking.car?.name}</h3>
                    <p className="text-gray-600">{booking.car?.brand} {booking.car?.model}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                    booking.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center text-gray-600">
                  <FaCalendarAlt className="mr-2 text-primary-500" />
                  <span>{format(new Date(booking.startDate), 'PP')} - {format(new Date(booking.endDate), 'PP')}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaDollarSign className="mr-2 text-primary-500" />
                  <span className="font-semibold">${booking.totalPrice}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaCar className="mr-2 text-primary-500" />
                  <span className="capitalize">{booking.paymentStatus}</span>
                </div>
              </div>

              {booking.status === 'PENDING' && (
                <div className="mt-4 text-right">
                  <button
                    onClick={async () => {
                      if (window.confirm('Are you sure you want to cancel this booking?')) {
                        await API.put(`/bookings/${booking.id}/cancel`);
                        window.location.reload();
                      }
                    }}
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Cancel Booking
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}