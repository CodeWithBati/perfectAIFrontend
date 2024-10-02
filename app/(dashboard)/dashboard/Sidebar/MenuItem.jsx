import clsx from 'clsx';
import Link from 'next/link';

function MenuItem({
  className,
  icon,
  text,
  link,
  sub,
  dropdown,
  onClick,
  ...props
}) {
  const compClass = clsx({
    ['relative py-0.5 menu-item group']: true,
    ['has-sub']: sub,
    ['px-3']: !dropdown,
    [`${className}`]: className,
  });
  const linkClass = clsx({
    'rounded-md flex items-center gap-x-3 transition-all text-slate-500 group-[.is-active>]:text-blue-600 hover:text-blue-600 menu-link': true,
    [`px-3 py-2 hover:bg-blue-100 group-[.is-active>]:bg-blue-100`]: !dropdown,
    [`px-3 py-1`]: dropdown,
    [`has-toggle`]: sub,
    [`${className}`]: className,
  });
  const dropdownClass = clsx({
    ['ps-9 hidden sub-menu']: true,
    [`${className}`]: className,
  });
  return (
    <li className={compClass}>
      <>
        <Link href={link} className={linkClass} onClick={onClick}>
          {icon && (
            <div className='h-6 w-6 flex-shrink-0 grayscale-[50%] group-[.is-active]:grayscale-0'>
              {icon}
            </div>
          )}
          <span
            className={`pe-2 text-sm font-medium ${
              dropdown ? 'text-xs' : 'text-sm'
            }`}
          >
            {text}
          </span>
        </Link>
      </>
    </li>
  );
}

export default MenuItem;
