import React, { useState } from "react";

const StockManagement = ({ stocks, setStocks, showToast }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [showAddStockForm, setShowAddStockForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search stocks..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <button
          onClick={() => {
            setSelectedStock(null);
            setShowAddStockForm(true);
          }}
          className="!rounded-button bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
        >
          Add New Stock
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{stock.symbol}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${stock.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className={`text-sm ${
                      stock.change >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      stock.signal === "buy"
                        ? "bg-green-100 text-green-800"
                        : stock.signal === "sell"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {stock.signal.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setSelectedStock(stock);
                      setShowAddStockForm(true);
                    }}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this stock?")) {
                        setStocks(stocks.filter((s) => s.id !== stock.id));
                        showToast("Stock deleted successfully", "success");
                      }
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAddStockForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-6">
              {selectedStock ? "Edit Stock" : "Add New Stock"}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stock Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedStock?.name || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedStock?.symbol || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedStock?.price || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sector
                </label>
                <select
                  name="sector"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedStock?.sector || ""}
                >
                  <option value="">Select sector</option>
                  <option value="Technology">Technology</option>
                  <option value="Energy">Energy</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Consumer">Consumer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Signal
                </label>
                <select
                  name="signal"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedStock?.signal || ""}
                >
                  <option value="">Select signal</option>
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                  <option value="hold">Hold</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddStockForm(false);
                    setSelectedStock(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="!rounded-button bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700"
                  onClick={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget.closest("form");
                    const formData = new FormData(form);
                    const name = formData.get("name");
                    const symbol = formData.get("symbol");
                    const price = parseFloat(formData.get("price"));
                    const sector = formData.get("sector");
                    const signal = formData.get("signal");

                    if (!name || !symbol || !price || !sector || !signal) {
                      showToast("Please fill all required fields", "error");
                      return;
                    }

                    if (selectedStock) {
                      const updatedStocks = stocks.map((s) =>
                        s.id === selectedStock.id
                          ? {
                              ...s,
                              name,
                              symbol,
                              price,
                              sector,
                              signal,
                            }
                          : s
                      );
                      setStocks(updatedStocks);
                      showToast("Stock updated successfully", "success");
                    } else {
                      const newStock = {
                        id: (stocks.length + 1).toString(),
                        name,
                        symbol,
                        price,
                        change: parseFloat((Math.random() * 5 - 2).toFixed(1)),
                        volume: Math.floor(Math.random() * 1000000) + 100000,
                        marketCap:
                          price * (Math.floor(Math.random() * 1000000) + 100000),
                        signal,
                        sector,
                      };
                      setStocks([...stocks, newStock]);
                      showToast("Stock added successfully", "success");
                    }
                    setShowAddStockForm(false);
                    setSelectedStock(null);
                  }}
                >
                  {selectedStock ? "Update Stock" : "Add Stock"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockManagement;