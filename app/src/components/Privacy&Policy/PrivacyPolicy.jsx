'use client'
// components/PrivacyPolicyModal.js
import React from 'react';
import Link from 'next/link';
import htmlContentWhite from '@/lib/privacy_policy_white.html'
import htmlContentDark from '@/lib/privacy_policy_dark.html'

const PrivacyPolicy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full mx-[30px] lg:max-w-4xl p-8 bg-[#323639] rounded-lg shadow-lg text-white overflow-y-auto max-h-[90vh]">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-white"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div dangerouslySetInnerHTML={{ __html: htmlContentDark }} />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
