// Modal.js (optional, if you want to keep it separate)
import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // If the modal is not open, return null

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-end items-end">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">Close</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
