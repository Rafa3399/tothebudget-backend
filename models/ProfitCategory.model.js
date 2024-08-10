// models/ProfitCategory.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const profitCategorySchema = new Schema({
  name: { 
    type: String, 
    enum: ['Salary', 'Investment', 'Gift', 'Business', 'Other'], 
    required: true 
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  default: { type: Boolean, default: false }  
});

const ProfitCategory = mongoose.model('ProfitCategory', profitCategorySchema);
module.exports = ProfitCategory;