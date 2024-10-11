import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import React, { useState } from "react";

const MultipleSelect = ({
  size,
  className,
  options,
  selected,
  onChange,
  Name,
  id,
}) => {
  const [isOpen, setIsOpen] = useState(false); // Track dropdown state

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOnChange = (option) => {
    if (selected.some((selectedOption) => selectedOption.name === option.name)) {
      // Deselect the option
      onChange(selected.filter((item) => item.name !== option.name));
    } else {
      // Select the option
      onChange([...selected, option]);
    }
  };

  const selectAll = () => {
    if (selected.length === options.length) {
      onChange([]); // Deselect all
    } else {
      onChange(options); // Select all
    }
  };

  const isAllSelected = selected.length === options.length;

  const compClass = classNames({
    "mb-4 bg-[#323639] p-2 border border-[rgba(255,255,255,0.2)] rounded-[5px] cursor-pointer": true,
    ["py-2 text-sm/[1.125rem]"]: !size,
    [`${className}`]: className,
  });

  return (
    <div className={compClass}>
      <label className="block text-[rgba(255,255,255,0.5)] text-xs mb-1">{Name}</label>
      <div onClick={toggleDropdown} className="flex justify-between items-center">
        <span className="text-white text-sm truncate max-w-full">
          {selected.length > 1
            ? selected[0].name + ', ...'
            : selected.length > 0
              ? selected[0].name
              : 'Select'}
        </span>
        <ChevronDownIcon className={`h-4 w-4 text-white transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </div>

      {isOpen && (
        <div className="bg-[#323639] pl-2 pt-2 rounded-[5px] w-full lg:w-64">
          {/* Select/Deselect All */}
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={selectAll}
              className="form-checkbox text-[#8B60B2] h-4 w-4"
            />
            <label className="ml-2 text-white text-sm">All</label>
          </div>
          <hr className="border-gray-600 mb-2" />

          {/* Options */}
          <div className="space-y-2 overflow-y-auto max-h-60">
            {options.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selected.some((selectedOption) => selectedOption.name === option.name)}
                  onChange={() => handleOnChange(option)}
                  className="form-checkbox text-[#8B60B2] h-4 w-4 outline-none focus:ring-0"
                />
                <label className="ml-2 text-white text-sm">{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
