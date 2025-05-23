const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

//POST /register – registrera en ny användare
router.post("/register", registerUser);

//POST /login – logga in användare
router.post("/login", loginUser);

module.exports = router;