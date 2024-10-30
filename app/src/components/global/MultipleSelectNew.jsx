import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames";

const MultipleSelect = ({
  size,
  className,
  options,
  selected,
  onChange,
  Name,
  id,
  disabled,
  showSelectAll = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleOnChange = (option) => {
    if (
      selected.some((selectedOption) => selectedOption.name === option.name)
    ) {
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

  const compClass = classNames(
    "bg-[#323639] p-2 border border-[rgba(255,255,255,0.2)] rounded-[5px] cursor-pointer relative",
    { "py-2 text-sm/[1.125rem]": !size },
    className
  );

  return (
    <div className={compClass} ref={dropdownRef}>
      <label
        className="block text-[rgba(255,255,255,0.5)] text-xs mb-1"
        htmlFor={id}
      >
        {Name}
      </label>
      <div
        onClick={toggleDropdown}
        className="flex justify-between items-center"
      >
        <span className="text-white text-sm truncate max-w-full">
          {selected.length > 1
            ? selected[0].name + ", ..."
            : selected.length > 0
            ? selected[0].name
            : "Select"}
        </span>
        {/* Custom SVG Icon with Rotation */}
        <svg
          className={`h-2 w-2 text-white transform transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          width="8"
          height="5"
          viewBox="0 0 8 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 4.25L3.75 0.5L7.5 4.25V5H0V4.25Z" fill="white" />
        </svg>
      </div>

      {isOpen && (
        <div
          className="
            absolute z-50 bg-[#323639] pl-2 pt-2 rounded-[5px] w-full lg:w-64
            bottom-[100%] mb-2
            sm:top-full sm:bottom-auto sm:mt-2 sm:mb-0
          "
        >
          {/* Conditionally render Select/Deselect All */}
          {showSelectAll && (
            <>
              <label className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  id={`select-all-${id}`}
                  checked={isAllSelected}
                  onChange={selectAll}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 bg-transparent border border-white peer-checked:bg-[#8B60B2] peer-checked:border-transparent relative flex items-center justify-center">
                  {/* Checkmark Icon */}
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.485 3.515a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.415 0L2.515 8.514a1 1 0 111.415-1.414L6 9.17l6.07-6.07a1 1 0 011.415 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-white text-sm">
                  All
                </span>
              </label>
              <hr className="border-gray-600 mb-2" />
            </>
          )}

          {/* Options */}
          <div className="space-y-2 overflow-y-auto max-h-60">
            {options.map((option, index) => (
              <label key={index} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id={`checkbox-${id}-${index}`}
                  checked={selected.some(
                    (selectedOption) =>
                      selectedOption.name === option.name
                  )}
                  onChange={() => handleOnChange(option)}
                  className="sr-only peer"
                />
                <div className="w-4 h-4 bg-transparent border border-white peer-checked:bg-[#8B60B2] peer-checked:border-transparent relative flex items-center justify-center">
                  {/* Checkmark Icon */}
                  <svg
                    className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.485 3.515a1 1 0 010 1.414l-7.07 7.07a1 1 0 01-1.415 0L2.515 8.514a1 1 0 111.415-1.414L6 9.17l6.07-6.07a1 1 0 011.415 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="ml-2 text-white text-sm">
                  {option.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleSelect;
