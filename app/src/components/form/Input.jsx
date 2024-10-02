import React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef(
  (
    {
      defaultValue,
      id,
      name,
      value,
      placeholder,
      type,
      className,
      size,
      maxLength,
      max,
      min,
      disabled,
      onChange,
      onBlur,
      start,
      end,
      error,
      required,
      onKeyDown
    },
    ref
  ) => {
    const compClass = clsx({
      'z-10 w-full rounded-md text-sm/[1.125rem] p-3 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 placeholder:text-slate-400 placeholder:dark:text-slate-500 border border-slate-200 dark:border-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-2 focus:border-blue-400 focus:shadow-none focus:outline-none': true,
      'py-2 text-sm': !size,
      'rounded-s-none': start,
      'rounded-e-none': end,
      'border-red-500': error,
      [className]: className,
    });

    return (
      <div className='relative flex flex-col isolate w-full gap-1'>
        <div className='relative flex isolate w-full'>
          {start && (
            <div className='rounded-s-md border-2 border-e-0 px-3 inline-flex items-center text-sm text-slate-500 bg-slate-100 border-slate-200'>
              {start}
            </div>
          )}
          <input
            ref={ref}
            className={compClass}
            type={type ? type : 'text'}
            placeholder={placeholder && placeholder}
            id={id && id}
            name={name && name}
            value={value && value}
            maxLength={maxLength && maxLength}
            max={max && max}
            min={min && min}
            defaultValue={defaultValue && defaultValue}
            disabled={disabled && 'disabled'}
            onChange={onChange}
            onBlur={onBlur}
            required={required && required}
            onKeyDown={onKeyDown}
          />
          {end && (
            <div className='rounded-e-md border-2 px-3 inline-flex items-center text-sm text-slate-500 bg-slate-100 border-slate-400'>
              {end}
            </div>
          )}
        </div>
        {error && <div className='text-red-500 text-sm ml-1'>{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
