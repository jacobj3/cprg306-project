import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
const API_KEY = "36ea91bcca88cd25d05f7bef389386cd";

const Movie = ({ searchTerm }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("popular");
  const [tabClicked, setTabClicked] = useState(false);

  const getMovies = useCallback((searchTerm, type = "popular") => {
    setCurrentTab(type);
    setIsLoading(true);
    let url;
    if (searchTerm) {
      url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchTerm
      )}&api_key=${API_KEY}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data.results.filter((movie) => movie.poster_path));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!tabClicked) {
      getMovies(searchTerm, currentTab);
    }
    setTabClicked(false);
    return () => {
      setMovies([]);
    };
  }, [searchTerm, currentTab, tabClicked, getMovies]);

  return (
    <div className="mx-auto max-w-screen-xxl p-6">
      <div className="hero bg-gradient-to-r from-orange-400 to-red-500 text-white p-6 rounded-lg mb-6">
        <h1 className="text-3xl font-bold">Welcome!</h1>
        <p className="text-lg mt-4">
          Feel free to view popular, top rated, and upcoming movies below or
          discover new gems with our user-friendly search feature. Want to delve
          deeper into the details? Click on any movie to uncover insightful
          information and watch the trailer.
        </p>
      </div>
      <div className="mb-10 mt-8">
        <button
          className={`text-1xl mx-2 font-bold ${
            currentTab === "popular" ? "text-orange-400" : ""
          }`}
          onClick={() => {
            setTabClicked(true);
            getMovies(null, "popular");
          }}
        >
          POPULAR
        </button>
        <button
          className={`text-1xl mx-2 font-bold ${
            currentTab === "top_rated" ? "text-orange-500" : ""
          }`}
          onClick={() => {
            setTabClicked(true);
            getMovies(null, "top_rated");
          }}
        >
          TOP RATED
        </button>
        <button
          className={`text-1xl mx-2 font-bold ${
            currentTab === "upcoming" ? "text-orange-500" : ""
          }`}
          onClick={() => {
            setTabClicked(true);
            getMovies(null, "upcoming");
          }}
        >
          UPCOMING
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie) => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Movie;
