import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessModal = ({ show, onClose, title, message }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 slide-in">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-6">{message}</p>
          <button
            onClick={onClose}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
