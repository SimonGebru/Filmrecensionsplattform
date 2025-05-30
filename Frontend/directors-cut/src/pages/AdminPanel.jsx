/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { FiArrowLeft } from "react-icons/fi";

export default function AdminPanel() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  // Skydd: Endast admin får vara här
  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Du har inte behörighet att gå hit.");
      navigate("/");
    }
  }, [token, user, navigate]);

  // Hämta filmer
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:5070/api/movies");
        setMovies(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        toast.error("Kunde inte hämta filmer.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (id) => {
    const deletedMovie = movies.find((movie) => movie._id === id);

    try {
      await axios.delete(`http://localhost:5070/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Du tog bort filmen: ${deletedMovie?.title}`);
      setMovies((prev) => prev.filter((movie) => movie._id !== id));
    } catch (err) {
      toast.error("Kunde inte radera filmen.");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !director || !genre || !releaseYear) {
      toast.error("Fyll i alla fält");
      return;
    }

    try {
      setFormLoading(true);
      const res = await axios.post(
        "http://localhost:5070/api/movies",
        { title, director, genre, releaseYear },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMovies((prev) => [...prev, res.data]);
      toast.success("Film tillagd!");
      setTitle("");
      setDirector("");
      setGenre("");
      setReleaseYear("");
    } catch (err) {
      toast.error("Kunde inte lägga till filmen.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-background text-white">
        <RotatingLines
          strokeColor="#facc15"
          strokeWidth="4"
          animationDuration="0.75"
          width="64"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white px-6 py-12 relative">
      {/* Tillbaka-knapp */}
      <button
        onClick={() => navigate("/movies")}
        className="absolute top-6 left-6 text-white hover:text-accent transition"
        title="Gå tillbaka till filmsidan"
      >
        <FiArrowLeft size={24} />
      </button>

      <h2 className="text-4xl font-title text-accent text-center mb-10">Adminpanel</h2>

      {/* Lägg till film-formulär */}
      <form
        onSubmit={handleCreate}
        className="bg-white/5 p-6 rounded-lg mb-10 max-w-3xl mx-auto shadow space-y-4 border border-white/10"
      >
        <h3 className="text-xl font-semibold text-accent text-center">Lägg till ny film</h3>
        <input
          type="text"
          placeholder="Titel"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Regissör"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />
        <input
          type="number"
          placeholder="Utgivningsår"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />
        <button
          type="submit"
          disabled={formLoading}
          className="w-full bg-accent text-black py-2 rounded hover:bg-yellow-400 transition flex justify-center items-center"
        >
          {formLoading ? (
            <RotatingLines
              strokeColor="black"
              strokeWidth="3"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            "Skapa film"
          )}
        </button>
      </form>

      {/* Lista filmer */}
      <div className="space-y-4 max-w-3xl mx-auto">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white/10 p-4 rounded flex justify-between items-center">
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
