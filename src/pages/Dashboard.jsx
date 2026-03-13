import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['myBookings'],
    queryFn: () => API.get('/bookings/my').then(res => res.data)
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {bookings?.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{booking.car.name}</h3>
                <p>{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</p>
                <p>Total: ${booking.totalPrice}</p>
                <p>Status: <span className={`px-2 py-1 rounded text-sm ${
                  booking.status === 'CONFIRMED' ? 'bg-green-200 text-green-800' :
                  booking.status === 'CANCELLED' ? 'bg-red-200 text-red-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>{booking.status}</span></p>
              </div>
              {booking.status === 'PENDING' && (
                <button
                  onClick={async () => {
                    await API.put(`/bookings/${booking.id}/cancel`);
                    window.location.reload();
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}