const express = require('express');
const ExpenseCategory = require('../models/ExpenseCategory.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/expense-categories
router.get('/expense-categories', isAuthenticated, async (req, res, next) => {
  try {
    const categories = await ExpenseCategory.find({ user: req.payload._id });
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

// POST /api/expense-categories
router.post('/expense-categories', isAuthenticated, async (req, res, next) => {
  try {
    const { name, default: isDefault } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Provide a name for the category' });
    }

    const newCategory = await ExpenseCategory.create({
      name,
      user: req.payload._id,
      default: isDefault || false
    });

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// PUT /api/expense-categories/:categoryId
router.put('/expense-categories/:categoryId', isAuthenticated, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name, default: isDefault } = req.body;

    const updatedCategory = await ExpenseCategory.findByIdAndUpdate(
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

// DELETE /api/expense-categories/:categoryId
router.delete('/expense-categories/:categoryId', isAuthenticated, async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await ExpenseCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;