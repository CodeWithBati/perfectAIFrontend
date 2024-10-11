import React from 'react';
import clsx from 'clsx';

const Button = React.forwardRef(
  (
    {
      children,
      onClick,
      variant = 'primary', // 'primary' or 'secondary'
      size = 'full', // 'full' or 'small'
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'font-semibold rounded-[5px] px-[20px] py-[10px] transition-all';
    const primaryStyles = clsx({
      'bg-[#8B60B2] text-white hover:bg-[#62358B] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]': variant === 'primary' && !disabled,
      'bg-[#4E2672]': variant === 'primary' && disabled,
      'opacity-50 cursor-not-allowed': disabled,
    });
    
    const secondaryStyles = clsx({
      'border border-[rgba(255,255,255,0.2)] bg-[#1E1E1E] text-white hover:bg-[#323639] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]': variant === 'secondary' && !disabled,
      'bg-[#323639]': variant === 'secondary' && disabled,
      'opacity-50 cursor-not-allowed': disabled,
    });

    const sizeStyles = clsx({
      'w-full': size === 'full',
      'w-full lg:w-auto': size === 'small',
    });

    return (
      <button
        ref={ref}
        onClick={!disabled ? onClick : null}
        className={clsx(baseStyles, variant === 'primary' ? primaryStyles : secondaryStyles, sizeStyles, className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
