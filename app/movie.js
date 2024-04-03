"use client";

import React, { useEffect, useState } from "react";

function Movie() {
  const [movie, setMovie] = useState([]);

  const getMovie = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=36ea91bcca88cd25d05f7bef389386cd"
    )
      .then((response) => response.json())
      .then((json) => setMovie(json.results));
  };

  useEffect(() => {
    getMovie();
  }, []);

  const enlargePoster = (event) => {
    event.target.style.transform = "scale(1.1)";
  };

  const shrinkPoster = (event) => {
    event.target.style.transform = "scale(1)";
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
      {movie.map((movie) => (
        <div
          key={movie.id}
          className="flex justify-center mx-2" // Adjust margin here
          onMouseEnter={enlargePoster}
          onMouseLeave={shrinkPoster}
          style={{ width: "225px" }} // Adjust the width here
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="max-w-full rounded-lg transition-transform duration-300"
            style={{ transform: "scale(1)" }}
          />
        </div>
      ))}
    </div>
  );
}

export default Movie;
