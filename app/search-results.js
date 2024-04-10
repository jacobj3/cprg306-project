import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Image from "next/image";

const API_KEY = "36ea91bcca88cd25d05f7bef389386cd";

const SearchResults = () => {
  const { term } = useParams();
  const searchTerm = decodeURIComponent(term);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results.filter((movie) => movie.poster_path));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      });
  }, [searchTerm]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (movies.length === 0) {
    return (
      <p className="p-6 text-2xl font-bold mb-10">
        No results found for{" "}
        <span className="text-orange-500">{searchTerm}</span>
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xxl p-6">
      <h2 className="text-2xl font-bold mb-10">
        <span className="text-white">Search results for </span>
        <span className="text-orange-400">{searchTerm}</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex flex-col items-start mx-2">
            <Link to={`/movie/${movie.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="max-w-full rounded-lg"
              />
            </Link>
            <div className="mt-2">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
