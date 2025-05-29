import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0e10',
        text: '#f9f9f9',
        accent: '#FFD700',
        primary: '#E50914',
      },
      fontFamily: {
        sans: ["'Poppins'", ...defaultTheme.fontFamily.sans],
        cinzel: ["'Cinzel'", "serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      boxShadow: {
        glow: '0 0 15px rgba(255, 215, 0, 0.6)',
      },
      animation: {
        zoom: 'zoomInOut 3s ease-in-out infinite',
      },
      keyframes: {
        zoomInOut: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    plugin, 
  ],
}