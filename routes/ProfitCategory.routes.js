// routes/ProfitCategory.routes.js
const express = require('express');
const ProfitCategory = require('../models/ProfitCategory.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/profit-categories
router.get('/profit-categories', isAuthenticated, async (req, res, next) => {
  try {
    const categories = await ProfitCategory.find({ user: req.payload._id });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// POST /api/profit-categories
router.post('/profit-categories', isAuthenticated, async (req, res, next) => {
  try {
    const { name, default: isDefault } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Provide a name for the category' });
    }

    const newCategory = await ProfitCategory.create({
      name,
      user: req.payload._id,
      default: isDefault || false
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// PUT /api/profit-categories/:categoryId
router.put('/profit-categories/:categoryId', isAuthenticated, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, default: isDefault } = req.body;

    const updatedCategory = await ProfitCategory.findByIdAndUpdate(
      categoryId,
      { name, default: isDefault },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/profit-categories/:categoryId
router.delete('/profit-categories/:categoryId', isAuthenticated, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await ProfitCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
