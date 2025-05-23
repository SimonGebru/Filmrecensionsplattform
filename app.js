const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);

module.exports = app;