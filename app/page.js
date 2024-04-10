"use client";
import React, { useState, useEffect } from "react";
import SearchBar from "./search-bar";
import SearchResults from "./search-results";
import { Link } from "react-router-dom";

function Page() {
  const [Router, setRouter] = useState(null);
  const [Routes, setRoutes] = useState(null);
  const [Route, setRoute] = useState(null);
  const [Movie, setMovie] = useState(null);
  const [MovieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    import("react-router-dom")
      .then((module) => {
        setRouter(() => module.BrowserRouter);
        setRoutes(() => module.Routes);
        setRoute(() => module.Route);
      })
      .catch((error) => console.error(`Error loading module: ${error}`));

    import("./movie")
      .then((module) => {
        setMovie(() => module.default);
      })
      .catch((error) => console.error(`Error loading module: ${error}`));

    import("./movie-details")
      .then((module) => {
        setMovieDetails(() => module.default);
      })
      .catch((error) => console.error(`Error loading module: ${error}`));
  }, []);

  if (!Router || !Routes || !Route || !Movie || !MovieDetails) {
    return null;
  }

  return (
    <Router>
      <div className="mx-auto max-w-screen-xxl px-8 py-6 bg-gray-900 text-white min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="text-6xl font-boldfinger hover:text-gray-500 transition-colors duration-200"
          >
            FilmFinder
          </Link>
          <SearchBar className="w-64" />
        </div>
        <Routes>
          <Route path="/" element={<Movie />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:term" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Page;
