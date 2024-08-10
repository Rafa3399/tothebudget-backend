// models/Expense.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'ExpenseCategory', required: true },
  description: { type: String },
  date: { type: Date, default: Date.now, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;