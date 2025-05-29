import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Fyll i alla fält!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5070/api/users/login", {
        email,
        password,
      });

    
      const { token, user } = res.data;
      login(token, user);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("Fel e-post eller lösenord.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background text-white px-6">
      <form
        onSubmit={handleSubmit}
        className="bg-black/40 p-8 rounded-lg shadow-lg w-full max-w-sm space-y-4 border border-white/10"
      >
        <h2 className="text-3xl font-title text-accent text-center">Logga in</h2>
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
          Logga in
        </button>
      </form>
    </div>
  );
}