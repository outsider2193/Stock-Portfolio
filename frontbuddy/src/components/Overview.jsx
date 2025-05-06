import React, { useEffect, useState } from "react"; 
import { usePortfolio } from "../components/PortfolioContext"; // Context hook for portfolio data
import { Typography, Card, CardContent, Box, Divider } from "@mui/material";
import { Line } from "react-chartjs-2"; // Import chart.js line chart
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  const { portfolio, calculatePortfolioValues } = usePortfolio();
  const [totalValue, setTotalValue] = useState(0);
  const [score, setScore] = useState(0);
  const [activeHoldings, setActiveHoldings] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [], // For storing time-based labels (e.g., dates or intervals)
    datasets: [
      {
        label: "Portfolio Value",
        data: [], // Store portfolio values
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Area color under the line
        fill: true,
        tension: 0.1, // Makes the line curve
      },
      {
        label: "Portfolio Score",
        data: [], // Store portfolio scores
        borderColor: "rgba(255, 99, 132, 1)", // Line color
        backgroundColor: "rgba(255, 99, 132, 0.2)", // Area color under the line
        fill: true,
        tension: 0.1, // Makes the line curve
      },
    ],
  });

  useEffect(() => {
    if (portfolio) {
      const { totalValue, score, activeHoldings } = calculatePortfolioValues();
      setTotalValue(totalValue);
      setScore(score);
      setActiveHoldings(activeHoldings);

      // Updating chart data based on portfolio values and scores
      setChartData((prevData) => ({
        ...prevData,
        labels: [...prevData.labels, new Date().toLocaleString()], // Add timestamp as label
        datasets: prevData.datasets.map((dataset, index) => {
          // Update the appropriate dataset (value or score)
          const newData = index === 0 ? totalValue : score;
          dataset.data = [...dataset.data, newData]; // Add the new value
          return dataset;
        }),
      }));
    }
  }, [portfolio]);

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Portfolio Overview
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Total Portfolio Value: ${totalValue.toFixed(2)}</Typography>
          <Typography variant="h6">Portfolio Score: {score.toFixed(2)}</Typography>
          <Typography variant="h6">Active Holdings: {activeHoldings}</Typography>
        </CardContent>
      </Card>

      {/* Chart Component */}
      <Card>
        <CardContent>
          <Typography variant="h6">Portfolio Value and Score Trend</Typography>
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Overview;
