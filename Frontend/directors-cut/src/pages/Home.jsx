import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from '../assets/image.png';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center justify-center text-center px-6">
      {/* Logo */}
      <div className="relative w-40 md:w-52 mb-8" data-aos="fade-down">
        <div className="absolute inset-0 bg-black/40 rounded-md blur-sm"></div>
        <img
          src={logo}
          alt="Director’s Cut logo"
          className="relative z-10 w-full drop-shadow-glow"
        />
      </div>

     
      <h1
        className="text-5xl md:text-7xl font-cinzel text-accent drop-shadow-glow mb-6"
        data-aos="fade-up"
      >
        Director’s Cut
      </h1>

      
      <p
        className="text-lg md:text-xl max-w-xl mb-8 font-poppins text-white/90"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Upptäck, betygsätt och diskutera dina favoritfilmer – en plattform för riktiga filmälskare.
      </p>

      {/* Knappar */}
      <div className="flex flex-col items-center gap-4 mt-6" data-aos="fade-up">
  
  <div className="flex gap-4 flex-col sm:flex-row">
    <Link to="/register">
      <button className="bg-accent hover:bg-primary text-background px-6 py-3 rounded-full shadow-glow transition duration-300">
        Skapa konto
      </button>
    </Link>
    <Link to="/login">
      <button className="bg-accent hover:bg-primary text-background px-6 py-3 rounded-full shadow-glow transition duration-300">
        Logga in
      </button>
    </Link>
  </div>
  <Link to="/movies">
    <button className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-full shadow-glow transition duration-300 mt-10">
      Utforska filmer
    </button>
  </Link>
</div>
    </div>
  );
}