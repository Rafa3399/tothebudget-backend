const express = require('express');
const Expense = require('../models/Expense.model');
const Account = require('../models/Account.model');
const { isAuthenticated } = require('../middleware/jwt.middleware');

const router = express.Router();

// GET /api/expenses/account/:accountId
router.get('/account/:accountId', isAuthenticated, async (req, res) => {
  try {
    const { accountId } = req.params;
    const expenses = await Expense.find({ account: accountId, user: req.payload._id });
    res.status(200).json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST /api/expenses 
router.post('/', isAuthenticated, async (req, res) => {
  try {
      const { amount, category, description, date, account } = req.body;

      if (!amount || !category.name) {
          return res.status(400).json({ message: 'Provide amount and category' });
      }

      const newExpense = new Expense({
          user: req.payload._id,
          amount,
          category,
          description,
          date,
          account,
      });

      const savedExpense = await newExpense.save();

      // Update the account balance
      await Account.findByIdAndUpdate(account, { $inc: { balance: -amount } });

      res.status(201).json(savedExpense);
  } catch (error) {
      console.error('Error creating expense:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// PUT /api/expenses/:expenseId 
router.put('/:expenseId', isAuthenticated, async (req, res) => {
  try {
      const { expenseId } = req.params;
      const { amount, category, description, date, account } = req.body;

      const existingExpense = await Expense.findById(expenseId);
      if (!existingExpense) {
          return res.status(404).json({ message: 'Expense not found' });
      }

      // Revert the old amount from the account balance
      await Account.findByIdAndUpdate(existingExpense.account, { $inc: { balance: existingExpense.amount } });

      const updatedExpense = await Expense.findByIdAndUpdate(
          expenseId,
          { amount, category, description, date, account },
          { new: true }
      );

      // Apply the new amount to the account balance
      await Account.findByIdAndUpdate(account, { $inc: { balance: -amount } });

      res.status(200).json(updatedExpense);
  } catch (error) {
      console.error('Error updating expense:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE /api/expenses/:expenseId 
router.delete('/:expenseId', isAuthenticated, async (req, res) => {
  try {
      const { expenseId } = req.params;
      const expense = await Expense.findByIdAndDelete(expenseId);

      if (!expense) {
          return res.status(404).json({ message: 'Expense not found' });
      }

      // Restore the deleted amount to the account balance
      await Account.findByIdAndUpdate(expense.account, { $inc: { balance: expense.amount } });

      res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
      console.error('Error deleting expense:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
