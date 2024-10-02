
'use client'
import { useState } from 'react';
import Terms from './Terms';

export default function TermsBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181C1F]">
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
      >
        Open Terms and Conditions
      </button>

      <Terms isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
