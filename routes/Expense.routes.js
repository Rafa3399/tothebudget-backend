// routes/Expense.routes.js
const express = require('express');
const Expense = require('../models/Expense.model');
const ExpenseCategory = require('../models/ExpenseCategory.model');
const Account = require('../models/Account.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/expenses
router.get('/expenses', isAuthenticated, async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.payload._id }).populate('category').populate('account');
    res.status(200).json(expenses);
  } catch (error) {
    next(error);
  }
});

// POST /api/expenses
router.post('/expenses', isAuthenticated, async (req, res, next) => {
  try {
    const { amount, category, description, date, account } = req.body;

    if (!amount || !category) {
      return res.status(400).json({ message: 'Provide amount and category' });
    }

    // Check if the category exists
    const expenseCategory = await ExpenseCategory.findById(category);
    if (!expenseCategory) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // Create the expense
    const newExpense = await Expense.create({
      user: req.payload._id,
      amount,
      category,
      description,
      date,
      account
    });

    // Update the account balance if an account is specified
    if (account) {
      await Account.findByIdAndUpdate(account, { $inc: { balance: -amount } });
    }

    res.status(201).json(newExpense);
  } catch (error) {
    next(error);
  }
});

// PUT /api/expenses/:expenseId
router.put('/expenses/:expenseId', isAuthenticated, async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { amount, category, description, date, account } = req.body;

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, category, description, date, account },
      { new: true }
    ).populate('category').populate('account');

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update the account balance if an account is specified
    if (account) {
      await Account.findByIdAndUpdate(account, { $inc: { balance: -amount } });
    }

    res.status(200).json(updatedExpense);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/expenses/:expenseId
router.delete('/expenses/:expenseId', isAuthenticated, async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByIdAndDelete(expenseId);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Update the account balance if an account is specified
    if (expense.account) {
      await Account.findByIdAndUpdate(expense.account, { $inc: { balance: expense.amount } });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;