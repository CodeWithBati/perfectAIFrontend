import React from 'react';
import clsx from 'clsx';

const InputNew = React.forwardRef(
  (
    {
      id,
      name,
      value,
      placeholder,
      type = 'text', // Default to 'text'
      className,
      error,
      required,
      onChange,
      onBlur,
      label,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={clsx("block w-full h-[56px] px-[15px] pt-[20px] pb-[8px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] transition-all appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer", {
            'border-red-500': error,
          }, className)} // Add custom class names
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={() => {
            setIsFocused(false);
            onBlur && onBlur();
          }}
          onFocus={() => setIsFocused(true)}
          required={required}
          placeholder=""
          {...props}
        />
        {label && (
          <label
            htmlFor={id}
            className={clsx("absolute text-sm left-3 transition-all", {
              'top-4 text-gray-400 scale-100': !isFocused && !value,
              'top-1 text-xs text-gray-300 scale-90': isFocused || value,
            }, labelClassName)} // Add custom label class names
          >
            {console.log(isFocused, value)}
            {label}
          </label>
        )}
        {error && <div className="text-red-500 text-sm mt-1 text-left">{error}</div>}
      </div>
    );
  }
);

InputNew.displayName = 'InputNew';

export default InputNew;
