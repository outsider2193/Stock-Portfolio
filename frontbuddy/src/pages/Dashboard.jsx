import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Overview from "../components/Overview";
import Stocks from "../components/Stocks";
import Portfolio from "../components/Portfolio";
import Profile from "../components/Profile";
import Settings from "../components/Settings";
import UserManagement from "../components/UserManagement";
import StockManagement from "../components/StockManagement";
import SubscriptionManagement from "../components/SubscriptionManagement";
import Subscriptions from "../components/Subscriptions";
import Companies from "../components/Companies";

const Dashboard = ({ userProfile, setUserProfile, onLogout, showToast }) => {
  const [activeView, setActiveView] = useState("overview");
  const [stocks, setStocks] = useState([
    { id: "1", name: "TechVision Global", symbol: "TVG", price: 456.78, change: 2.5, volume: 1500000, marketCap: 89000000000, signal: "buy", sector: "Technology" },
    { id: "2", name: "GreenEnergy Solutions", symbol: "GES", price: 234.56, change: -1.2, volume: 800000, marketCap: 45000000000, signal: "sell", sector: "Energy" },
    { id: "3", name: "HealthCare Plus", symbol: "HCP", price: 345.67, change: 0.8, volume: 1200000, marketCap: 67000000000, signal: "hold", sector: "Healthcare" },
  ]);
  const [portfolios, setPortfolios] = useState([
    { id: "1", name: "Tech Growth Portfolio", score: 85, status: "active", value: 250000, stocks: stocks.slice(0, 2), performance: { daily: 2.5, weekly: 5.8, monthly: 12.3 } },
    { id: "2", name: "Balanced Investment", score: 92, status: "active", value: 180000, stocks: stocks.slice(1, 3), performance: { daily: 1.2, weekly: 3.5, monthly: 8.7 } },
  ]);
  const [companies, setCompanies] = useState([
    { id: "1", name: "TechVision Global", sector: "Technology", status: "active", stockPrice: 456.78, marketCap: 89000000000, yearlyGrowth: 34.5 },
    { id: "2", name: "GreenEnergy Solutions", sector: "Energy", status: "active", stockPrice: 234.56, marketCap: 45000000000, yearlyGrowth: 28.9 },
    { id: "3", name: "HealthCare Plus", sector: "Healthcare", status: "active", stockPrice: 345.67, marketCap: 67000000000, yearlyGrowth: 22.4 },
  ]);

  useEffect(() => {
    if (activeView === "overview") {
      const chartDom = document.getElementById("performanceChart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          tooltip: { trigger: "axis" },
          xAxis: { type: "category", data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"] },
          yAxis: { type: "value" },
          series: [
            { name: "Portfolio Performance", type: "line", data: [820, 932, 901, 934, 1290, 1330], smooth: true, lineStyle: { color: "#4F46E5" }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: "rgba(79, 70, 229, 0.3)" }, { offset: 1, color: "rgba(79, 70, 229, 0.1)" }]) } },
          ],
        };
        myChart.setOption(option);
      }
    }
  }, [activeView]);

  const renderView = () => {
    switch (activeView) {
      case "overview": return <Overview />;
      case "stocks": return <Stocks stocks={stocks} setStocks={setStocks} showToast={showToast} />;
      case "portfolio": return <Portfolio portfolios={portfolios} setPortfolios={setPortfolios} stocks={stocks} showToast={showToast} />;
      case "profile": return <Profile userProfile={userProfile} setUserProfile={setUserProfile} />;
      case "settings": return <Settings />;
      case "user-management": return <UserManagement />;
      case "stock-management": return <StockManagement stocks={stocks} setStocks={setStocks} />;
      case "subscription-management": return <SubscriptionManagement />;
      case "subscriptions": return <Subscriptions />;
      case "companies": return <Companies companies={companies} setCompanies={setCompanies} stocks={stocks} showToast={showToast} />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <div className="flex-1 overflow-auto">
        <Navbar userProfile={userProfile} onLogout={onLogout} />
        <main className="p-8">{renderView()}</main>
      </div>
    </div>
  );
};

export default Dashboard;