const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
    name: { type: String },
    sector: { type: String },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },
    stockPrice: { type: Number },
    marketCap: { type: Number },
    yearlyGrowth: { type: Number }
}, { timestamps: true })

module.exports = mongoose.model("Company", companySchema)