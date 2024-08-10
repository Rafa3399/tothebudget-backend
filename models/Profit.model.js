// models/Profit.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const profitSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  amount: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'ProfitCategory', required: true }, 
  date: { type: Date, default: Date.now, required: true },  
  account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

const Profit = mongoose.model('Profit', profitSchema);
module.exports = Profit;