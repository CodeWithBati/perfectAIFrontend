import React from 'react';
import parse from 'html-react-parser';

const UseCases = ({useCases}) => {
  
  return (
    <div>
      <ul className="list-disc mt-4 ml-6 space-y-4 text-white text-sm">
        {useCases?.map((useCase, index) => (
          <li key={index} className='mt-6'>
            {parse(useCase)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UseCases;
