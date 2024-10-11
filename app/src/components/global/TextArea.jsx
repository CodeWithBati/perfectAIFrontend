import React from 'react';
import clsx from 'clsx';

const TextArea = React.forwardRef(
  (
    {
      id,
      name,
      value,
      placeholder,
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
        <textarea
          ref={ref}
          className={clsx("block resize-none px-[15px] pt-[20px] pb-[8px] w-full h-[183px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] transition-all appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer", {
            'border-red-500': error,
          }, className)} // Add custom class names
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
            className={clsx("absolute text-sm transition-all left-3", {
              'top-4 text-gray-400 scale-100': !isFocused && !value,
              'top-1 text-xs text-gray-300 scale-90': isFocused || value,
            }, labelClassName)} // Add custom label class names
          >
            {label}
          </label>
        )}
        {error && <div className="text-red-500 text-sm mt-1 text-left">{error}</div>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;
