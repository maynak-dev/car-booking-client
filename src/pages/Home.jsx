import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCar, FaShieldAlt, FaHeadset, FaClock } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import CarCard from '../components/cars/CarCard';

export default function Home() {
  const { data: featuredCars } = useQuery({
    queryKey: ['featuredCars'],
    queryFn: () => API.get('/cars?limit=3').then(res => res.data.cars)
  });

  const features = [
    { icon: FaCar, title: 'Wide Selection', description: 'Choose from hundreds of vehicles' },
    { icon: FaShieldAlt, title: 'Safe & Secure', description: 'All cars fully insured' },
    { icon: FaHeadset, title: '24/7 Support', description: 'We\'re here to help anytime' },
    { icon: FaClock, title: 'Flexible Booking', description: 'Free cancellation up to 24h' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Luxury car"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            Drive Your Dream, <br className="hidden md:block" />
            <span className="text-primary-400">Any Day, Anywhere</span>
          </h1>
          <p className="text-xl mb-8 text-gray-200">
            Book the perfect car for your next adventure. Affordable rates, premium service.
          </p>
          <Link to="/cars" className="btn-primary text-lg px-8 py-4">
            Browse Cars
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Why Choose <span className="text-primary-600">CarBooking</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition"
              >
                <feature.icon className="text-5xl text-primary-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Featured <span className="text-primary-600">Cars</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCars?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/cars" className="btn-secondary">
              View All Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}