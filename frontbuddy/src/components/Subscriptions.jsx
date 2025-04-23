import React, { useState } from "react";

const Subscriptions = ({ userProfile, showToast }) => {
  const [isLoading, setIsLoading] = useState(false);

  const currentSubscription = {
    plan: "Premium Plan",
    status: "Active",
    startDate: "March 1, 2025",
    expiryDate: "March 31, 2025",
    amount: "$49.99/month",
    features: [
      "Real-time Market Data",
      "Advanced Analytics",
      "Portfolio Management",
      "Expert Insights",
      "24/7 Support",
      "API Access",
    ],
  };

  const paymentHistory = [
    {
      id: "TRX-25032501",
      date: "March 25, 2025",
      description: "Premium Plan Subscription",
      amount: "$49.99",
      status: "Successful",
    },
    {
      id: "TRX-25022501",
      date: "February 25, 2025",
      description: "Premium Plan Subscription",
      amount: "$49.99",
      status: "Successful",
    },
    {
      id: "TRX-25012501",
      date: "January 25, 2025",
      description: "Premium Plan Subscription",
      amount: "$49.99",
      status: "Successful",
    },
  ];

  const handleRenewSubscription = async () => {
    setIsLoading(true);
    try {
      // Simulate API call for renewal
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("Subscription renewed successfully", "success");
    } catch (error) {
      showToast("Failed to renew subscription. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-8">
      {/* Current Subscription */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Current Subscription
        </h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-indigo-50 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-indigo-600">
                {currentSubscription.plan}
              </h3>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-600 text-sm font-medium rounded-full">
                {currentSubscription.status}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Start Date</span>
                <span className="font-medium">
                  {currentSubscription.startDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Expiry Date</span>
                <span className="font-medium">
                  {currentSubscription.expiryDate}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Amount</span>
                <span className="font-medium">{currentSubscription.amount}</span>
              </div>
            </div>
            <button
              onClick={handleRenewSubscription}
              className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Renewing...
                </>
              ) : (
                "Renew Subscription"
              )}
            </button>
          </div>
          <div className="col-span-2 bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Plan Features
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {currentSubscription.features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <i className="fas fa-check-circle text-green-500 mt-1"></i>
                  <span className="text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Payment History
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <select className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="all">All Time</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {paymentHistory.length} of {paymentHistory.length}{" "}
              entries
            </div>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                1
              </button>
              <button
                className="px-3 py-1 border rounded-lg text-gray-600 hover:bg-gray-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;