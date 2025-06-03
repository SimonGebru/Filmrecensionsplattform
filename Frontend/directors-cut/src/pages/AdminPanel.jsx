import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

export default function AdminPanel() {
  const { token, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || user?.role !== "admin") {
      toast.error("Du har inte behörighet att gå hit.");
      navigate("/");
    }
  }, [token, user, navigate]);

  return (
    <div className="min-h-screen bg-background text-white px-6 py-20 flex flex-col items-center relative">
      {/* Tillbaka-knapp */}
      <button
        onClick={() => navigate("/movies")}
        className="absolute top-6 left-6 text-white hover:text-accent transition"
        title="Gå tillbaka till filmsidan"
      >
        <FiArrowLeft size={28} />
      </button>

      <h2 className="text-4xl font-title text-accent mb-16 text-center">Adminpanel</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-2xl justify-center">
        <button
          onClick={() => navigate("/admin/movies")}
          className="flex-1 bg-primary hover:bg-red-700 text-white py-10 px-8 rounded-2xl shadow-glow text-xl font-semibold transition"
        >
          📃 Se alla filmer
        </button>

        <button
          onClick={() => navigate("/admin/create")}
          className="flex-1 bg-accent hover:bg-yellow-400 text-black py-10 px-8 rounded-2xl shadow-glow text-xl font-semibold transition"
        >
          ➕ Lägg till ny film
        </button>
      </div>
    </div>
  );
}
