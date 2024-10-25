import React from 'react';
import parse from 'html-react-parser';

export default function ProsCons({ pros, cons }) {

  return (
    <section className="text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-10">
        <div className="lg:border-r border-white" style={{ borderRightStyle: 'dashed' }}>
          <h3 className="font-bold mb-2">Pros</h3>
          <ul className="list-disc ml-5 space-y-2">
            {pros?.map((pro, index) => (
              <li key={index}>
                {parse(pro)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">CONS</h3>
          <ul className="list-disc ml-5 space-y-2">
            {cons?.map((con, index) => (
              <li key={index}>
                {parse(con)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
