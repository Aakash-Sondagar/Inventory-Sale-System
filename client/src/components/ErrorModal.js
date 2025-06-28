import React from "react";
import { FaExclamationCircle } from "react-icons/fa";

const ErrorModal = ({ show, onClose, title, message }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 slide-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaExclamationCircle className="text-red-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
