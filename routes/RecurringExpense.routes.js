// routes/RecurringExpense.routes.js
const express = require('express');
const RecurringExpense = require('../models/RecurringExpense.model');
const router = express.Router();

// Get all recurring expenses for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const recurringExpenses = await RecurringExpense.find({ user: userId }).populate('category');
        res.status(200).json(recurringExpenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new recurring expense
router.post('/', async (req, res) => {
    const { user, amount, category, description, startDate, endDate, frequency } = req.body;

    const newRecurringExpense = new RecurringExpense({
        user,
        amount,
        category,
        description,
        startDate,
        endDate,
        frequency
    });

    try {
        const savedRecurringExpense = await newRecurringExpense.save();
        res.status(201).json(savedRecurringExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a recurring expense
router.put('/:recurringExpenseId', async (req, res) => {
    try {
        const { recurringExpenseId } = req.params;
        const updatedRecurringExpense = await RecurringExpense.findByIdAndUpdate(recurringExpenseId, req.body, { new: true });
        res.status(200).json(updatedRecurringExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a recurring expense
router.delete('/:recurringExpenseId', async (req, res) => {
    try {
        const { recurringExpenseId } = req.params;
        await RecurringExpense.findByIdAndDelete(recurringExpenseId);
        res.status(200).json({ message: 'Recurring expense deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;