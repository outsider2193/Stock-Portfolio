const Stock = require("../models/stockModel");
const Portfolio = require("../models/portfolioModel");
const User = require("../models/UserModel");
const Transaction = require("../models/transactionModel");
const axios = require("axios")
require("dotenv").config();


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
};

const searchStockBySymbol = async (req, res) => {
    const { symbol } = req.query;
    const api_key = process.env.API_KEY;

    if (!symbol) {
        return res.status(400).json({ error: "Symbol is required" });
    }

    try {
        const response = await axios.get("https://finnhub.io/api/v1/quote", {
            params: {
                symbol,
                token: api_key
            }
        });

        const stockData = {
            symbol,
            currentPrice: response.data.c,
            high: response.data.h,
            low: response.data.l,
            previousClose: response.data.pc
        };

        res.status(200).json({ message: "Stock fetched successfully", data: stockData });
    } catch (error) {
        console.error("Error fetching stock:", error.message);
        res.status(500).json({ error: "Failed to fetch stock data" });
    }
};

const searchStockSuggestions = async (req, res) => {
    const { query } = req.query;
    const api_key = process.env.API_KEY;
  
    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }
  
    try {
      const response = await axios.get("https://finnhub.io/api/v1/search", {
        params: {
          q: query,
          token: api_key,
        },
      });
  
      const topSuggestions = response.data.result.slice(0, 5).map((item) => item.symbol);
      res.status(200).json({ suggestions: topSuggestions });
      
    } catch (error) {
      console.error("Error fetching suggestions:", error.message);
      res.status(500).json({ error: "Failed to fetch suggestions" });
    }
  };
  


const buyStock = async (req, res) => {
    const { userId } = req.params;
    const { symbol, quantity } = req.body;
    const api_key = process.env.API_KEY;

    if (!symbol || !quantity || quantity <= 0) {
        return res.status(400).json({ message: "Invalid input parameters" });
    }

    try {

        const userPortfolio = await Portfolio.findOne({ userId });
        if (!userPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }


        let stockInDB = await Stock.findOne({ Symbol: symbol });
        if (!stockInDB) {
            return res.status(404).json({ message: "Stock not found. Please add it to your portfolio first." });
        }

        const stockInPortfolio = userPortfolio.stocks.includes(stockInDB._id);
        if (!stockInPortfolio) {
            return res.status(400).json({ message: "Stock not in portfolio. Please add it first." });
        }


        const response = await axios.get("https://finnhub.io/api/v1/quote", {
            params: {
                symbol,
                token: api_key
            },
        });
        const currentPrice = response.data.c;
        const totalCost = currentPrice * quantity;

        if (userPortfolio.cash < totalCost) {
            return res.status(400).json({ message: "Insufficient funds" });
        }
        const previousTotal = stockInDB.quantity * stockInDB.averagePrice;
        const newQuantity = stockInDB.quantity + parseInt(quantity);
        stockInDB.averagePrice = (previousTotal + totalCost) / newQuantity;
        stockInDB.quantity = newQuantity;
        stockInDB.high = Math.max(stockInDB.high || 0, response.data.h);
        stockInDB.low = stockInDB.low ? Math.min(stockInDB.low, response.data.l) : response.data.l;
        await stockInDB.save();


        userPortfolio.cash -= totalCost;
        await userPortfolio.save();

        const updatedPortfolio = await Portfolio.findOne({ userId }).populate("stocks");

        const transactions = new Transaction({
            portfolio: userPortfolio._id,
            type: "buy",
            symbol: stockInDB.Symbol,
            quantity: quantity,
            price: currentPrice,
            amount: totalCost
        })
        await transactions.save();

        res.status(200).json({
            message: "Stock purchased successfully",
            portfolio: updatedPortfolio
        });

    } catch (error) {
        console.error("Error buying stock:", error.message);
        res.status(500).json({ error: "Failed to buy stock" });
    }
};



const sellStock = async (req, res) => {
    const { userId } = req.params;
    const { symbol, quantity } = req.body;
    const api_key = process.env.API_KEY;


    const qty = parseInt(quantity);
    if (!symbol || isNaN(qty) || qty <= 0) {
        return res.status(400).json({ message: "Invalid input parameters" });
    }

    try {

        const userPortfolio = await Portfolio.findOne({ userId });
        if (!userPortfolio) {
            return res.status(404).json({ message: "Portfolio not found" });
        }


        let stockInDB = await Stock.findOne({ Symbol: symbol });
        if (!stockInDB) {
            return res.status(404).json({ message: "Stock not found in system." });
        }


        const stockInPortfolio = userPortfolio.stocks.some(stockId => stockId.equals(stockInDB._id));
        if (!stockInPortfolio) {
            return res.status(400).json({ message: "Stock not in your portfolio" });
        }


        if (stockInDB.quantity < qty) {
            return res.status(400).json({ message: "Not enough stock quantity to sell" });
        }


        const response = await axios.get("https://finnhub.io/api/v1/quote", {
            params: {
                symbol,
                token: api_key
            },
        });
        const currentPrice = response.data.c;

        if (!currentPrice || currentPrice <= 0) {
            return res.status(400).json({ message: "Invalid stock price received from API." });
        }


        const totalSaleValue = currentPrice * qty;

        stockInDB.quantity -= qty;
        await stockInDB.save(); 


        // if (stockInDB.quantity === 0) {

        //     userPortfolio.stocks = userPortfolio.stocks.filter(stockId => !stockId.equals(stockInDB._id));
        //     await stockInDB.deleteOne(); 
        // } else {
        //     await stockInDB.save(); 
        // }


        userPortfolio.cash += totalSaleValue;
        await userPortfolio.save();


        const updatedPortfolio = await Portfolio.findOne({ userId }).populate("stocks");

        const transactions = new Transaction({
            portfolio: userPortfolio._id,
            type: "sell",
            symbol: stockInDB.Symbol,
            quantity: quantity,
            price: currentPrice,
            amount: totalSaleValue
        })
        await transactions.save();


        res.status(200).json({
            message: "Stock sold successfully",
            portfolio: updatedPortfolio
        });

    } catch (error) {
        console.error("Error selling stock:", error.message);
        res.status(500).json({ error: "Failed to sell stock" });
    }
};





module.exports = { getStocksByApi, addStockToPortfolio, buyStock, sellStock, searchStockBySymbol, searchStockSuggestions }