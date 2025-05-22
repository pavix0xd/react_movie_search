import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPersonDetails } from "../services/api";
import "../main.css";

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const data = await getPersonDetails(id);
        setPerson(data);
      } catch {
        setError("Failed to load person details");
      } finally {
        setLoading(false);
      }
    };
    fetchPerson();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!person) return <div className="error-message">Person not found</div>;

  return (
    <div className="person-details">
      <div className="person-header">
        {person.profile_path && (
          <img
            src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
            alt={person.name}
            className="person-photo"
          />
        )}
        <div>
          <h2>{person.name}</h2>
          <p><strong>Born:</strong> {person.birthday} {person.place_of_birth && `in ${person.place_of_birth}`}</p>
          {person.deathday && <p><strong>Died:</strong> {person.deathday}</p>}
        </div>
      </div>
      <p className="person-bio">{person.biography || "No biography available."}</p>
      <h3>Known For</h3>
      <div className="movies-grid">
        {person.movie_credits?.cast?.slice(0, 12).map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="movie-card-link">
            <div className="movie-card">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                />
              ) : (
                <div className="movie-poster-placeholder"></div>
              )}
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PersonDetails;
