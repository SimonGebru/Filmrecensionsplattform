const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Kolla att token finns och börjar med "Bearer "
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Token är ogiltig" });
    }
  } else {
    return res.status(401).json({ message: "Ingen token – åtkomst nekad" });
  }
};

module.exports = protect;