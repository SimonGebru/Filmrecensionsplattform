import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast'; 

import Home from './pages/Home';
import Movies from './pages/Movies'; 
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import AdminCreate from "./components/AdminCreate";     // ✅ Uppdaterad path
import AdminMovies from "./components/AdminMovies";     // ✅ Uppdaterad path
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-background dark:text-text transition-colors duration-300">
      {/* Dark Mode Toggle-knapp */}
      <DarkModeToggle />

      {/* Toast-notiser */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px',
          },
        }}
      />

      {/* Sidor */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} /> 
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/create" element={<AdminCreate />} />
        <Route path="/admin/movies" element={<AdminMovies />} />
      </Routes>
    </div>
  );
}

export default App;
