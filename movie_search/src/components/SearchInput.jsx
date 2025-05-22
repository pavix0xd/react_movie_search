import React, { useState, useEffect } from "react";
import { debounce } from "lodash";
import { searchMovies } from "../services/api";

const SearchInput = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounced search function
  const debouncedSearch = debounce(async (searchTerm) => {
    if (searchTerm.trim()) {
      try {
        setLoading(true);
        const data = await searchMovies(searchTerm, 1);
        setSuggestions(data.results.slice(0, 5)); // Show top 5 suggestions
        setError(null);
      } catch {
        setError("Failed to load suggestions");
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
<div className="search-container">
  <form onSubmit={handleSubmit} className="search-form">
    <div className="search-input-wrapper">
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        autoComplete="off"
      />
      {loading && <div className="loading-indicator"></div>}
      {suggestions.length > 0 && (
        <div className="suggestions-dropdown">
          {suggestions.map(movie => (
            <div
              key={movie.id}
              className="suggestion-item"
              onClick={() => {
                setQuery(movie.title);
                onSearch(movie.title);
              }}
            >
              {movie.title} ({movie.release_date?.split('-')[0]})
            </div>
          ))}
        </div>
      )}
      {query && suggestions.length === 0 && !loading && (
        <div className="no-results">No suggestions found</div>
      )}
    </div>
    <button type="submit" className="search-btn">
      Search
    </button>
  </form>
  {error && <div className="search-error">{error}</div>}
</div>

  );
};

export default SearchInput;
