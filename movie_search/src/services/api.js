const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
    );
    if (!response.ok) throw new Error('Search failed');
    return response.json();
  } catch {
    throw new Error('Failed to search movies');
  }
};


export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos,images,credits,keywords,similar,reviews`
  );
  if (!response.ok) throw new Error("Movie not found");
  return response.json();
};

export const getTrendingMovies = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const getGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  return data.genres;
};

export const getFilteredMovies = async (filters = {}, page = 1) => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    page: page,
    sort_by: filters.sortBy || 'popularity.desc' // Default sorting
  });

  // Add optional filters
  if (filters.genres) params.append('with_genres', filters.genres);
  if (filters.year) params.append('primary_release_year', filters.year);

  const response = await fetch(
    `${BASE_URL}/discover/movie?${params}`
  );
  return response.json();
};


