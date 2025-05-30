const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMovieRatings,
  createManyMovies,
} = require("../controllers/movieController");

const { getReviewsForMovie } = require("../controllers/reviewController");

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

// Endast admin får skapa/ändra/radera filmer
router.post("/", protect, admin, createMovie);
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);
router.post("/bulk", protect, admin, createManyMovies);

// Öppna routes
router.get("/", getAllMovies);
router.get("/ratings", getMovieRatings);

router.get("/:id/reviews", getReviewsForMovie);

router.get("/:id", getMovieById);

module.exports = router;
