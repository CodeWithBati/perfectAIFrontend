import React, { Fragment } from "react";
import classNames from "classnames";
import { Switch as SwitchComponent } from "@headlessui/react";

function Switch({
  className,
  label,
  name,
  size,
  note,
  noteClass,
  checked,
  onChange,
  disabled,
}) {
  const compClass = classNames({
    relative: true,
    [className]: className,
  });

  const noteElmClass = classNames({
    "text-xs text-slate-500 dark:text-slate-300": true,
    "ps-14 pt-0.5": !size,
    "ps-12 pt-1": size === "sm",
    [noteClass]: noteClass,
  });

  const btnClass = classNames({
    "relative inline-flex items-center rounded-full focus-visible:outline-none": true,
    "bg-blue-500": checked && !disabled,
    "bg-slate-200 dark:bg-slate-700": !checked && !disabled,
    "bg-gray-400 dark:bg-gray-600": disabled, // Disabled state background color, muted
    "h-6 w-11": !size,
    "h-5 w-9": size === "sm",
  });

  const dotClass = classNames({
    "inline-block rounded-full bg-white dark:bg-slate-950 transition-[all] absolute": true,
    "start-5": checked,
    "start-1": !checked, // maintains position for 'off' state
    "bg-white dark:bg-white": !disabled, // Normal state dot color
    "bg-gray-200 dark:bg-gray-700": disabled, // Disabled state dot color, muted
    "h-4 w-4": !size,
    "h-3 w-3": size === "sm",
  });

  return (
    <div className={compClass}>
      <SwitchComponent.Group as="div" className="flex">
        <SwitchComponent
          name={name}
          checked={checked}
          as={Fragment}
          onChange={onChange}
          disabled={disabled}
        >
          {({ checked }) => (
            <button className={btnClass} disabled={disabled}>
              <span className={dotClass} />
            </button>
          )}
        </SwitchComponent>
        {label && (
          <SwitchComponent.Label
            className={classNames(
              "inline-flex font-medium text-sm ps-3 cursor-pointer",
              {
                "text-slate-600 dark:text-slate-200": !disabled,
                "text-slate-600 dark:text-slate-400": disabled, // Disabled state label color
              }
            )}
          >
            {label}
          </SwitchComponent.Label>
        )}
      </SwitchComponent.Group>
      {note && <div className={noteElmClass}>{note}</div>}
    </div>
  );
}

export default Switch;
