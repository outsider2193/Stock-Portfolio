const mongoose = require("mongoose");

// const stockSchema = new mongoose.Schema({
//     name: { type: String },
//     symbol: { type: String },
//     company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
//     sector: String,
//     price: Number,
//     volume: Number,
//     marketCap: Number,
//     signal: { type: String, enum: ['buy', 'sell', 'hold'] }

// }, { timestamps: true })

const stockSchema = new mongoose.Schema({
    Symbol: { type: String, required: true, unique: true },
    quantity: { type: Number, default: 0 },
    averagePrice: { type: Number, default: 0 },
    high: { type: Number },
    low: { type: Number },
    signal: {
        type: String,
        enum: ['buy', 'sell', 'hold'],
        default: "hold"
    }
})

module.exports = mongoose.model("Stocks", stockSchema);