/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
import { FiArrowLeft } from "react-icons/fi";

export default function AdminCreate() {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [poster, setPoster] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Du har inte behörighet att gå hit.");
      navigate("/");
    }
  }, [token, user, navigate]);

  useEffect(() => {
    const fetchPoster = async () => {
      if (title.length < 3) return;
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=ee4cd9b0`
        );
        if (res.data.Response === "True") {
          setPoster(res.data.Poster);
        } else {
          setPoster(null);
        }
      } catch (err) {
        setPoster(null);
      }
    };
    fetchPoster();
  }, [title]);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title || !director || !genre || !releaseYear) {
      toast.error("Fyll i alla fält");
      return;
    }

    try {
      setFormLoading(true);
      await axios.post(
        "http://localhost:5070/api/movies",
        { title, director, genre, releaseYear },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Film tillagd!");
      navigate("/admin/movies");
    } catch (err) {
      toast.error("Kunde inte lägga till filmen.");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white px-6 py-12">
      <button
        onClick={() => navigate("/admin")}
        className="mb-6 text-white hover:text-accent flex items-center gap-2"
      >
        <FiArrowLeft size={20} /> Tillbaka
      </button>

      <h2 className="text-4xl font-title text-accent text-center mb-8">Lägg till ny film</h2>

      <form
        onSubmit={handleCreate}
        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Titel"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/60"
          />
          <input
            type="text"
            placeholder="Regissör"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/60"
          />
          <input
            type="number"
            placeholder="Utgivningsår"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/60"
          />
          <input
            type="text"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-3 rounded bg-white/10 text-white placeholder-white/60"
          />
          <button
            type="submit"
            disabled={formLoading}
            className="w-full bg-accent text-black py-3 rounded hover:bg-yellow-400 transition"
          >
            {formLoading ? "Laddar..." : "Lägg till film"}
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 rounded">
          <h3 className="text-accent mb-2">Förhandsvisning</h3>
          {poster ? (
            <img
              src={poster}
              alt="Poster"
              className="w-full h-80 object-fit rounded shadow-glow mb-4"
            />
          ) : (
            <div className="w-full h-80 bg-black/40 flex items-center justify-center rounded mb-4">
              <span className="text-white/50">Ingen poster hittad</span>
            </div>
          )}
          <p><strong>{title || "Ingen titel"}</strong></p>
          <p className="text-sm text-white/60">Regissör: {director || "Okänd"}</p>
          <p className="text-sm text-white/60">Genre: {genre || "Okänd"}</p>
          <p className="text-sm text-white/60">Utgivningsår: {releaseYear || "Okänt"}</p>
        </div>
      </form>
    </div>
  );
}