// middleware/jwt.middleware.js
const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1] 
    if (!token) {
      return res.status(401).json({ message: "No token provided" })
    }

    const payload = jwt.verify(token, process.env.TOKEN_SECRET) 
    req.payload = payload; 
    next() 
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = {
  isAuthenticated,
}
