import { Link } from 'react-router-dom';
import { FaCar, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import useAuthStore from '../../store/authStore';
import { useState, useRef, useEffect } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FaCar className="text-primary-600 text-2xl" />
            <span className="font-display font-bold text-xl text-gray-900">CarBooking</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">Home</Link>
            <Link to="/cars" className="text-gray-700 hover:text-primary-600 transition">Browse Cars</Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <FaUserCircle className="text-gray-500 text-2xl" />
                  <span className="hidden md:inline text-sm font-medium text-gray-700">{user?.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => { logout(); setDropdownOpen(false); }}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition">Login</Link>
                <Link to="/register" className="btn-primary px-4 py-2 text-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}