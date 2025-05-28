const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUserRole,
} = require("../controllers/userController");

const protect = require("../middleware/auth");
const admin = require("../middleware/admin");

// POST /register – registrera en ny användare
router.post("/register", registerUser);

// POST /login – logga in användare
router.post("/login", loginUser);

// PATCH /:id/role – uppdatera användarroll (endast admin)
router.patch("/:id/role", protect, admin, updateUserRole);

module.exports = router;
