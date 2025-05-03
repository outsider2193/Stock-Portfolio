import React, { useState, useEffect } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Stocks from "../components/Stocks";
import Portfolio from "../components/Portfolio";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import Companies from "../components/Companies";
import * as echarts from "echarts";

const Dashboard = ({ userProfile, setUserProfile, onLogout, showToast }) => {
  const [activeView, setActiveView] = useState("overview");
  const [stocks, setStocks] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState({ stocks: false, portfolios: false, companies: false });

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(prev => ({ ...prev, stocks: true }));
        const response = await fetch('/stocks/stocks', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        if (!response.ok) throw new Error('Failed to fetch stocks');
        const data = await response.json();
        const formattedStocks = data.data?.map(stock => ({
          id: stock.symbol,
          name: stock.symbol,
          symbol: stock.symbol,
          price: stock.currentPrice,
          high: stock.high,
          low: stock.low,
          previousClose: stock.previousClose,
          change: ((stock.currentPrice - stock.previousClose) / stock.previousClose * 100).toFixed(2),
          volume: 0,
          marketCap: 0,
          signal: stock.currentPrice > stock.previousClose ? "buy" : "sell",
          sector: "Technology"
        })) || [];
        setStocks(formattedStocks);
      } catch (error) {
        showToast?.("Failed to load stocks", "error");
      } finally {
        setLoading(prev => ({ ...prev, stocks: false }));
      }
    };
    if (userProfile?._id) fetchStocks();
  }, [userProfile, showToast]);

  useEffect(() => {
    if (stocks.length > 0) {
      const companyNames = {
        'AAPL': 'Apple Inc.', 'GOOGL': 'Alphabet Inc.', 'MSFT': 'Microsoft Corporation',
        'AMZN': 'Amazon.com, Inc.', 'TSLA': 'Tesla, Inc.', 'NFLX': 'Netflix, Inc.',
        'META': 'Meta Platforms, Inc.', 'NVDA': 'NVIDIA Corporation', 'BABA': 'Alibaba Group', 'DIS': 'Disney'
      };
      const companySectors = {
        'AAPL': 'Technology', 'GOOGL': 'Technology', 'MSFT': 'Technology',
        'AMZN': 'Consumer Cyclical', 'TSLA': 'Automotive', 'NFLX': 'Entertainment',
        'META': 'Technology', 'NVDA': 'Technology', 'BABA': 'Consumer Cyclical', 'DIS': 'Entertainment'
      };
      const stockCompanies = stocks.map(stock => ({
        id: stock.id || stock.symbol,
        name: companyNames[stock.symbol] || `${stock.symbol} Inc.`,
        sector: companySectors[stock.symbol] || 'Technology',
        status: "active",
        stockPrice: stock.price,
        marketCap: 0,
        yearlyGrowth: 0
      }));
      setCompanies(stockCompanies);
    }
  }, [stocks]);

  useEffect(() => {
    if (activeView === "overview") {
      const chartDom = document.getElementById("performanceChart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        myChart.setOption({
          animation: false,
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
          yAxis: { type: "value" },
          series: [{
            name: "Portfolio Performance",
            type: "line",
            data: [820, 932, 901, 934, 1290, 1330],
            smooth: true,
            lineStyle: { color: "#4F46E5" },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "rgba(79, 70, 229, 0.3)" },
                { offset: 1, color: "rgba(79, 70, 229, 0.1)" }
              ])
            }
          }]
        });
      }
    }
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case "overview": return <Overview />;
      case "stocks": return <Stocks stocks={stocks} setStocks={setStocks} showToast={showToast} loading={loading.stocks} />;
      case "portfolio": return <Portfolio portfolios={portfolios} setPortfolios={setPortfolios} stocks={stocks} showToast={showToast} loading={loading.portfolios} />;
      case "profile": return <Profile userProfile={userProfile} setUserProfile={setUserProfile} />;
      case "settings": return <Settings />;
      case "companies": return <Companies companies={companies} setCompanies={setCompanies} stocks={stocks} showToast={showToast} loading={loading.companies} />;
      default: return null;
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Navbar userProfile={userProfile} onLogout={onLogout} />
        {renderView()}
      </Box>
    </Box>
  );
}; 

export default Dashboard;
