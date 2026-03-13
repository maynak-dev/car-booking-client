export default function FilterSidebar({ filters, setFilters }) {
  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Car Type</label>
          <select onChange={(e) => handleChange('type', e.target.value)} className="w-full border rounded p-2">
            <option value="">All</option>
            <option value="SUV">SUV</option>
            <option value="SEDAN">Sedan</option>
            <option value="HATCHBACK">Hatchback</option>
            <option value="CONVERTIBLE">Convertible</option>
            <option value="COUPE">Coupe</option>
            <option value="WAGON">Wagon</option>
            <option value="VAN">Van</option>
            <option value="PICKUP">Pickup</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Fuel Type</label>
          <select onChange={(e) => handleChange('fuel', e.target.value)} className="w-full border rounded p-2">
            <option value="">All</option>
            <option value="PETROL">Petrol</option>
            <option value="DIESEL">Diesel</option>
            <option value="ELECTRIC">Electric</option>
            <option value="HYBRID">Hybrid</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Price per day</label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              className="w-1/2 border rounded p-2"
              onChange={(e) => handleChange('minPrice', e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              className="w-1/2 border rounded p-2"
              onChange={(e) => handleChange('maxPrice', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Seats</label>
          <select onChange={(e) => handleChange('seats', e.target.value)} className="w-full border rounded p-2">
            <option value="">Any</option>
            <option value="2">2</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="7">7+</option>
          </select>
        </div>
      </div>
    </div>
  );
}