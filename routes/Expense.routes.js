// routes/Expense.routes.js
const express = require('express');
const Expense = require('../models/Expense.model');
const router = express.Router();

// Get all expenses for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const expenses = await Expense.find({ user: userId }).populate('category account');
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new expense
router.post('/', async (req, res) => {
    const { user, amount, category, description, date, account } = req.body;

    const newExpense = new Expense({
        user,
        amount,
        category,
        description,
        date,
        account
    });

    try {
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an expense
router.put('/:expenseId', async (req, res) => {
    try {
        const { expenseId } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true });
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete an expense
router.delete('/:expenseId', async (req, res) => {
    try {
        const { expenseId } = req.params;
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;