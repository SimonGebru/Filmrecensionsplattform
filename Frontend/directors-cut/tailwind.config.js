import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0e10',     // Mörk biosal
        text: '#f9f9f9',            // Filmduk-vit
        accent: '#FFD700',         // Guld
        primary: '#E50914',        // Netflix-röd
      },
      fontFamily: {
        sans: ["'Poppins'", ...fontFamily.sans],
        title: ["'Cinzel'", "serif"],
      },
      boxShadow: {
        glow: '0 0 15px rgba(255, 215, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
