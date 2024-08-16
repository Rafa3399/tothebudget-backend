// models/Expense.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: {
    name: { 
      type: String, 
      enum: ['Rent', 'Mortgage', 'Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Travel', 'Other'], 
      required: true 
    },
    default: { type: Boolean, default: false } 
  },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', default: null }
});

const Expense = mongoose.model('Expense', expenseSchema)
module.exports = Expense;
