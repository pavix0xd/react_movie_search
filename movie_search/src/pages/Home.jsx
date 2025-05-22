import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../main.css";
import { searchMovies, getPopularMovies } from "../services/api";
import Pagination from "../components/Pagination";
import SearchInput from "../components/SearchInput";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        let data;
        if (searchQuery.trim()) {
          data = await searchMovies(searchQuery, currentPage);
        } else {
          data = await getPopularMovies(currentPage);
        }

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
  }, [currentPage, searchQuery]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="home">
      <SearchInput
        onSearch={(searchTerm) => {
          setSearchQuery(searchTerm);
          setCurrentPage(1);
        }}
      />
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

export default Home;
