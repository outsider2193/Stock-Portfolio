const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  contactNumber: String,
  jobType: String,
  annualIncome: Number
});

module.exports = mongoose.model('User', userSchema);
