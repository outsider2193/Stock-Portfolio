const Stock = require("../models/stockModel");
const axios = require("axios")
require("dotenv").config();

const createStock = async (req, res) => {

    try {
        const { name, symbol, company, sector, price, volume, marketCap, signal } = req.body;

        if (!["sell", "buy", "hold"].includes(signal)) {
            res.status(400).json({ message: "invalid input" })
        }
        const stocks = new Stock({
            name,
            symbol,
            company,
            sector,
            price,
            volume,
            marketCap,
            signal
        })
        await stocks.save();
        res.status(201).json({ message: "Stocks created" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getStocksByCompanyId = async (req, res) => {
    const { id } = req.params;

    try {
        const stocksByCompany = await Stock.find({ company: id })
        res.status(200).json({ message: "Stocks fetched", data: stocksByCompany })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
}

const getStocksByApi = async (req, res) => {
    const symbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "NFLX", "META", "NVDA", "BABA", "DIS"];
    const api_key = process.env.API_KEY;
    try {
        const stocks = symbols.map(async (symbol) => {
            const response = await axios.get("https://finnhub.io/api/v1/quote", {
                params: {
                    symbol,
                    token: api_key
                },
            });

            return {
                symbol,
                currentPrice: response.data.c,
                high: response.data.h,
                low: response.data.l,
                previousClose: response.data.pc
            };
        })
        const stockData = await Promise.all(stocks)
        res.status(200).json({ message: "Fetched stocks:", data: stockData })
    } catch (error) {
        console.error("Error fetching stock data:", error.message);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }

}





module.exports = { createStock, getStocksByCompanyId, getStocksByApi }