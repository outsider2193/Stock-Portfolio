import React from "react";

const Loader = () => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600"></div>
  </div>
);

export default Loader;