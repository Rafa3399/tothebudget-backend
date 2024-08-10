const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseCategorySchema = new Schema({
  name: { 
    type: String, 
    enum: ['Rent','Mortgage','Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Travel', 'Other'], 
    required: true 
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  default: { type: Boolean, default: false }  
});

const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);
module.exports = ExpenseCategory;