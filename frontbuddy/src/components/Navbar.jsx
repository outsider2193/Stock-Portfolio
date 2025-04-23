import React from "react";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = ({ userProfile, onLogout }) => (
  <nav className="bg-white shadow-lg">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16 items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-gray-800">Investment Dashboard</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40?text=Profile"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />
            <span className="text-gray-700">{userProfile.name}</span>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;