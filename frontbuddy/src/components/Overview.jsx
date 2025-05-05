import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Grid, CircularProgress } from "@mui/material";
import axios from "../api/axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { jwtDecode } from "jwt-decode";

const Overview = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [portfolio, setPortfolio] = useState(null); // Portfolio will now be an object, not an array
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`/portfolio/fetchportfolio/${userId}`);
        console.log("Portfolio Response Data:", res.data); // Log the full response
  
        // Access the nested 'data' property from the response
        const portfolioData = res.data.data; // Access 'data' directly here
        if (portfolioData && Array.isArray(portfolioData.stocks)) {
          setPortfolio(portfolioData); // Set portfolio data if stocks is an array
          generateChartData(portfolioData.stocks); // Generate chart data from stocks
        } else {
          console.error("Stocks data is not an array", portfolioData.stocks);
          setPortfolio({ stocks: [] }); // Handle case where stocks data is missing or not an array
        }
      } catch (err) {
        console.error("Error fetching portfolio", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPortfolio();
  }, [userId]);
  
  
  const generateChartData = (stocks) => {
    if (Array.isArray(stocks)) {
      const chartPoints = stocks.map(stock => ({
        name: stock.symbol,
        value: stock.currentPrice * stock.quantity,
      }));
      setChartData(chartPoints);
    } else {
      console.error("Stocks is not an array", stocks);
    }
  };

  if (loading) {
    return <Box sx={{ p: 4 }}><CircularProgress /></Box>;
  }

  // Calculate total current value and total investment using the stocks array
  const totalCurrentValue = Array.isArray(portfolio.stocks) && portfolio.stocks.length > 0
    ? portfolio.stocks.reduce(
        (acc, stock) => acc + stock.currentPrice * stock.quantity,
        0
      )
    : 0;

  const totalInvestment = Array.isArray(portfolio.stocks) && portfolio.stocks.length > 0
    ? portfolio.stocks.reduce(
        (acc, stock) => acc + stock.buyPrice * stock.quantity,
        0
      )
    : 0;

  const gain = totalCurrentValue - totalInvestment;
  const portfolioScore = totalInvestment > 0
    ? ((gain / totalInvestment) * 100).toFixed(2)
    : 0;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Portfolio Score</Typography>
            <Typography variant="h4" color="primary">
              {portfolioScore}%
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Active Portfolios</Typography>
            <Typography variant="h4">{portfolio.stocks.length}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Total Value</Typography>
            <Typography variant="h4">${totalCurrentValue.toFixed(2)}</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Performance Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#1976d2" />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Overview;
