const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(" Ansluten till MongoDB Atlas");
  } catch (err) {
    console.error("Fel vid anslutning till MongoDB:", err.message);
    process.exit(1); // Avsluta om det blir fel
  }
};

module.exports = connectDB;