import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">CarBooking</Link>
          <div className="flex items-center space-x-4">
            <Link to="/cars" className="text-gray-700 hover:text-blue-600">Cars</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
                <span className="text-gray-700">Hi, {user?.name}</span>
                <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}