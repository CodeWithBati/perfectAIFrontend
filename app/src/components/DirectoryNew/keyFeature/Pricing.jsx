// components/Pricing.js
import React from 'react';
import parse from 'html-react-parser';

export default function Pricing({ pricingData }) {

  if (!pricingData || pricingData.length === 0) {
    return (
      <section className="text-white">
        <p className="mb-4 font-bold">GetGenie AI offers several pricing plans:</p>
        <p className="text-white">No pricing information available.</p>
      </section>
    );
  }

  return (
    <section className="text-white">
      <p className="mb-4 font-bold">GetGenie AI offers several pricing plans:</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {pricingData.map((plan, index) => (
          <div className="bg-[#323639] p-5 rounded" key={index}>
            <h3 className="font-bold text-lg mb-2">{parse(plan.name)}</h3>
            <p className="text-md">
              {parse(plan.description)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
