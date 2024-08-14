const express = require('express');
const Profit = require('../models/Profit.model');
const ProfitCategory = require('../models/ProfitCategory.model');
const Account = require('../models/Account.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/profit
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const profits = await Profit.find({ user: req.payload._id }).populate('category').populate('account');
    res.status(200).json(profits);
  } catch (error) {
    next(error);
  }
});

// GET /api/profits/account/:accountId
router.get('/account/:accountId', isAuthenticated, async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const profits = await Profit.find({ account: accountId, user: req.payload._id })
      .populate('category')
      .populate('account');
    res.status(200).json(profits);
  } catch (error) {
    console.error('Error fetching profits:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /api/profit
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { amount, category, date, account } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: 'Provide amount and category' });
    }

    // Check if the category exists
    const profitCategory = await ProfitCategory.findById(category);
    if (!profitCategory) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Create the profit
    const newProfit = await Profit.create({
      user: req.payload._id,
      amount,
      category,
      date,
      account
    });

    // Update the account balance if an account is specified
    if (account) {
      await Account.findByIdAndUpdate(account, { $inc: { balance: amount } });
    }

    res.status(201).json(newProfit);
  } catch (error) {
    next(error);
  }
});

// PUT /api/profit/:profitId
router.put('/:profitId', isAuthenticated, async (req, res, next) => {
  try {
    const { profitId } = req.params;
    const { amount, category, date, account } = req.body;

    const updatedProfit = await Profit.findByIdAndUpdate(
      profitId,
      { amount, category, date, account },
      { new: true }
    ).populate('category').populate('account');

    if (!updatedProfit) {
      return res.status(404).json({ message: 'Profit not found' });
    }

    // Update the account balance if an account is specified
    if (account) {
      await Account.findByIdAndUpdate(account, { $inc: { balance: amount } });
    }

    res.status(200).json(updatedProfit);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/profit/:profitId
router.delete('/:profitId', isAuthenticated, async (req, res, next) => {
  try {
    const { profitId } = req.params;
    const profit = await Profit.findByIdAndDelete(profitId);

    if (!profit) {
      return res.status(404).json({ message: 'Profit not found' });
    }

    // Update the account balance if an account is specified
    if (profit.account) {
      await Account.findByIdAndUpdate(profit.account, { $inc: { balance: -profit.amount } });
    }

    res.status(200).json({ message: 'Profit deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
