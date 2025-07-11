import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../assets/image.png";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen bg-white text-black dark:bg-background dark:text-text flex flex-col items-center justify-center text-center px-6 transition-colors duration-300">
      {/* Logo */}
      <div className="relative w-40 md:w-52 mb-8" data-aos="fade-down">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/40 rounded-md blur-sm"></div>
        <img
          src={logo}
          alt="Director’s Cut logo"
          className="relative z-10 w-full drop-shadow-glow"
        />
      </div>

      {/* Rubrik */}
      <h1
        className="text-5xl md:text-7xl font-cinzel text-accent drop-shadow-glow mb-6"
        data-aos="fade-up"
      >
        Director’s Cut
      </h1>

      {/* Beskrivning */}
      <p
        className="text-lg md:text-xl max-w-xl mb-8 font-poppins text-black/70 dark:text-white/90"
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
          <button className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-full shadow-glow transition duration-300 animate-zoom mt-6">
            Utforska filmer
          </button>
        </Link>
      </div>

      {/* Informationskort */}
      <section
        className="mt-20 grid md:grid-cols-3 gap-6 w-full max-w-6xl px-4"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {/* Kort 1 */}
        <div className="bg-white/90 dark:bg-black/70 border border-accent rounded-xl p-6 shadow-glow hover:scale-105 transition duration-300">
          <h3 className="text-xl font-cinzel text-accent mb-2">Skapa konto</h3>
          <p className="text-black dark:text-white/80 font-poppins">
            Registrera dig snabbt och börja spara dina favoritfilmer och recensioner.
          </p>
        </div>

        {/* Kort 2 */}
        <div className="bg-white/90 dark:bg-black/70 border border-accent rounded-xl p-6 shadow-glow hover:scale-105 transition duration-300">
          <h3 className="text-xl font-cinzel text-accent mb-2">Utforska filmer</h3>
          <p className="text-black dark:text-white/80 font-poppins">
            Bläddra bland filmer, se betyg och upptäck nya guldkorn.
          </p>
        </div>

        {/* Kort 3 */}
        <div className="bg-white/90 dark:bg-black/70 border border-accent rounded-xl p-6 shadow-glow hover:scale-105 transition duration-300">
          <h3 className="text-xl font-cinzel text-accent mb-2">Dela åsikter</h3>
          <p className="text-black dark:text-white/80 font-poppins">
            Skriv recensioner och diskutera med andra filmälskare.
          </p>
        </div>
      </section>
    </div>
  );
}