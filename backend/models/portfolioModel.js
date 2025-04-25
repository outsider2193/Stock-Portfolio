const mongoose = require("mongoose");
// const stockSchema = require("../models/stockModel")


const portfolioSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stocks" }],
    cash: { type: Number, default: 10000 }
})

module.exports = mongoose.model("Portfolio", portfolioSchema)
