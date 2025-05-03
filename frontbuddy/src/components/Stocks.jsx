// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   TextField,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Grid,
//   CircularProgress,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Paper,
// } from "@mui/material";
// import { jwtDecode } from "jwt-decode";
// import axios from "../api/axios";

// const Stock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [externalResults, setExternalResults] = useState([]);

//   const token = localStorage.getItem("token");
//   const decoded = jwtDecode(token);
//   const userId = decoded.id;


//   const fetchStocks = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get("/stocks/getstocks");
//       setStocks(res.data.data);
//     } catch (error) {
//       console.error("Error fetching stocks:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExternalStocks = async (query) => {
//     if (!query) {
//       setExternalResults([]);
//       return;
//     }

//     try {
//       const res = await axios.get("https://finnhub.io/api/v1/search", {
//         params: {
//           q: query,
//           token: process.env.REACT_APP_FINNHUB_API_KEY || "d05gkdhr01qoigrugmo0d05gkdhr01qoigrugmog",
//         },
//       });
//       setExternalResults(res.data.result || []);
//     } catch (error) {
//       console.error("Error fetching external stocks:", error);
//     }
//   };

//   const addToPortfolio = async (symbol) => {
//     try {
//       await axios.post(
//         `/stocks/addstocks/${userId}`,
//         { symbol });
//       alert(`${symbol} added to portfolio`);
//     } catch (error) {
//       alert("Error adding stock: " + error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     fetchStocks();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.trim() !== "") {
//       fetchExternalStocks(searchTerm);
//     } else {
//       setExternalResults([]);
//     }
//   }, [searchTerm]);

//   const filteredStocks = stocks.filter((stock) =>
//     stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Container sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Browse Stocks
//       </Typography>

//       <TextField
//         label="Search by Symbol"
//         variant="outlined"
//         fullWidth
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         sx={{ mb: 4 }}
//       />

//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <>
//           <Grid container spacing={3}>
//             {filteredStocks.map((stock, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card variant="outlined">
//                   <CardContent>
//                     <Typography variant="h6">{stock.symbol}</Typography>
//                     <Typography>Current: ${stock.currentPrice}</Typography>
//                     <Typography>High: ${stock.high}</Typography>
//                     <Typography>Low: ${stock.low}</Typography>
//                     <Typography>Prev Close: ${stock.previousClose}</Typography>
//                     <Button
//                       variant="contained"
//                       fullWidth
//                       sx={{ mt: 2 }}
//                       onClick={() => addToPortfolio(stock.symbol)}
//                     >
//                       Add to Portfolio
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>

//           {/* External Search Results */}
//           {externalResults.length > 0 && (
//             <Paper sx={{ mt: 6, p: 2, overflowX: "auto" }}>
//               <Typography variant="h6" sx={{ mb: 2 }}>
//                 External Stock Search Results
//               </Typography>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Symbol</TableCell>
//                     <TableCell>Name</TableCell>
//                     <TableCell>Type</TableCell>
//                     <TableCell>Region</TableCell>
//                     <TableCell>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {externalResults.map((result, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{result.symbol}</TableCell>
//                       <TableCell>{result.description}</TableCell>
//                       <TableCell>{result.type}</TableCell>
//                       <TableCell>{result.region || "—"}</TableCell>
//                       <TableCell>
//                         <Button
//                           variant="outlined"
//                           onClick={() => addToPortfolio(result.symbol)}
//                         >
//                           Add
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Paper>
//           )}
//         </>
//       )}
//     </Container>
//   );
// };

// export default Stock;


import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";
import Autocomplete from '@mui/material/Autocomplete';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [externalResults, setExternalResults] = useState([]);
  const [options, setOptions] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const fetchStocks = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/stocks/getstocks");
      setStocks(res.data.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const res = await axios.get("/stocks/suggeststocks", {
        params: { query },
      });
      setOptions(res.data.suggestions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };


  const fetchExternalQuote = async (symbol) => {
    try {
      const res = await axios.get("https://finnhub.io/api/v1/quote", {
        params: {
          symbol,
          token: process.env.REACT_APP_FINNHUB_API_KEY || "d05gkdhr01qoigrugmo0d05gkdhr01qoigrugmog",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching quote:", error);
      return null;
    }
  };

  const fetchExternalStocks = async (query) => {
    if (!query) {
      setExternalResults([]);
      return;
    }

    try {
      const res = await axios.get(`/stocks/searchstocks`, {
        params: { symbol: query },
      });

      const stock = res.data.data;

      const enrichedStock = {
        symbol: stock.symbol,
        name: query.toUpperCase(), // Optional: or fetch description if needed
        currentPrice: stock.currentPrice ?? "N/A",
        high: stock.high ?? "N/A",
        low: stock.low ?? "N/A",
        previousClose: stock.previousClose ?? "N/A",
      };

      setExternalResults([enrichedStock]); // Set as array so it maps with mergedStocks
    } catch (error) {
      console.error("Error fetching stock:", error);
      setExternalResults([]); // Clear if error
    }
  };



  const addToPortfolio = async (symbol) => {
    try {
      await axios.post(`/stocks/addstocks/${userId}`, { symbol });
      alert(`${symbol} added to portfolio`);
    } catch (error) {
      alert("Error adding stock: " + error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchExternalStocks(searchTerm.trim().toUpperCase());
    } else {
      setExternalResults([]);
    }
  }, [searchTerm]);


  const filteredStocks = stocks.filter((stock) =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const mergedStocks = [
    ...filteredStocks,
    ...externalResults.filter(
      (ext) => !filteredStocks.some((stock) => stock.symbol === ext.symbol)
    ),
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Browse Stocks
      </Typography>

      <Autocomplete
        freeSolo
        options={options} // already just an array of strings like ["MSFT", "META"]
        onInputChange={(event, value) => {
          setSearchTerm(value);
          if (value.trim()) {
            fetchSuggestions(value.trim().toUpperCase());
          } else {
            setOptions([]);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label="Search by Symbol" variant="outlined" fullWidth sx={{ mb: 4 }} />
        )}
      />


      {loading ? (
        <CircularProgress />
      ) : (
        <Paper sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Symbol</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Current</strong></TableCell>
                <TableCell sx={{ color: "green" }}><strong>High</strong></TableCell>
                <TableCell sx={{ color: "red" }}><strong>Low</strong></TableCell>
                <TableCell><strong>Prev Close</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mergedStocks.map((stock, index) => (
                <TableRow key={index}>
                  <TableCell>{stock.symbol}</TableCell>
                  <TableCell>{stock.name || stock.description || "N/A"}</TableCell>
                  <TableCell>${stock.currentPrice ?? "—"}</TableCell>
                  <TableCell sx={{ color: "green" }}>${stock.high ?? "—"}</TableCell>
                  <TableCell sx={{ color: "red" }}>${stock.low ?? "—"}</TableCell>
                  <TableCell>${stock.previousClose ?? "—"}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => addToPortfolio(stock.symbol)}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Container>
  );
};

export default Stock;
