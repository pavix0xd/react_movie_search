import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import { getTrendingMovies } from '../services/api';

function Trending() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await getTrendingMovies(currentPage);
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, [currentPage]);

  return (
    <div className="movies-page">
      <h1>Trending Movies</h1>
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

export default Trending;
