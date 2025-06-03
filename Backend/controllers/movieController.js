const Movie = require("../models/Movie");
const Review = require("../models/Review");

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

  const getMovieRatings = async (req, res) => {
    try {
      const result = await Review.aggregate([
        {
          $group: {
            _id: "$movieId",
            avgRating: { $avg: "$rating" },
            reviewCount: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "movies",
            localField: "_id",
            foreignField: "_id",
            as: "movieData",
          },
        },
        {
          $unwind: "$movieData",
        },
        {
          $project: {
            _id: "$movieData._id",
            title: "$movieData.title",
            director: "$movieData.director",
            releaseYear: "$movieData.releaseYear",
            genre: "$movieData.genre",
            avgRating: { $round: ["$avgRating", 2] },
            reviewCount: 1,
          },
        },
        {
          $sort: { avgRating: -1 },
        },
      ]);
  
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Kunde inte hämta betyg", error: err.message });
    }
  };

  // För att vi in all innehåll smidigare för det visuella i min frontend
  const createManyMovies = async (req, res) => {
    const movies = req.body;
  
    if (!Array.isArray(movies)) {
      return res.status(400).json({ message: "Förväntade en array av filmer" });
    }
  
    try {
      const createdMovies = await Movie.insertMany(movies);
      res.status(201).json(createdMovies);
    } catch (err) {
      res.status(500).json({ message: "Kunde inte skapa filmer", error: err.message });
    }
  };

  module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie,
    getMovieRatings,
    createManyMovies,
  };