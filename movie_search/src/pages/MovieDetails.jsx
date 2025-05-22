import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!movie) return <div className="error-message">Movie not found</div>;

  // Find the first YouTube trailer if available
  const trailer = movie.videos?.results.find(
    video => video.site === "YouTube" && video.type === "Trailer"
  );

  return (
    <div className="movie-details">
      {/* Background image */}
      {movie.backdrop_path && (
        <div 
          className="backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        />
      )}

      <div className="details-container">
        <div className="details-header">
          {movie.poster_path && (
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="details-poster" 
            />
          )}

          <div className="details-main">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}
            
            <div className="metadata-row">
              <span>{movie.release_date?.split("-")[0]}</span>
              {movie.runtime && <span>{movie.runtime} min</span>}
              <span>{movie.vote_average.toFixed(1)}/10</span>
            </div>
            
            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>
            
            <p className="overview">{movie.overview}</p>
            
            <div>
              <button 
                className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
                onClick={() => {
                  isFavorite(movie.id)
                    ? removeFromFavorites(movie.id)
                    : addToFavorites(movie);
                }}
              >
                {isFavorite(movie.id) ? "❤︎" : "❤︎"}
              </button>
              
              {trailer && (
                <a 
                  href={`https://www.youtube.com/watch?v=${trailer.key}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="watch-trailer-btn"
                >
                  ▶ Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Cast section */}
        {movie.credits?.cast?.length > 0 && (
          <div className="section">
            <h2>Cast</h2>
            <div className="scrollable-list">
              {movie.credits.cast.slice(0, 10).map(person => (
                <div key={person.id} className="cast-item">
                  {person.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      className="cast-image"
                    />
                  ) : (
                    <div className="cast-image-placeholder"></div>
                  )}
                  <p className="cast-name">{person.name}</p>
                  <p className="cast-character">{person.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos section */}
        {movie.videos?.results?.length > 0 && (
          <div className="section">
            <h2>Videos</h2>
            <div className="scrollable-list videos-list">
              {movie.videos.results.map(video => (
                <div key={video.id} className="video-item">
                  <a 
                    href={`https://www.youtube.com/watch?v=${video.key}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="video-thumbnail">
                      <img 
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt={video.name}
                      />
                      <div className="play-icon">▶</div>
                    </div>
                    <p className="video-name">{video.name}</p>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Movies */}
        {movie.similar?.results?.length > 0 && (
          <div className="section">
            <h2>Similar Movies</h2>
            <div className="scrollable-list">
              {movie.similar.results.slice(0, 6).map(similar => (
                <div key={similar.id} className="similar-item">
                  {similar.poster_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${similar.poster_path}`}
                      alt={similar.title}
                      className="similar-image"
                    />
                  ) : (
                    <div className="similar-image-placeholder"></div>
                  )}
                  <p className="similar-title">{similar.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;
