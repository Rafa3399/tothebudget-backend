const express = require('express');
const ExpenseCategory = require('../models/ExpenseCategory.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/expense-categories
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const categories = await ExpenseCategory.find({
      $or: [
        { user: req.payload._id },
        { default: true }
      ]
    });
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);  // Log any errors that occur
    next(error);
  }
});


module.exports = router;
