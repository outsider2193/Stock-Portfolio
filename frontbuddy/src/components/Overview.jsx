import React from "react";

const Overview = () => (
  <div>
    <h1 className="text-2xl font-bold mb-6">Portfolio Overview</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Portfolio Score</h3>
        <p className="text-3xl font-bold text-blue-600">87.5</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Active Portfolios</h3>
        <p className="text-3xl font-bold text-blue-600">3</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total Value</h3>
        <p className="text-3xl font-bold text-blue-600">$430,000</p>
      </div>
    </div>
    <div className="mt-8 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
      <div id="performanceChart" style={{ height: "400px" }}></div>
    </div>
  </div>
);

export default Overview;