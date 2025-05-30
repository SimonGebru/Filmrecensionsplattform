import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [username, setUsername] = useState(""); // <-- nytt
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      toast.error("Fyll i alla fält!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5070/api/users/register", {
        username, // <-- nytt
        email,
        password,
      });

      login(res.data.token); // loggar in direkt efter registrering
      toast.success("Registrering lyckades!");
      navigate("/movies");
    } catch (err) {
      toast.error("Kunde inte registrera dig.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4 border border-white/10"
      >
        <h2 className="text-3xl font-title text-accent text-center">Skapa konto</h2>

        <input
          type="text"
          placeholder="Användarnamn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />

        <input
          type="email"
          placeholder="E-post"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />

        <input
          type="password"
          placeholder="Lösenord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-white/10 text-white placeholder-white/60"
        />

        <button
          type="submit"
          className="w-full bg-accent text-black py-2 rounded hover:bg-yellow-400 transition"
        >
          Skapa konto
        </button>
      </form>
    </div>
  );
}