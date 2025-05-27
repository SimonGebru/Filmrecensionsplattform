const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const { getMovieRatings } = require("../controllers/movieController");

const protect = require("../middleware/auth");
const admin = require("../middleware/admin"); 

// Endast admin får skapa/ändra/radera filmer
router.post("/", protect, admin, createMovie);
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);

// Öppna routes
router.get("/", getAllMovies);
router.get("/ratings", getMovieRatings);
router.get("/:id", getMovieById);


module.exports = router;