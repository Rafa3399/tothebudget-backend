// routes/Profit.routes.js
const express = require('express');
const Profit = require('../models/Profit.model');
const router = express.Router();

// Get all profits for a user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const profits = await Profit.find({ user: userId }).populate('account');
        res.status(200).json(profits);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new profit
router.post('/', async (req, res) => {
    const { user, amount, source, date, account } = req.body;

    const newProfit = new Profit({
        user,
        amount,
        source,
        date,
        account
    });

    try {
        const savedProfit = await newProfit.save();
        res.status(201).json(savedProfit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a profit
router.put('/:profitId', async (req, res) => {
    try {
        const { profitId } = req.params;
        const updatedProfit = await Profit.findByIdAndUpdate(profitId, req.body, { new: true });
        res.status(200).json(updatedProfit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a profit
router.delete('/:profitId', async (req, res) => {
    try {
        const { profitId } = req.params;
        await Profit.findByIdAndDelete(profitId);
        res.status(200).json({ message: 'Profit deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
