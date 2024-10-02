'use client'
// pages/index.js
import { useState } from 'react';
import PrivacyPolicy from './PrivacyPolicy';


export default function PrivacyBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#181C1F]">
      <button
        onClick={openModal}
        className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
      >
        Open Privacy Policy
      </button>

      <PrivacyPolicy isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
