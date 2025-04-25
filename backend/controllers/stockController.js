const Stock = require("../models/stockModel");
const Portfolio = require("../models/portfolioModel");
const User = require("../models/UserModel");
const axios = require("axios")
require("dotenv").config();

// const createStock = async (req, res) => {

//     try {
//         const { name, symbol, company, sector, price, volume, marketCap, signal } = req.body;

//         if (!["sell", "buy", "hold"].includes(signal)) {
//             res.status(400).json({ message: "invalid input" })
//         }
//         const stocks = new Stock({
//             name,
//             symbol,
//             company,
//             sector,
//             price,
//             volume,
//             marketCap,
//             signal
//         })
//         await stocks.save();
//         res.status(201).json({ message: "Stocks created" })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

// const getStocksByCompanyId = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const stocksByCompany = await Stock.find({ company: id })
//         res.status(200).json({ message: "Stocks fetched", data: stocksByCompany })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" })
//     }
// }

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

const addStockToPortfolio = async (req, res) => {
    const { userId } = req.params;
    const { symbol } = req.body;
    const api_key = process.env.API_KEY;

    try {
        const userPortfolio = await Portfolio.findOne({ userId });
        if (!userPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }

        let existingStock = await Stock.findOne({ Symbol: symbol });
        if (!existingStock) {
            const response = await axios.get("https://finnhub.io/api/v1/quote", {
                params: {
                    symbol,
                    token: api_key
                },
            });

            existingStock = new Stock({
                Symbol: symbol,
                quantity: 0,
                averagePrice: response.data.c, // Current price as reference
                high: response.data.h,
                low: response.data.l,
                signal: "hold"
            });
            await existingStock.save();

        }
            const stockExists = userPortfolio.stocks.includes(existingStock._id);
            if (stockExists) {
                return res.status(400).json({ message: "Stock already in portfolio" });
            }

            userPortfolio.stocks.push(existingStock._id);
            await userPortfolio.save()

            const updatedPortfolio = await Portfolio.findOne({ userId }).populate("stocks");

            res.status(200).json({ message: "Stock added", data: updatedPortfolio });


    } catch (error) {
        console.error("Error adding stock to portfolio:", error.message);
        res.status(500).json({ error: "Failed to add stock to portfolio" });
    }
}


const buyStocks = async (req, res) => {
    const { id } = req.params;
    const { symbol, quantity } = req.body;
    const api_key = process.env.API_KEY;

    if (!symbol || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input parameters" });
    }
    try {
        const userPortfolio = await Portfolio.findOne({ id }).populate("stocks")
        if (!userPortfolio) {
            return res.status(400).json({ message: "user Portfolio not found" });
        }

        const response = await axios.get("https://finnhub.io/api/v1/quote", {
            params: {
                symbol,
                token: api_key
            },
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to buy stock " });
    }
}










module.exports = { getStocksByApi, addStockToPortfolio }