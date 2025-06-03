/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CalendarIcon, DirectorIcon, GenreIcon } from "../components/Icons";
import { useAuth } from "../context/AuthContext";

export default function Movies() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState([]);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5070/api/movies");
        const movieData = res.data;

        const ratingRes = await axios.get("http://localhost:5070/api/movies/ratings");
        setRatings(ratingRes.data);

        const moviesWithPosters = await Promise.all(
          movieData.map(async (movie) => {
            try {
              const omdbRes = await axios.get(
                `https://www.omdbapi.com/?t=${encodeURIComponent(movie.title)}&apikey=ee4cd9b0`
              );
              return {
                ...movie,
                poster: omdbRes.data.Response === "True" ? omdbRes.data.Poster : null,
              };
            } catch (err) {
              return { ...movie, poster: null };
            }
          })
        );

        const ratedMovies = moviesWithPosters.map((movie) => {
          const match = ratingRes.data.find((r) => r._id === movie._id);
          return {
            ...movie,
            avgRating: match?.avgRating || null,
            reviewCount: match?.reviewCount || 0,
          };
        });

        const grouped = ratedMovies.reduce((acc, movie) => {
          const genre = movie.genre || "Okänd";
          if (!acc[genre]) acc[genre] = [];
          acc[genre].push(movie);
          return acc;
        }, {});

        setMoviesByGenre(grouped);
      } catch (err) {
        console.error("Kunde inte hämta filmer", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-background transition-colors duration-300">
        <div className="text-accent text-xl animate-pulse">Laddar filmer...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black dark:bg-background dark:text-text px-6 py-12 transition-colors duration-300">
      {/* Knapp-rad med logga ut och adminpanel */}
      <div className="flex justify-end items-center gap-4 max-w-7xl mx-auto mb-6">
        {user?.role === "admin" && (
          <button
            onClick={() => navigate("/admin")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
          >
            Adminpanel
          </button>
        )}

        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow transition"
        >
          Logga ut
        </button>
      </div>

      <h2 className="text-4xl font-title text-accent text-center mb-16">Alla filmer</h2>

      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre} className="mb-16">
          <h3 className="text-2xl font-semibold text-accent mb-6 text-left">{genre}</h3>

          <div className="flex justify-center">
            <div className="flex gap-6 overflow-x-auto max-w-7xl px-4 min-h-[400px] scrollbar-hide hover:scrollbar-thin hover:scrollbar-thumb-accent hover:scrollbar-track-transparent rounded-md">
              {movies.map((movie) => (
                <Link to={`/movies/${movie._id}`} key={movie._id} className="flex-shrink-0">
                  <div className="bg-gray-100 dark:bg-black/50 w-[220px] h-[370px] mt-3 rounded-xl shadow-glow overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={movie.poster || "https://via.placeholder.com/300x400?text=Poster"}
                      alt={movie.title}
                      className="w-full h-[240px] object-cover bg-black"
                    />
                    <div className="p-3 space-y-1">
                      <h3 className="text-base font-semibold leading-tight line-clamp-2">
                        {movie.title}
                      </h3>
                      {movie.avgRating && (
                        <p className="text-sm text-yellow-400 flex items-center gap-1">
                          ⭐ {movie.avgRating} ({movie.reviewCount})
                        </p>
                      )}
                      <p className="text-sm text-black dark:text-white/80 flex items-center gap-1">
                        <DirectorIcon className="text-accent" /> {movie.director}
                      </p>
                      <p className="text-sm text-black/60 dark:text-white/60 flex items-center gap-1">
                        <CalendarIcon className="text-accent" /> {movie.releaseYear}
                        <span className="mx-1">•</span>
                        <GenreIcon className="text-accent" /> {movie.genre}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}