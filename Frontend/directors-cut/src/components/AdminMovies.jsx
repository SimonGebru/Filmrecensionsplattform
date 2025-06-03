/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

export default function AdminMovies() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Du har inte behörighet att gå hit.");
      navigate("/");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5070/api/movies");
        setMovies(res.data);
      } catch (err) {
        toast.error("Kunde inte hämta filmer.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const deletedMovie = movies.find((m) => m._id === id);
    try {
      await axios.delete(`http://localhost:5070/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Tog bort: ${deletedMovie.title}`);
      setMovies((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      toast.error("Kunde inte radera filmen.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white">
        <p className="text-accent">Laddar filmer...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white px-6 py-12 relative">
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-6 left-6 text-white hover:text-accent transition"
        title="Tillbaka till adminpanel"
      >
        <FiArrowLeft size={24} />
      </button>

      <h2 className="text-4xl font-title text-accent text-center mb-10">Alla filmer</h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white/10 p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-white/60">
                {movie.director} – {movie.releaseYear}
              </p>
            </div>
            <button
              onClick={() => handleDelete(movie._id)}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
            >
              Radera
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}