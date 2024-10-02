import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';

function Button({
  children,
  size,
  block,
  pill,
  className,
  tagName,
  as,
  to,
  href,
  onClick,
}) {
  const compClass = clsx({
    'inline-flex justify-center items-center font-medium transition-all': true,
    'text-sm px-5 py-2 gap-3': !size,
    'text-xs px-3 py-2 gap-3': size == 'sm',
    'w-full': block,
    'rounded-full': pill,
    ['rounded-md']: !pill,
    [`${className}`]: className,
  });
  return tagName ? (
    <tagName onClick={onClick} className={compClass}>
      {children}
    </tagName>
  ) : as === 'Link' ? (
    <Link className={compClass} href={to}>
      {children}
    </Link>
  ) : href ? (
    <a onClick={onClick} className={compClass} href={href}>
      {children}
    </a>
  ) : (
    <button onClick={onClick} className={compClass}>
      {children}
    </button>
  );
}

export default Button;
