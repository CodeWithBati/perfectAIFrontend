// components/TermsAndConditionsModal.js
'use client'
import React from 'react';
import Link from 'next/link';

const Terms = ({ isOpen, onClose }) => {
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
        <h2 className="mb-4 text-2xl font-bold">TERMS AND CONDITIONS</h2>
        <p className="text-white text-sm">Last updated August 08, 2024</p>
        <div className="mt-6 text-sm space-y-4 border-t border-[rgba(255,255,255,0.5)]">
          <h3 className="text-lg font-semibold pt-8">AGREEMENT TO OUR LEGAL TERMS</h3>
          <p>
            We are MYPERFECTAI LTD, doing business as MyPerfectAI (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a company registered in England at 20 Wenlock Road, London N1 7GU.
          </p>
          <p>
            We operate the website <Link href="https://www.myperfectai.app" className="underline text-[#BF96E4]">https://www.myperfectai.app</Link> (the &quot;Site&quot;), as well as any other related products and services that refer or link to these legal terms (the &quot;Legal Terms&quot;) (collectively, the &quot;Services&quot;).
          </p>
          <p>
            You can contact us by email at contact@myperfectai.app or by mail to 20 Wenlock Road, London N1 7GU, England.
          </p>
          <p>
            These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&quot;you&quot;), and MYPERFECTAI LTD, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
          </p>
          <p>
            Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the &quot;Last updated&quot; date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
          </p>
          <p>
            The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
          </p>
          <p>
            We recommend that you print a copy of these Legal Terms for your records.
          </p>

          <h3 className="text-lg font-semibold">TABLE OF CONTENTS</h3>
          <ul className="list-decimal text-sm pl-5 space-y-4 text-[#BF96E4]">
            <li>OUR SERVICES</li>
            <li>INTELLECTUAL PROPERTY RIGHTS</li>
            <li>USER REPRESENTATIONS</li>
            <li>USER REGISTRATION</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Terms;
