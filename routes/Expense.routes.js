// routes/Expense.routes.js
const express = require('express');
const Expense = require('../models/Expense.model');
const Account = require('../models/Account.model');
const { isAuthenticated } = require('../middleware/jwt.middleware')

const router = express.Router();

async function updateAccountBalance(accountId, amountChange) {
  if (accountId) {
    await Account.findByIdAndUpdate(accountId, { $inc: { balance: amountChange } })
  }
}

// GET /api/expenses/account/:accountId
router.get('/account/:accountId', isAuthenticated, async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const expenses = await Expense.find({ account: accountId, user: req.payload._id })
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// GET /api/expenses 
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const expenses = await Expense.find({ user: req.payload._id })
    res.status(200).json(expenses)
  } catch (error) {
    console.error('Error fetching all user expenses:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// POST /api/expenses 
router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { amount, category, description, date, account } = req.body

    if (!amount || !category.name) {
      return res.status(400).json({ message: 'Provide amount and category' })
    }

    const newExpense = await Expense.create({
      user: req.payload._id,
      amount,
      category,
      description,
      date,
      account
    })

    await updateAccountBalance(account, -amount)

    res.status(201).json(newExpense)
  } catch (error) {
    console.error('Error creating expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// PUT /api/expenses/:expenseId 
router.put('/:expenseId', isAuthenticated, async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { amount, category, description, date, account } = req.body

    const existingExpense = await Expense.findById(expenseId);
    if (!existingExpense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    await updateAccountBalance(existingExpense.account, existingExpense.amount)

    await updateAccountBalance(account, -amount)

    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { amount, category, description, date, account },
      { new: true }
    )

    res.status(200).json(updatedExpense)
  } catch (error) {
    console.error('Error updating expense:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

// DELETE /api/expenses/:expenseId 
router.delete('/:expenseId', isAuthenticated, async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findByIdAndDelete(expenseId)

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' })
    }

    await updateAccountBalance(expense.account, expense.amount)

    res.status(200).json({ message: 'Expense deleted successfully' })
  } catch (error) {
    console.error('Error deleting expense:', error); // Detailed error logging
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

module.exports = router;
