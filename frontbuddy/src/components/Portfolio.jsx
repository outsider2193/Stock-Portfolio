import React, { useState } from "react";

const Portfolio = ({ stocks, portfolios, setPortfolios, showToast }) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);
  const [showBuySellForm, setShowBuySellForm] = useState(false);
  const [showCreatePortfolioForm, setShowCreatePortfolioForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">My Portfolios</h2>
        <button
          onClick={() => setShowCreatePortfolioForm(true)}
          className="!rounded-button bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
        >
          Create Portfolio
        </button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{portfolio.name}</h3>
                <p className="text-gray-500">Portfolio Score: {portfolio.score}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    portfolio.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {portfolio.status}
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => {
                      setSelectedPortfolio(portfolio);
                      setShowCreatePortfolioForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedPortfolio(portfolio);
                      setShowDeleteConfirmation(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Value</span>
                <span className="text-lg font-semibold">${portfolio.value}</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Daily</p>
                  <p
                    className={`font-semibold ${
                      portfolio.performance.daily >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {portfolio.performance.daily >= 0 ? "+" : ""}
                    {portfolio.performance.daily}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Weekly</p>
                  <p
                    className={`font-semibold ${
                      portfolio.performance.weekly >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {portfolio.performance.weekly >= 0 ? "+" : ""}
                    {portfolio.performance.weekly}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-gray-500 text-sm">Monthly</p>
                  <p
                    className={`font-semibold ${
                      portfolio.performance.monthly >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {portfolio.performance.monthly >= 0 ? "+" : ""}
                    {portfolio.performance.monthly}%
                  </p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-600">Stocks ({portfolio.stocks.length})</h4>
                  <button
                    onClick={() => {
                      setSelectedPortfolio(portfolio);
                      setShowBuySellForm(true);
                    }}
                    className="text-xs text-indigo-600 hover:text-indigo-900"
                  >
                    <i className="fas fa-plus mr-1"></i> Add Stock
                  </button>
                </div>
                <div className="space-y-2">
                  {portfolio.stocks.map((stock) => (
                    <div key={stock.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{stock.name}</p>
                        <p className="text-xs text-gray-500">{stock.symbol}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="text-sm">${stock.price}</p>
                          <p
                            className={`text-xs ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change}%
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            const updatedPortfolios = portfolios.map((p) =>
                              p.id === portfolio.id
                                ? { ...p, stocks: p.stocks.filter((s) => s.id !== stock.id) }
                                : p
                            );
                            setPortfolios(updatedPortfolios);
                            showToast(`${stock.name} removed from portfolio`, "success");
                          }}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setSelectedPortfolio(portfolio)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showCreatePortfolioForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {selectedPortfolio ? "Edit Portfolio" : "Create New Portfolio"}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Portfolio Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg"
                  defaultValue={selectedPortfolio?.name || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Stocks</label>
                <select multiple className="mt-1 block w-full px-3 py-2 border rounded-lg h-32">
                  {stocks.map((stock) => (
                    <option
                      key={stock.id}
                      value={stock.id}
                      selected={selectedPortfolio?.stocks.some((s) => s.id === stock.id)}
                    >
                      {stock.name} ({stock.symbol})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreatePortfolioForm(false);
                    setSelectedPortfolio(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!rounded-button px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest("form");
                    const formData = new FormData(form);
                    const name = formData.get("name");
                    if (selectedPortfolio) {
                      const updatedPortfolios = portfolios.map((p) =>
                        p.id === selectedPortfolio.id ? { ...p, name: name || p.name } : p
                      );
                      setPortfolios(updatedPortfolios);
                      showToast("Portfolio updated successfully", "success");
                    } else {
                      const newPortfolio = {
                        id: (portfolios.length + 1).toString(),
                        name: name || "New Portfolio",
                        score: Math.floor(Math.random() * 30) + 70,
                        status: "active",
                        value: Math.floor(Math.random() * 200000) + 100000,
                        stocks: [],
                        performance: {
                          daily: parseFloat((Math.random() * 5 - 2).toFixed(1)),
                          weekly: parseFloat((Math.random() * 10 - 3).toFixed(1)),
                          monthly: parseFloat((Math.random() * 15 - 5).toFixed(1)),
                        },
                      };
                      setPortfolios([...portfolios, newPortfolio]);
                      showToast("Portfolio created successfully", "success");
                    }
                    setShowCreatePortfolioForm(false);
                    setSelectedPortfolio(null);
                  }}
                >
                  {selectedPortfolio ? "Update Portfolio" : "Create Portfolio"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirmation && selectedPortfolio && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
            <div className="text-center mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Portfolio</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this portfolio? This action cannot be undone.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setSelectedPortfolio(null);
                }}
                className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 !rounded-button whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setPortfolios(portfolios.filter((p) => p.id !== selectedPortfolio.id));
                  showToast("Portfolio deleted successfully", "success");
                  setShowDeleteConfirmation(false);
                  setSelectedPortfolio(null);
                }}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg !rounded-button whitespace-nowrap"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showBuySellForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Add Stock to {selectedPortfolio.name}</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Stock</label>
                <select
                  name="stockId"
                  className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {stocks
                    .filter((stock) => !selectedPortfolio.stocks.some((s) => s.id === stock.id))
                    .map((stock) => (
                      <option key={stock.id} value={stock.id}>
                        {stock.name} ({stock.symbol})
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBuySellForm(false);
                    setSelectedPortfolio(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!rounded-button px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest("form");
                    const formData = new FormData(form);
                    const stockId = formData.get("stockId");
                    const stockToAdd = stocks.find((s) => s.id === stockId);
                    if (stockToAdd) {
                      const updatedPortfolios = portfolios.map((p) =>
                        p.id === selectedPortfolio.id
                          ? { ...p, stocks: [...p.stocks, stockToAdd] }
                          : p
                      );
                      setPortfolios(updatedPortfolios);
                      showToast(`${stockToAdd.name} added to ${selectedPortfolio.name}`, "success");
                    }
                    setShowBuySellForm(false);
                    setSelectedPortfolio(null);
                  }}
                >
                  Add Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;