import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratingInfo, setRatingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [reviewer, setReviewer] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchRating = async () => {
    try {
      const res = await axios.get("http://localhost:5070/api/movies/ratings");
      const found = res.data.find((r) => r._id === id);
      if (found) {
        setRatingInfo(found);
      }
    } catch (err) {
      console.error("Kunde inte hämta betyg", err);
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`http://localhost:5070/api/movies/${id}`);
        const omdb = await axios.get(`https://www.omdbapi.com/?t=${encodeURIComponent(res.data.title)}&apikey=ee4cd9b0`);
        const poster = omdb.data?.Poster !== "N/A" ? omdb.data.Poster : null;
        setMovie({ ...res.data, poster });
      } catch (err) {
        console.error("Kunde inte hämta filmen", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5070/api/movies/${id}/reviews`);
        setReviews(res.data);
      } catch (err) {
        console.error("Kunde inte hämta recensioner", err);
      }
    };

    fetchMovie();
    fetchReviews();
    fetchRating();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewer || !comment || rating === 0) {
      toast.error("Fyll i alla fält!");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post("http://localhost:5070/api/reviews", {
        movieId: id,
        reviewer,
        rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReviews([...reviews, res.data]);
      fetchRating(); 
      setReviewer("");
      setRating(0);
      setComment("");
      toast.success("Recensionen skickad!");
    } catch (err) {
      toast.error("Kunde inte skicka recension.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-accent">
        Laddar film...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Filmen kunde inte hittas.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-12 bg-background text-white">
      <button
        onClick={() => navigate("/movies")}
        className="mb-6 text-accent underline hover:text-yellow-500"
      >
        ← Tillbaka till filmer
      </button>

      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-10">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full md:w-[300px] rounded-lg shadow-glow object-cover"
        />
        <div>
          <h1 className="text-4xl font-title text-accent mb-2">{movie.title}</h1>
          <p className="text-white/80 mb-1"><strong>Regissör:</strong> {movie.director}</p>
          <p className="text-white/60 mb-1"><strong>År:</strong> {movie.releaseYear}</p>
          <p className="text-white/60"><strong>Genre:</strong> {movie.genre}</p>

          {/* ⭐ Genomsnittligt betyg */}
          {ratingInfo && (
            <div className="mt-4 flex items-center gap-2 text-yellow-400 text-lg">
              <FaStar className="text-xl" />
              {ratingInfo.avgRating} ({ratingInfo.reviewCount} recensioner)
            </div>
          )}
        </div>
      </div>

      {/* Recensioner */}
      <div className="mt-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-accent mb-4">Recensioner</h2>
        {reviews.length === 0 ? (
          <p className="text-white/60">Det finns inga recensioner ännu.</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((review) => (
              <li
                key={review._id}
                className="bg-black/40 p-4 rounded-lg shadow-md border border-white/10"
              >
                <div className="text-white/90 font-medium">{review.reviewer}</div>
                <div className="text-yellow-400 flex gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <p className="text-white/80 mt-2">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Recensionsformulär */}
      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-4xl mx-auto bg-black/30 p-6 rounded-lg border border-white/10 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-accent mb-2">Lämna en recension</h2>
        <input
          type="text"
          placeholder="Ditt namn"
          value={reviewer}
          onChange={(e) => setReviewer(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <FaStar
              key={value}
              onClick={() => setRating(value)}
              className={`cursor-pointer text-2xl ${
                value <= rating ? "text-yellow-400" : "text-gray-500"
              }`}
            />
          ))}
        </div>

        <textarea
          placeholder="Din kommentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />
        <button
          type="submit"
          className="bg-accent text-black px-4 py-2 rounded hover:bg-yellow-400 transition"
        >
          Skicka recension
        </button>
      </form>
    </div>
  );
}