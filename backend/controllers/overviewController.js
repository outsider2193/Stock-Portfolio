const Portfolio = require('../models/portfolioModel');
const Stock = require('../models/stockModel');
const axios = require("axios"); // to make the API call to get the current price from Finnhub API

const getPortfolioOverview = async (req, res) => {
  const { userId } = req.params;
  const api_key = process.env.API_KEY; // API key for Finnhub API

  try {
    const userPortfolio = await Portfolio.findOne({ userId }).populate('stocks.Stock').exec();
    console.log("User Portfolio:", userPortfolio);  // Log user portfolio to check its structure

    if (!userPortfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Initialize variables for the overview
    let activeHoldings = 0;
    let totalPortfolioValue = 0;
    let chartData = [];

    // Loop through stocks in the portfolio
    for (const stockItem of userPortfolio.stocks) {
      const { stock, quantity, avgBuyPrice } = stockItem;

      // Check if stock and symbol are available
      if (!Stock || !Stock.Symbol) {
        console.error("Stock data is missing for ", stockItem);
        continue; // Skip this stock if no valid data
      }

      if (quantity > 0) {
        activeHoldings += 1;

        // Fetch the current price of the stock using Finnhub API
        const response = await axios.get('https://finnhub.io/api/v1/quote', {
          params: {
            symbol: Stock.Symbol, // Use 'Symbol' instead of 'symbol'
            token: api_key,
          },
        });

        const currentPrice = response.data.c; // Get the current price from the API

        // Check if current price is valid
        if (!currentPrice) {
          console.error(`No current price found for ${Stock.Symbol}`);
          continue;
        }

        // Calculate cost and current value
        const costValue = quantity * (avgBuyPrice || 0); // Fallback if avgBuyPrice is undefined
        const currentValue = quantity * (currentPrice || 0); // Fallback if currentPrice is undefined

        totalPortfolioValue += currentValue;

        // Add stock data to chartData
        chartData.push({
          symbol: Stock.Symbol, // Use 'Symbol' instead of 'symbol'
          costValue: costValue,
          currentValue: currentValue,
        });
      }
    }

    // Portfolio score calculation
    const portfolioScore = totalPortfolioValue > 0 ? Math.round((totalPortfolioValue / activeHoldings) * 100) : 0;

    // Return the aggregated data
    res.status(200).json({
      portfolioScore,
      activeHoldings,
      totalPortfolioValue,
      chartData,
    });

  } catch (error) {
    console.error("Error in getPortfolioOverview:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { getPortfolioOverview };
