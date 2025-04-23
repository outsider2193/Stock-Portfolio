import React, { useState } from "react";

const Companies = ({ companies, setCompanies, stocks, showToast }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAddCompanyForm, setShowAddCompanyForm] = useState(false);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };

  const handleAddOrUpdateCompany = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const sector = formData.get("sector");
    const stockPrice = parseFloat(formData.get("stockPrice"));
    const marketCap = parseFloat(formData.get("marketCap"));
    const yearlyGrowth = parseFloat(formData.get("yearlyGrowth"));
    const status = formData.get("status");

    if (selectedCompany) {
      // Update existing company
      const updatedCompanies = companies.map((company) =>
        company.id === selectedCompany.id
          ? { ...company, name, sector, stockPrice, marketCap, yearlyGrowth, status }
          : company
      );
      setCompanies(updatedCompanies);
      showToast("Company updated successfully", "success");
    } else {
      // Add new company
      const newCompany = {
        id: (companies.length + 1).toString(),
        name,
        sector,
        stockPrice,
        marketCap,
        yearlyGrowth,
        status,
      };
      setCompanies([...companies, newCompany]);
      showToast("Company added successfully", "success");
    }
    setShowAddCompanyForm(false);
    setSelectedCompany(null);
  };

  const handleDeleteCompany = (companyId) => {
    if (window.confirm("Are you sure you want to delete this company?")) {
      setCompanies(companies.filter((c) => c.id !== companyId));
      showToast("Company deleted successfully", "success");
      setSelectedCompany(null);
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Search and Add Button */}
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search companies..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <button
          onClick={() => {
            setShowAddCompanyForm(true);
            setSelectedCompany(null);
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add Company
        </button>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sector
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Market Cap
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Growth
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
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://readdy.ai/api/search-image?query=modern minimalist logo design for ${company.name} company with abstract shapes professional corporate identity&width=40&height=40&seq=${company.id}&orientation=squarish`}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{company.sector}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${company.stockPrice.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${formatNumber(company.marketCap)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-green-600">+{company.yearlyGrowth}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      company.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => setSelectedCompany(company)}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCompany(company);
                      setShowAddCompanyForm(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company.id)}
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

      {/* Add/Edit Company Form */}
      {showAddCompanyForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-6">
              {selectedCompany ? "Edit Company" : "Add New Company"}
            </h3>
            <form onSubmit={handleAddOrUpdateCompany} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter company name"
                  defaultValue={selectedCompany?.name || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                <select
                  name="sector"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedCompany?.sector || ""}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Price ($)</label>
                <input
                  type="number"
                  name="stockPrice"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter stock price"
                  defaultValue={selectedCompany?.stockPrice || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Market Cap ($)</label>
                <input
                  type="number"
                  name="marketCap"
                  required
                  min="0"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter market cap"
                  defaultValue={selectedCompany?.marketCap || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Yearly Growth (%)</label>
                <input
                  type="number"
                  name="yearlyGrowth"
                  required
                  step="0.1"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter yearly growth"
                  defaultValue={selectedCompany?.yearlyGrowth || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  defaultValue={selectedCompany?.status || ""}
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddCompanyForm(false);
                    setSelectedCompany(null);
                  }}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {selectedCompany ? "Update Company" : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Company Details Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold">{selectedCompany.name} Details</h3>
              <button
                onClick={() => setSelectedCompany(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full mr-4"
                    src={`https://readdy.ai/api/search-image?query=modern minimalist logo design for ${selectedCompany.name} company with abstract shapes professional corporate identity&width=64&height=64&seq=${selectedCompany.id}&orientation=squarish`}
                    alt=""
                  />
                  <div>
                    <h4 className="text-lg font-medium">{selectedCompany.name}</h4>
                    <p className="text-gray-500">{selectedCompany.sector}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Financial Information</h5>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm text-gray-500">Stock Price</p>
                      <p className="font-medium">${selectedCompany.stockPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Market Cap</p>
                      <p className="font-medium">${formatNumber(selectedCompany.marketCap)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Yearly Growth</p>
                      <p className="font-medium text-green-600">+{selectedCompany.yearlyGrowth}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          selectedCompany.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {selectedCompany.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Related Stocks</h5>
                  <div className="space-y-2">
                    {stocks
                      .filter((stock) => stock.sector === selectedCompany.sector)
                      .slice(0, 3)
                      .map((stock) => (
                        <div key={stock.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium">{stock.name}</p>
                            <p className="text-xs text-gray-500">{stock.symbol}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm">${stock.price.toFixed(2)}</p>
                            <p
                              className={`text-xs ${
                                stock.change >= 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {stock.change >= 0 ? "+" : ""}{stock.change}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button
                    onClick={() => setShowAddCompanyForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <i className="fas fa-edit mr-2"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(selectedCompany.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    <i className="fas fa-trash-alt mr-2"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Companies;