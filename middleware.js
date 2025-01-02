const jwt = require("jsonwebtoken");
const process = require("process");

// Authentication middleware
const protection = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send("No or invalid token provided.");
    }

    const token = authHeader.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT);
    console.log(req.user); // Decode the token
    next();
  } catch (error) {
    console.error("Token verification error:", error.message); // Log error details
    return res.status(403).send("Failed to authenticate token.");
  }
};

module.exports = { protection };
