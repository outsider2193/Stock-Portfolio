const mongoose = require('mongoose');
// const portfolioSchema = require("../models/portfolioModel")

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  contactNumber: String,
  jobType: String,
  annualIncome: Number,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  portfolio: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" }
});

module.exports = mongoose.model('User', userSchema);
