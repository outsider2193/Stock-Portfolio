const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
    portfolio: { type: mongoose.Schema.Types.ObjectId, ref: "Portfolio" },
    type: {
        type: String,
        enum: ["buy", "sell", "add_cash"],
        required: true
    },
    symbol: { type: String },
    quantity: { type: Number, default: 0 },
    price: { type: Number }, 
    amount: { type: Number, required: true }, 
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
