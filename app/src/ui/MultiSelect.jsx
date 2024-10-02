import React, { useState } from "react";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Mult({ size, className, options, selected, onChange, id }) {
  const compClass = classNames({
    "flex w-full rounded-md text-start bg-white dark:bg-slate-950 border px-3 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-slate-200 focus:shadow-none focus:outline-none":
      true,
    ["py-2 text-sm/[1.125rem]"]: !size,
    [`${className}`]: className,
  });

  const [selectedOptions, setSelectedOptions] = useState(selected || []);

  const handleOptionSelection = (option) => {
    const optionIndex = selectedOptions.findIndex((selectedOption) => selectedOption.id === option.id);
    if (optionIndex > -1) {
      // If the option is already selected, remove it from the selectedOptions array
      const updatedOptions = [...selectedOptions];
      updatedOptions.splice(optionIndex, 1);
      setSelectedOptions(updatedOptions);
    } else {
      // If the option is not selected, add it to the selectedOptions array
      setSelectedOptions([...selectedOptions, option]);
    }

    // Call the onChange callback with the updated selectedOptions array
    onChange && onChange([...selectedOptions, option]);
  };

  return (
    <div className="relative">
      <Listbox value={selectedOptions} onChange={handleOptionSelection} multiple>
        <Listbox.Button className={compClass} id={id}>
          <span className="block truncate">{selectedOptions.length > 0 ? selectedOptions.map((option) => option.name).join(', ') : 'Select'}</span>
          <span className="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-3">
            <ChevronDownIcon className="h-4 w-4 text-gray-400 dark:text-gray-300 transition-all ui-open:rotate-180" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 w-full rounded-md z-10 max-h-80 overflow-y-auto">
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={option}
              disabled={option.disabled && option.disabled}
              className={({ selected }) =>
                `text-sm font-medium px-3 py-1.5 cursor-pointer transition-all hover:bg-blue-200 hover:text-blue-500 ui-disabled:bg-slate-100 ui-disabled:text-slate-300  ${
                  selected
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "text-slate-600 dark:text-slate-200"
                }`
              }
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
}

export default Select;
