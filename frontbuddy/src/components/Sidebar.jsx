import React from "react";
import { FaHome, FaChartLine, FaBriefcase, FaBuilding, FaCreditCard, FaUser, FaCog, FaUsers, FaExchangeAlt, FaMoneyBill } from "react-icons/fa";

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: "overview", label: "Overview", icon: <FaHome /> },
    { id: "stocks", label: "Stocks", icon: <FaChartLine /> },
    { id: "portfolio", label: "Portfolio", icon: <FaBriefcase /> },
    { id: "companies", label: "Companies", icon: <FaBuilding /> },
    { id: "subscriptions", label: "Subscriptions", icon: <FaCreditCard /> },
    { id: "profile", label: "Profile", icon: <FaUser /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
    { id: "user-management", label: "User Management", icon: <FaUsers /> },
    { id: "stock-management", label: "Stock Management", icon: <FaExchangeAlt /> },
    { id: "subscription-management", label: "Subscription Management", icon: <FaMoneyBill /> },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <div className="mb-8">
        <img
          src="https://via.placeholder.com/120?text=Logo"
          alt="Logo"
          className="h-12 mx-auto"
        />
      </div>
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full text-left px-4 py-2 mb-2 rounded-lg flex items-center space-x-2 ${
              activeView === item.id ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;