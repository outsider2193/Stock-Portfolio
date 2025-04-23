import React, { useState } from "react";

const Stocks = ({ stocks, setStocks, showToast }) => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [showBuySellForm, setShowBuySellForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="space-y-6 p-8">
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search stocks..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <div className="flex space-x-4">
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">All Sectors</option>
            <option value="Technology">Technology</option>
            <option value="Energy">Energy</option>
            <option value="Healthcare">Healthcare</option>
          </select>
          <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Sort By</option>
            <option value="price">Price</option>
            <option value="change">Change</option>
            <option value="volume">Volume</option>
          </select>
          <button
            onClick={() => {
              setSelectedStock(null);
              setShowBuySellForm(true);
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <i className="fas fa-plus mr-2"></i> Add Stock
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Signal</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Manage</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stocks.map((stock) => (
              <tr key={stock.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                      <div className="text-sm text-gray-500">{stock.symbol}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${stock.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {stock.change >= 0 ? "+" : ""}{stock.change}%
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{stock.volume}</div>
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
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => {
                        setSelectedStock(stock);
                        setShowBuySellForm(true);
                        setTimeout(() => {
                          const actionSelect = document.querySelector('select[name="action"]');
                          if (actionSelect) actionSelect.value = "buy";
                        }, 100);
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs whitespace-nowrap"
                    >
                      <i className="fas fa-shopping-cart mr-1"></i> Buy
                    </button>
                    <button
                      onClick={() => {
                        setSelectedStock(stock);
                        setShowBuySellForm(true);
                        setTimeout(() => {
                          const actionSelect = document.querySelector('select[name="action"]');
                          if (actionSelect) actionSelect.value = "sell";
                        }, 100);
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs whitespace-nowrap"
                    >
                      <i className="fas fa-dollar-sign mr-1"></i> Sell
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedStock(stock)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <i className="fas fa-info-circle"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedStock(stock);
                      setShowBuySellForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteStock(stock.id)}
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

      {showBuySellForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              {selectedStock ? `Trade ${selectedStock.name}` : "Add New Stock"}
            </h3>
            <form onSubmit={handleTradeStock} className="space-y-4">
              {!selectedStock && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Symbol</label>
                    <input
                      type="text"
                      name="symbol"
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Initial Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      required
                      min="0.01"
                      step="0.01"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Sector</label>
                    <select
                      name="sector"
                      required
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Energy">Energy</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Consumer">Consumer</option>
                    </select>
                  </div>
                </>
              )}
              {selectedStock && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Action</label>
                    <select
                      name="action"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="buy">Buy</option>
                      <option value="sell">Sell</option>
                      <option value="hold">Hold</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      className="mt-1 block w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowBuySellForm(false);
                    setSelectedStock(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Processing...
                    </>
                  ) : selectedStock ? (
                    "Confirm Trade"
                  ) : (
                    "Add Stock"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStock && !showBuySellForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">{selectedStock.name} Details</h3>
              <button
                onClick={() => setSelectedStock(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium mb-2">Stock Information</h5>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm text-gray-500">Symbol</p>
                    <p className="font-medium">{selectedStock.symbol}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-medium">${selectedStock.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Change</p>
                    <p
                      className={`font-medium ${
                        selectedStock.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Volume</p>
                    <p className="font-medium">{stock.volume}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Market Cap</p>
                    <p className="font-medium">${selectedStock.marketCap}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Signal</p>
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedStock.signal === "buy"
                          ? "bg-green-100 text-green-800"
                          : selectedStock.signal === "sell"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedStock.signal.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowBuySellForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <i className="fas fa-edit mr-2"></i> Edit
                </button>
                <button
                  onClick={() => handleDeleteStock(selectedStock.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <i className="fas fa-trash-alt mr-2"></i> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stocks;