import React from "react";
import { FaTimes } from "react-icons/fa";

const ToastNotification = ({ message, type, show, onClose }) => {
  if (!show) return null;

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white`}
    >
      <div className="flex items-center">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white">
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

export default ToastNotification;