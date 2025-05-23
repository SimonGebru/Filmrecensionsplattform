const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// POST /register
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "E-postadressen används redan" });
    }

    // Skapa ny användare
    const user = new User({ username, email, password });
    await user.save();

    
    res.status(201).json({
      token: generateToken(user),
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Något gick fel vid registrering" });
  }
};

// POST /login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Fel e-post eller lösenord" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Fel e-post eller lösenord" });
    }

   
    res.status(200).json({
      token: generateToken(user),
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Något gick fel vid inloggning" });
  }
};

module.exports = { registerUser, loginUser };