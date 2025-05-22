import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../styles/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";
import Pagination from "../components/Pagination" 

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

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

        {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
