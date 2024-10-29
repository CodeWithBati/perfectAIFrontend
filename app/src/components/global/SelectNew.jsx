"use client";

import React from "react";
import classNames from "classnames";

function SelectNew({ size, className, options, selected, onChange, id, label, disabled }) {
  // Handle changes when selecting an option
  const handleChange = (e) => {
    const selectedOption = options.find(option => option.name === e.target.value);
    onChange(selectedOption);
  };

  const compClass = classNames({
    "bg-[#323639] rounded-md border border-[rgba(255,255,255,0.2)] p-2": true,
    [`${className}`]: className,
  });

  return (
    <div className={compClass}>
      <label className="block text-[rgba(255,255,255,0.5)] text-xs" htmlFor={id}>
        {label}
      </label>
      <select 
        className="w-full p-0 bg-[#323639] border-none text-white rounded-md focus:outline-none focus:ring-0 appearance-none cursor-pointer"
        onChange={handleChange}
        disabled={disabled}
        value={selected?.name || ""} // Set the selected value
        id={id}
      >
        <option value="" disabled>Select</option>
        {options.map((option, index) => (
          <option 
            value={option.name} 
            key={index}
            className="bg-[#323639] text-white hover:bg-[#e1e1e1]"
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectNew;
