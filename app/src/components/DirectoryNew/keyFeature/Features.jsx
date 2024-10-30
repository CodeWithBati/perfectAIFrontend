import React from 'react';
import parse from 'html-react-parser';

const KeyFeatures = ({ features }) => {
  return (
    <div>
      <ul className="list-disc mt-0 lg:mt-4 ml-6 space-y-4 text-white text-sm">
        {features?.map((feature, index) => (
          <li key={index} className="mt-6">
            {parse(feature)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default KeyFeatures;
