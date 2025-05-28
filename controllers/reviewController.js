const Review = require("../models/Review");

// POST /api/reviews
const createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;

  try {
    const review = new Review({
      movieId,
      userId: req.user.id,
      rating,
      comment,
    });

    await review.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte skapa recension" });
  }
};

// GET /api/reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userId", "username")
      .populate("movieId", "title");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte hämta recensioner" });
  }
};

// GET /api/reviews/:id
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("userId", "username")
      .populate("movieId", "title");

    if (!review) return res.status(404).json({ message: "Recension hittades inte" });

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Fel vid hämtning av recension" });
  }
};

// GET /api/movies/:id/reviews
const getReviewsForMovie = async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id })
      .populate("userId", "username")
      .populate("movieId", "title");

    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte hämta recensioner för filmen" });
  }
};

// PUT /api/reviews/:id
const updateReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Recension hittades inte" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Inte tillåtet att ändra denna recension" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res.status(500).json({ message: "Kunde inte uppdatera recension" });
  }
};

// DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Recension hittades inte" });

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Inte tillåtet att radera denna recension" });
    }

    await review.deleteOne();

    res.json({ message: "Recension borttagen" });
  } catch (err) {
    res.status(500).json({ message: "Kunde inte radera recension" });
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsForMovie, 
  updateReview,
  deleteReview,
};