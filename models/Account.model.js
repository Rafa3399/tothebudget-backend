// models/Account.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;