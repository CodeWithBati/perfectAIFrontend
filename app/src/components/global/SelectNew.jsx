'use client';

import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';

function SelectNew({
  size,
  className,
  options,
  selected,
  onChange,
  id,
  label,
  disabled,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Toggle dropdown open state
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  // Handle selecting an option
  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const compClass = classNames(
    'bg-[#323639] rounded-md border border-[rgba(255,255,255,0.2)] p-2',
    className
  );

  return (
    <div className={compClass}>
      {label && (
        <label
          className="block text-[rgba(255,255,255,0.5)] text-xs mb-1"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div
        className="relative"
        ref={selectRef}
      >
        <button
          type="button"
          className="w-full bg-[#323639] border-none text-white rounded-md focus:outline-none focus:ring-0 cursor-pointer flex justify-between items-center"
          onClick={toggleDropdown}
          disabled={disabled}
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className="text-white text-sm truncate max-w-full text-left">
            {selected?.name || 'Select'}
          </span>
          {/* Custom Arrow */}
          <svg
            className={`h-2 w-2 text-white transform transition-transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 4.25L3.75 0.5L7.5 4.25V5H0V4.25Z"
              fill="white"
            />
          </svg>
        </button>

        {isOpen && (
          <ul
            className="absolute z-50 mt-1 w-full bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-md max-h-60 overflow-auto sm:top-full sm:bottom-auto bottom-[100%]"
            role="listbox"
            aria-activedescendant={selected?.name}
          >
            {options.map((option, index) => (
              <li
                key={index}
                id={option.name}
                role="option"
                aria-selected={selected?.name === option.name}
                className={`p-2 text-white text-sm cursor-pointer hover:bg-[#8B60B2] ${
                  selected?.name === option.name ? 'bg-[#8B60B2]' : ''
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SelectNew;
