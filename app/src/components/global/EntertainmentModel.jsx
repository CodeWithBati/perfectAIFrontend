
'use client';

import React, { useEffect, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

const EntertainmentModel = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-w-3xl w-full mx-4 transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        ref={modalRef}
        tabIndex="-1"
      >
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-white bg-transparent hover:bg-gray-700 rounded-full p-1 transition"
          onClick={onClose}
          aria-label="Close Modal"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="bg-white rounded-lg overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentModel;
