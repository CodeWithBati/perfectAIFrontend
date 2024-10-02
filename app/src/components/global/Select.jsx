"use client";

import React, { useState } from "react";
import classNames from "classnames";
import { Listbox } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Select({ size, className, options, selected, onChange, id }) {

  const compClass = classNames({
    "flex w-full rounded-md text-start bg-white dark:bg-slate-950 border px-3 text-slate-600 dark:text-slate-200 border-slate-200 dark:border-slate-800 focus:border-slate-200 focus:shadow-none focus:outline-none": true,
    ["py-2 text-sm/[1.125rem]"]: !size,
    [`${className}`]: className,
  });
  if (selected === undefined) {
    selected = options[0];
  }

  return (
    <div className="relative">
      <Listbox value={selected} onChange={onChange}>
        <Listbox.Button className={compClass} id={id}>
          <span className="block truncate">
            {selected.name.length !== 0 ? selected.name : "Select"}
          </span>
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
                `text-sm font-medium px-3 py-1.5 cursor-pointer transition-all hover:bg-blue-200 hover:text-blue-500 hover:dark:text-blue-800 ui-disabled:bg-slate-100 ui-disabled:text-slate-300  ${
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
