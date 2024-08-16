// routes/Profit.routes.js
const express = require('express');
const Profit = require('../models/Profit.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router()

// GET /api/profits/account/:accountId 
router.get('/account/:accountId', isAuthenticated, async (req, res, next) => {
  try {
    const { accountId } = req.params
    const profits = await Profit.find({ account: accountId, user: req.payload._id })
      .populate('category')
      .populate('account')
    res.status(200).json(profits)
  } catch (error) {
    console.error('Error fetching profits:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// POST /api/profits 
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { amount, category, description, date, account } = req.body

    if (!amount || !category) {
      return res.status(400).json({ message: 'Provide amount and category' })
    }

    const newProfit = new Profit({
      user: req.payload._id,
      amount,
      category,
      description, 
      date,
      account,
    })

    const savedProfit = await newProfit.save()
    res.status(201).json(savedProfit)
  } catch (error) {
    console.error('Error creating profit:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// PUT /api/profits/:profitId 
router.put('/:profitId', isAuthenticated, async (req, res, next) => {
  try {
    const { profitId } = req.params;
    const { amount, category, description, date, account } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: 'Provide amount and category' })
    }

    const updatedProfit = await Profit.findByIdAndUpdate(
      profitId,
      { amount, category, description, date, account }, 
      { new: true }
    )

    if (!updatedProfit) {
      return res.status(404).json({ message: 'Profit not found' })
    }

    res.status(200).json(updatedProfit)
  } catch (error) {
    console.error('Error updating profit:', error.message)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// DELETE /api/profits/:profitId 
router.delete('/:profitId', isAuthenticated, async (req, res, next) => {
  try {
    const { profitId } = req.params;
    const deletedProfit = await Profit.findByIdAndDelete(profitId)

    if (!deletedProfit) {
      return res.status(404).json({ message: 'Profit not found' })
    }

    res.status(200).json({ message: 'Profit deleted successfully' })
  } catch (error) {
    console.error('Error deleting profit:', error.message);
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router;
