import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "../../api/axios";
import dayjs from "dayjs";

const UserTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/admin/alltransactions");
      const data = res.data?.transactions;
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        All User Transactions
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : transactions.length === 0 ? (
        <Typography>No transactions found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Stock</strong></TableCell>
                <TableCell><strong>Quantity</strong></TableCell>
                <TableCell><strong>Price</strong></TableCell>
                <TableCell><strong>Total</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((txn) => (
                <TableRow key={txn._id}>
                  <TableCell>{txn.symbol || "N/A"}</TableCell>
                  <TableCell>{txn.quantity}</TableCell>
                  <TableCell>${txn.price?.toFixed(2) || "N/A"}</TableCell>
                  <TableCell>
                    $
                    {txn.price && txn.quantity
                      ? (txn.price * txn.quantity).toFixed(2)
                      : "N/A"}
                  </TableCell>
                  <TableCell>{dayjs(txn.createdAt).format("DD MMM YYYY")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default UserTransactions;
