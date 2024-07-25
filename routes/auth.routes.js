const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("./../models/User.model")
const { isAuthenticated } = require("./../middleware/jwt.middleware")

const router = express.Router()
const saltRounds = 10

// POST /auth/signup
router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name } = req.body

    if (email === '' || password === '' || name === '') {
      return res.status(400).json({ message: "Provide email, name, and password" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Provide a valid email address" });
    }

    const foundUser = await User.findOne({ email })
    if (foundUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdUser = await User.create({ email, password: hashedPassword, name })

    const { email: userEmail, name: userName, _id } = createdUser
    const user = { email: userEmail, name: userName, _id }

    res.status(201).json({ user })
  } catch (error) {
    next(error)
  }
});

// POST /auth/login
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (email === '' || password === '') {
      return res.status(400).json({ message: "Provide email and password" })
    }

    const foundUser = await User.findOne({ email })
    if (!foundUser) {
      return res.status(401).json({ message: "User not found" })
    }

    const passwordCorrect = await bcrypt.compare(password, foundUser.password)

    if (passwordCorrect) {
      const { email, name, _id } = foundUser
      const user = { email, name, _id }

      const authToken = jwt.sign(user, process.env.TOKEN_SECRET, { algorithm: 'HS256', expiresIn: "90d" })

      res.status(200).json({ authToken })
    } else {
      res.status(400).json({ message: "Unable to authorize the user" })
    }
  } catch (error) {
    next(error)
  }
});

// GET /auth/verify - Used to verify the JWT stored on the client is valid
router.get("/verify", isAuthenticated, (req, res, next) => {
  res.status(200).json(req.payload)
});

module.exports = router
