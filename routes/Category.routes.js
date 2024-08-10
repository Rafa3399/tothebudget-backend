const express = require('express');
const router = express.Router();
const Category = require('../models/Category.model');

// Get all categories for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const categories = await Category.find({ user: userId });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new category
router.post('/', async (req, res) => {
    const { user, name, description } = req.body;

    const newCategory = new Category({
        user,
        name,
        description
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a category
router.put('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a category
router.delete('/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;