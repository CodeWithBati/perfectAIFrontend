import React from 'react';
import clsx from 'clsx';

const Label = ({ children, htmlFor, className }) => {
  const compClass = clsx({
    'inline-flex font-bold text-sm text-slate-500 cursor-pointer': true,
    [className]: className,
  });
  return (
    <>
      {htmlFor ? (
        <label htmlFor={htmlFor} className={compClass}>
          {children}
        </label>
      ) : (
        <h6 className={compClass}>{children}</h6>
      )}
    </>
  );
};

export default Label;
