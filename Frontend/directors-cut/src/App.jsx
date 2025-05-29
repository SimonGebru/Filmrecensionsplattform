import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Toaster } from 'react-hot-toast'; 

import Home from './pages/Home';
import Movies from './pages/Movies'; 
import MovieDetails from "./pages/MovieDetails";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <>
      
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

    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} /> 
        <Route path="/movies/:id" element={<MovieDetails />} />
      </Routes>
    </>
  );
}

export default App;
