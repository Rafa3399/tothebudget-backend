const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'ExpenseCategory', required: true },
  description: { type: String, default: '' }, // Ensure description is optional
  date: { type: Date, default: Date.now, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', default: null } // Account is optional
});

// Indexing for performance optimization
expenseSchema.index({ user: 1, account: 1 });

const Expense = mongoose.model('Expense', expenseSchema);
module.exports = Expense;
