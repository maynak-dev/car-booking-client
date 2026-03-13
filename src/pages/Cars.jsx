import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import CarCard from '../components/cars/CarCard';
import FilterSidebar from '../components/cars/FilterSidebar';

export default function Cars() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['cars', filters, page],
    queryFn: () => API.get('/cars', { params: { ...filters, page } }).then(res => res.data)
  });

  if (isLoading) return <div className="container mx-auto px-4 py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </aside>
        <main className="md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.cars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
          {data?.totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="px-4 py-2">Page {page} of {data.totalPages}</span>
              <button
                onClick={() => setPage(p => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}