import React from "react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const movies = [
    { id: 1, title: "John Wick", release_date: "2020" },
    { id: 2, title: "Terminator", release_date: "1999" },
    { id: 3, title: "The Matrix", release_date: "1998" },
  ];

const handleSearch = () => {

}

  return (
    <div className="home">

        <Form onSubmit = {handleSearch} className="search-form">
            <input type="text" placeholder="Search for a movie..." />
            <button type="submit" className="search-btn">Search</button>
        </Form>

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
