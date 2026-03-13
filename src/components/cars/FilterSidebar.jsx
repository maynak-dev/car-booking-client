import { useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';

export default function FilterSidebar({ filters, setFilters }) {
  const [isOpen, setIsOpen] = useState(false);

  const carTypes = ['SUV', 'SEDAN', 'HATCHBACK', 'CONVERTIBLE', 'COUPE', 'WAGON', 'VAN', 'PICKUP'];
  const fuelTypes = ['PETROL', 'DIESEL', 'ELECTRIC', 'HYBRID'];
  const transmissions = ['MANUAL', 'AUTOMATIC'];
  const seatsOptions = [2, 4, 5, 7];

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  return (
    <>
      {/* Mobile filter button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed bottom-4 right-4 bg-primary-600 text-white p-3 rounded-full shadow-lg z-50"
      >
        <FaSlidersH />
      </button>

      {/* Filter sidebar */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 bg-white md:bg-transparent z-40 md:z-auto overflow-y-auto p-4 md:p-0`}>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Filters</h3>
            <button onClick={clearFilters} className="text-sm text-primary-600 hover:text-primary-700">Clear all</button>
          </div>

          <div className="space-y-6">
            {/* Car Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Car Type</label>
              <select
                value={filters.type || ''}
                onChange={(e) => handleChange('type', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Types</option>
                {carTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>

            {/* Fuel Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
              <select
                value={filters.fuel || ''}
                onChange={(e) => handleChange('fuel', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All Fuels</option>
                {fuelTypes.map(fuel => <option key={fuel} value={fuel}>{fuel}</option>)}
              </select>
            </div>

            {/* Transmission */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmission</label>
              <select
                value={filters.transmission || ''}
                onChange={(e) => handleChange('transmission', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">All</option>
                {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Seats */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Seats</label>
              <select
                value={filters.seats || ''}
                onChange={(e) => handleChange('seats', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="">Any</option>
                {seatsOptions.map(s => <option key={s} value={s}>{s} Seats</option>)}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price per Day</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice || ''}
                  onChange={(e) => handleChange('minPrice', e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleChange('maxPrice', e.target.value)}
                  className="w-1/2 border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}