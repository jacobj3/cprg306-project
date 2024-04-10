import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Image from "next/image";

const API_KEY = "36ea91bcca88cd25d05f7bef389386cd";

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const youtubeTrailer = data.results.find(
              (video) => video.site === "YouTube" && video.type === "Trailer"
            );
            setVideo(youtubeTrailer);
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching movie details:", error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="p-6 bg-gray-800 rounded-lg text-white"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <h2 className="text-4xl font-bold mb-4">{movie.title}</h2>
      <div className="flex space-x-4">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie.title}
          width={400}
          height={600}
          className="rounded shadow-lg"
        />
        <div>
          <p className="mb-2">
            <span className="font-bold">Overview:</span> {movie.overview}
          </p>
          <p className="mb-2">
            <span className="font-bold">Language:</span>{" "}
            {movie.original_language}
          </p>
          <p className="mb-2">
            <span className="font-bold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="mb-2">
            <span className="font-bold">Rating:</span> {movie.vote_average}
          </p>
          <p className="mb-2">
            <span className="font-bold">Votes:</span> {movie.vote_count}
          </p>
          <p className="mb-2">
            <span className="font-bold">Runtime:</span> {movie.runtime}m
          </p>
          <div className="mb-2">
            <span className="font-bold">Genres:</span>
            {movie.genres.map((genre, index) => (
              <div
                key={index}
                className="inline-block bg-gradient-to-r from-orange-400 to-red-500 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2"
              >
                {genre.name}
              </div>
            ))}
          </div>
          {video && (
            <div className="mt-4 overflow-hidden shadow-lg">
              <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.key}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
