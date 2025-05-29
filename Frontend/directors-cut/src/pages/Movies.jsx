import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CalendarIcon, DirectorIcon, GenreIcon } from "../components/Icons";

export default function Movies() {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5070/api/movies");
        const movieData = res.data;

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
            // eslint-disable-next-line no-unused-vars
            } catch (err) {
              return { ...movie, poster: null };
            }
          })
        );

        const grouped = moviesWithPosters.reduce((acc, movie) => {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-accent text-xl animate-pulse">Laddar filmer...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white px-6 py-12">
      <h2 className="text-4xl font-title text-accent text-center mb-16">Alla filmer</h2>

      {Object.entries(moviesByGenre).map(([genre, movies]) => (
        <div key={genre} className="mb-16">
          <h3 className="text-2xl font-semibold text-accent mb-6 text-left">{genre}</h3>

          <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto max-w-7xl px-4 min-h-[400px] scrollbar-hide hover:scrollbar-thin hover:scrollbar-thumb-accent hover:scrollbar-track-transparent rounded-md">
              {movies.map((movie) => (
                <Link to={`/movies/${movie._id}`} key={movie._id} className="flex-shrink-0">
                  <div className="bg-black/50 w-[220px] h-[340px] mt-3 rounded-xl shadow-glow overflow-hidden transform transition-transform duration-300 hover:scale-105">
                    <img
                      src={movie.poster || "https://via.placeholder.com/300x400?text=Poster"}
                      alt={movie.title}
                      className="w-full h-[240px] object-cover bg-black"
                    />
                    <div className="p-3 space-y-1">
                      <h3 className="text-base font-semibold leading-tight line-clamp-2">{movie.title}</h3>
                      <p className="text-sm text-white/80 flex items-center gap-1">
                        <DirectorIcon className="text-accent" /> {movie.director}
                      </p>
                      <p className="text-sm text-white/60 flex items-center gap-1">
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