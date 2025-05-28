const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const protect = require("../middleware/auth");

//  Skapa en recension
router.post("/", protect, createReview);

//  Hämta alla recensioner
router.get("/", getAllReviews);

//  Hämta en specifik recension
router.get("/:id", getReviewById);

// Uppdatera en recension
router.put("/:id", protect, updateReview);

// Ta bort en recension
router.delete("/:id", protect, deleteReview);

module.exports = router;
