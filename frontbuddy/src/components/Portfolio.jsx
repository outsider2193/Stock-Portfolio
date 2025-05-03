import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios"; // your custom axios with token interceptor
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Divider,
} from "@mui/material";

const Portfolio = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [portfolio, setPortfolio] = useState(null);
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [action, setAction] = useState("buy");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const fetchPortfolio = async () => {
    try {
      const res = await axios.get(`/portfolio/fetchportfolio/${userId}`);
      setPortfolio(res.data.data);
    } catch (err) {
      setPortfolio(null);
    }
  };

  const createPortfolio = async () => {
    try {
      const res = await axios.post(`/portfolio/create/${userId}`);
      setPortfolio(res.data.data);
      setMessage("Portfolio created!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Portfolio already exists");
    }
  };

  const handleTransaction = async () => {
    setLoading(true);
    try {
      const endpoint = action === "buy" ? "buystocks" : "sellstocks";
      const res = await axios.post(`/portfolio/${endpoint}/${userId}`, {
        symbol,
        quantity,
      });
      setPortfolio(res.data.portfolio);
      setMessage(`Stock ${action}ed successfully`);
    } catch (err) {
      setMessage(err.response?.data?.message || `Failed to ${action} stock`);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Your Portfolio
      </Typography>

      {!portfolio ? (
        <Button variant="contained" onClick={createPortfolio}>
          Create Portfolio
        </Button>
      ) : (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Cash: ${portfolio.cash.toFixed(2)}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6">Stocks:</Typography>
              {portfolio.stocks.length > 0 ? (
                portfolio.stocks.map((stock) => (
                  <Typography key={stock._id}>
                    {stock.Symbol} - {stock.quantity} shares @ ${stock.averagePrice.toFixed(2)}
                  </Typography>
                ))
              ) : (
                <Typography>No stocks in portfolio.</Typography>
              )}
            </CardContent>
          </Card>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={3}>
              <TextField
                label="Stock Symbol"
                fullWidth
                value={symbol}
                onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                type="number"
                label="Quantity"
                fullWidth
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setAction("buy")}
                disabled={action === "buy"}
              >
                Buy
              </Button>
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={() => setAction("sell")}
                disabled={action === "sell"}
              >
                Sell
              </Button>
              <Button
                variant="outlined"
                sx={{ ml: 2 }}
                onClick={handleTransaction}
                disabled={loading || !symbol || quantity <= 0}
              >
                Confirm {action}
              </Button>
            </Grid>
          </Grid>

          {message && (
            <Typography mt={2} color="info.main">
              {message}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Portfolio;
