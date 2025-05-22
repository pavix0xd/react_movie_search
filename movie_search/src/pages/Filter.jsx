import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../styles/Filter.css";
import { getFilteredMovies } from "../services/api";
import Pagination from "../components/Pagination";
import MovieFilters from "../components/MovieFilters";

function Filter() {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

    const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await getFilteredMovies({
          genres: filters.genres?.join(','),
          year: filters.year,
          sortBy: filters.sortBy
        }, currentPage);
        
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setError(null);
      } catch {
        setError("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [currentPage, filters]);

  return (
    <div className="home">
      <MovieFilters onFilterChange={setFilters} />
      
      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default Filter;