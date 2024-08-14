// routes/ProfitCategory.routes.js
const express = require('express');
const ProfitCategory = require('../models/ProfitCategory.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/profit-categories
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const categories = await ProfitCategory.find({ user: req.payload._id });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
