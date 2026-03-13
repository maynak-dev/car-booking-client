import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">CarBooking</h3>
            <p className="text-gray-400">Your trusted partner for car rentals worldwide.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/cars" className="hover:text-white transition">Cars</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-white transition">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition">Privacy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CarBooking. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}