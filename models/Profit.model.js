// models/Profit.model.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const profitSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  category: {
    name: { 
      type: String, 
      enum: ['Salary', 'Investment', 'Gift', 'Business', 'Other'], 
      required: true 
    },
    default: { type: Boolean, default: false }
  },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now, required: true },
  account: { type: Schema.Types.ObjectId, ref: 'Account', default: null }
});

const Profit = mongoose.model('Profit', profitSchema);
module.exports = Profit;
