'use client'
// components/PrivacyPolicyModal.js
import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-w-4xl p-8 bg-[#323639] rounded-lg shadow-lg text-white overflow-y-auto max-h-[90vh]">
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
        <h2 className="mb-4 text-2xl font-bold">PRIVACY POLICY</h2>
        <p className="text-white text-sm">Last updated August 08, 2024</p>
        <div className="mt-6 text-sm space-y-4 border-t border-[rgba(255,255,255,0.5)] pt-4">
          <p className='text-sm'>
            This privacy notice for MYPERFECTAI LTD (doing business as MyPerfectAI) ('we', 'us', or 'our'), describes how and why we might collect, store, use, and/or share ('process') your information when you use our services ('Services'), such as when you:
            <ul className='list-disc ml-4'>
              <li>Visit our website at <Link href='#' className="text-[#BF96E4]">https://www.myperfectai.app</Link>, or any website of ours that links to this privacy notice</li>
              <li>Engage with us in other related ways, including any sales, marketing, or events</li>
            </ul>
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at data@myperfectai.app.
          </p>
          <h3 className="text-lg font-semibold pt-8">SUMMARY OF KEY POINTS</h3>
          <p>This summary provides key points from our privacy notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our <Link href='#' className="text-[#BF96E4]">table of contents </Link>below to find the section you are looking for.</p>

          <p>What personal information do we process? When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about <Link href='#' className="text-[#BF96E4]">personal information you disclose to us</Link>.</p>

          <p>Do we process any sensitive personal information? We do not process sensitive personal information.</p>

          <p>Do we collect any information from third parties? We may collect information from public databases, marketing partners, social media platforms, and other outside sources. Learn more about <Link href='#' className="text-[#BF96E4]">information collected from other sources</Link>.</p>

          <p>How do we process your information? We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about <Link href='#' className="text-[#BF96E4]">how we process your information</Link>.</p>

          <p>In what situations and with which types of parties do we share personal information? We may share information in specific situations and with specific categories of third parties. Learn more about <Link href='#' className="text-[#BF96E4]">when and with whom we share your personal information</Link>.</p>

          <p>How do we keep your information safe? We have organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,</p>

          {/* Add the remaining terms and conditions content as needed */}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
