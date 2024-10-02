import { useState } from 'react';

function UseCaseMultiSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUseCases, setSelectedUseCases] = useState([]);

  const useCases = [
    "Writing and Content Creation",
    "Customer Support and Chatbots",
    "Marketing and Sales Automation",
    "Software Development",
    "Data Analysis and Visualization",
    "Education and E-learning",
    "Health and Fitness",
    "Finance and Accounting",
    "Image Editing and Design"
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleUseCase = (useCase) => {
    if (selectedUseCases.includes(useCase)) {
      setSelectedUseCases(selectedUseCases.filter(item => item !== useCase));
    } else {
      setSelectedUseCases([...selectedUseCases, useCase]);
    }
  };

  const selectAll = () => {
    if (selectedUseCases.length === useCases.length) {
      setSelectedUseCases([]); // Deselect all
    } else {
      setSelectedUseCases(useCases); // Select all
    }
  };

  return (
    <div className="mb-4 bg-[#323639] p-2 border border-[rgba(255,255,255,0.2)] rounded-[5px] shadow-lg cursor-pointer ">
      <label className="block text-[rgba(255,255,255,0.5)] text-xs mb-1">USE CASE</label>
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center"
      >
        <span className="text-white text-sm truncate max-w-full">
          {selectedUseCases.length > 1
            ? selectedUseCases[0] + ', ...'
            : selectedUseCases.length > 0
              ? selectedUseCases[0]
              : 'Select use case'}
        </span>
        <svg width="12" height="12" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg" className={`text-white transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'
          }`}>
          <path d="M7.5 0.75L3.75 4.5L0 0.75V0H7.5V0.75Z" fill="white" />
        </svg>
      </div>
      {isOpen && <div className="bg-[#323639] pt-4 rounded-[5px] shadow-lg w-64">
        {/* Select/Deselect All */}
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={selectedUseCases.length === useCases.length}
            onChange={selectAll}
            className="form-checkbox text-[#8B60B2] h-4 w-4"
          />
          <label className="ml-2 text-white text-sm">All case</label>
        </div>
        <hr className="border-gray-600 mb-4" />

        {/* Use Cases */}
        <div className="space-y-2 overflow-y-auto max-h-60">
          {useCases.map((useCase, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUseCases.includes(useCase)}
                onChange={() => toggleUseCase(useCase)}
                className="form-checkbox text-[#8B60B2] h-4 w-4 outline-none focus:ring-0"
              />
              <label className="ml-2 text-white text-sm">{useCase}</label>
            </div>
          ))}
        </div>
      </div>}
    </div>
  );
}

export default UseCaseMultiSelect;
