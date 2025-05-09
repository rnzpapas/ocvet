import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-raisin-black bg-opacity-70">
      <div className="bg-white-smoke rounded-lg shadow-lg p-6 w-full max-w-md font-instrument-sans relative">
        
        {/* Exit Icon */}
        <button onClick={onClose} className="absolute top-2 right-2 text-raisin-black-light hover:text-fire-engine-red text-2xl">
          &times;
        </button>

        {/* Modal Title */}
        <h2 className="text-headline-md font-semibold text-raisin-black mb-2">{title}</h2>

        {/* Modal Message */}
        <p className="text-content-md text-raisin-black-light mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-silver text-raisin-black text-content-sm rounded hover:bg-raisin-black-light hover:text-white-smoke"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-fire-engine-red text-white-smoke text-content-sm rounded hover:bg-lime-green"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
