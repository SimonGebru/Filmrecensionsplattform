const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Koppla till databasen och starta servern
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servern körs på http://localhost:${PORT}`);
  });
});
