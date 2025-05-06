import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios"; 
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
      toast.success("Portfolio created!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Portfolio already exists");
    }
  };

  const handleTransaction = async () => {
    setLoading(true);
    try {
      const endpoint = action === "buy" ? "buystocks" : "sellstocks";
      const res = await axios.post(`/stocks/${endpoint}/${userId}`, {
        symbol,
        quantity,
      });
  
      // Only update if the backend confirms successful transaction
      if (res.data?.portfolio) {
        setPortfolio(res.data.portfolio);
        toast.success(`Stock ${action.charAt(0).toUpperCase() + action.slice(1)}ed successfully`);
      }
  
      setSymbol("");
      setQuantity(1);
    } catch (err) {
      toast.error(err.response?.data?.message || `Failed to ${action} stock`);
  
      // 🔄 Refetch portfolio to sync with actual state
      await fetchPortfolio();
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <Box p={3}>
      <ToastContainer position="top-center" autoClose={3000} />
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
                variant={action === "buy" ? "contained" : "outlined"}
                color="primary"
                onClick={() => setAction("buy")}
                disabled={action === "buy"}
                sx={{ mr: 2 }}
              >
                Buy
              </Button>
              <Button
                variant={action === "sell" ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setAction("sell")}
                disabled={action === "sell"}
                sx={{ mr: 2 }}
              >
                Sell
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={handleTransaction}
                disabled={!action || loading || !symbol || quantity <= 0}
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
