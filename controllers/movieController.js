const Movie = require("../models/Movie");

//  POST /api/movies – Lägg till en ny film
const createMovie = async (req, res) => {
  const { title, director, releaseYear, genre } = req.body;

  try {
    const movie = new Movie({
      title,
      director,
      releaseYear,
      genre,
    });

    await movie.save();

    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte skapa filmen" });
  }
};

// GET /api/movies – Hämta alla filmer
const getAllMovies = async (req, res) => {
    try {
      const movies = await Movie.find(); // Hämtar alla filmer från databasen
      res.json(movies); // Skickar tillbaka som JSON
    } catch (err) {
      res.status(500).json({ message: "Kunde inte hämta filmer" });
    }
  };

  // GET /api/movies/:id – Hämta en specifik film
const getMovieById = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id); // Hämtar film med ID från URL
      if (!movie) {
        return res.status(404).json({ message: "Filmen hittades inte" });
      }
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: "Fel vid hämtning av film" });
    }
  };

  // PUT /api/movies/:id – Uppdatera en film
const updateMovie = async (req, res) => {
    const { title, director, releaseYear, genre } = req.body;
  
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: "Filmen hittades inte" });
      }
  
      // Uppdatera fälten om de skickas med
      movie.title = title || movie.title;
      movie.director = director || movie.director;
      movie.releaseYear = releaseYear || movie.releaseYear;
      movie.genre = genre || movie.genre;
  
      await movie.save();
  
      res.json(movie);
    } catch (err) {
      res.status(500).json({ message: "Kunde inte uppdatera film" });
    }
  };

  // DELETE /api/movies/:id – Ta bort en film
const deleteMovie = async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res.status(404).json({ message: "Filmen hittades inte" });
      }
  
      await movie.deleteOne(); // Radera filmen
  
      res.json({ message: "Filmen har raderats" });
    } catch (err) {
      res.status(500).json({ message: "Kunde inte ta bort film" });
    }
  };

  module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
  };