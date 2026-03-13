import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img src="/hero-bg.jpg" alt="Cars" className="absolute inset-0 w-full h-full object-cover" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Drive Your Dream</h1>
          <p className="text-xl mb-8">Book the perfect car for your next adventure</p>
          <Link to="/cars" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition">
            Browse Cars
          </Link>
        </motion.div>
      </section>
    </div>
  );
}