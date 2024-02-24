import React from 'react';

const Modal = ({ isOpen, onClose, children ,onCreateDialog}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md relative flex flex-col gap-2">
        <button className="absolute top-2 right-2" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
