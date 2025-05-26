const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const movieRoutes = require("./routes/movieRoutes");

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/movies", movieRoutes);

module.exports = app;