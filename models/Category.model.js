const mongoose = require('mongoose');
const { Schema } = mongoose;

const categoryOptions = [
    'Food',
    'Transportation',
    'Housing',
    'Utilities',
    'Entertainment',
    'Healthcare',
    'Insurance',
    'Savings',
    'Investments',
    'Debt Payments',
    'Personal Care',
    'Education',
    'Miscellaneous'
];

const categorySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, enum: categoryOptions, required: true },  
    description: { type: String }
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;