const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
    name: { type: String },
    symbol: { type: String },
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
    sector: String,
    price: Number,
    volume: Number,
    marketCap: Number,
    signal: { type: String, enum: ['buy', 'sell', 'hold'] }

}, { timestamps: true })

module.exports = mongoose.model("Stocks", stockSchema);