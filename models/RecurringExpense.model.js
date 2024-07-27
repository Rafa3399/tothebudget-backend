// models/RecurringExpense.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recurringExpenseSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }, 
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true }
});

const RecurringExpense = mongoose.model('RecurringExpense', recurringExpenseSchema);
module.exports = RecurringExpense;