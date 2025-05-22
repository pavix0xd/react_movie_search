import { useState, useEffect } from 'react';
import { getGenres } from '../services/api';

const MovieFilters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSort, setSelectedSort] = useState('popularity.desc');

  useEffect(() => {
    const loadGenres = async () => {
      const data = await getGenres();
      setGenres(data);
    };
    loadGenres();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      genres: selectedGenres,
      year: selectedYear,
      sortBy: selectedSort
    });
  };

  // Generate year options (last 30 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="movie-filters">
      <div className="filter-group">
        <h3>Genres</h3>
        <div className="genre-checkboxes">
          {genres.map(genre => (
            <label key={genre.id}>
              <input
                type="checkbox"
                value={genre.id}
                checked={selectedGenres.includes(genre.id)}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  setSelectedGenres(prev =>
                    e.target.checked
                      ? [...prev, value]
                      : prev.filter(id => id !== value)
                  );
                }}
              />
              {genre.name}
            </label>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>
          Release Year:
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Any Year</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="filter-group">
        <label>
          Sort By:
          <select
            value={selectedSort}
            onChange={(e) => setSelectedSort(e.target.value)}
          >
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="primary_release_date.desc">Newest First</option>
            <option value="primary_release_date.asc">Oldest First</option>
          </select>
        </label>
      </div>

      <button type="submit" className="apply-filters-btn">
        Apply Filters
      </button>
    </form>
  );
};

export default MovieFilters;
