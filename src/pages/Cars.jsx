import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import CarCard from '../components/cars/CarCard';
import FilterSidebar from '../components/cars/FilterSidebar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Cars() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['cars', filters, page],
    queryFn: () => API.get('/cars', { params: { ...filters, page, limit } }).then(res => res.data)
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-lg">Failed to load cars. Please try again later.</p>
      </div>
    );
  }

  const { cars, totalPages } = data;

  return (
    <div className="container-custom py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="lg:w-1/4">
          <FilterSidebar filters={filters} setFilters={setFilters} />
        </div>

        {/* Car grid */}
        <div className="lg:w-3/4">
          <h1 className="text-3xl font-display font-bold mb-6">Available Cars</h1>
          {cars?.length === 0 ? (
            <p className="text-gray-600 text-center py-12">No cars match your criteria.</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {cars?.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                  >
                    <FaChevronLeft />
                  </button>
                  <span className="text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 hover:bg-gray-50"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}