import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
function ButtonIcon({
  children,
  size,
  circle,
  className,
  tagName,
  as,
  to,
  href,
  onClick,
}) {
  const compClass = clsx({
    'inline-flex justify-center items-center  rounded-full transition-all': true,
    'p-3': !size,
    'p-2': size === 'sm',
    'rounded-full': circle,
    ['rounded-md']: !circle,
    [`${className}`]: className,
  });
  return tagName ? (
    <tagName onClick={onClick} className={compClass}>
      {children}
    </tagName>
  ) : as === 'Link' ? (
    <Link className={compClass} href={to} passHref>
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

export default ButtonIcon;
