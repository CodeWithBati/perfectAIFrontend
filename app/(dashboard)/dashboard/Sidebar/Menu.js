'use client';
import React, { useEffect } from 'react';
import MenuItem from './MenuItem';
import Link from 'next/link';
import clsx from 'clsx';

const menuData = [
  {
    icon: null,
    text: 'Dashboard',
    link: '/dashboard',
  },
  {
    icon: null,
    text: 'Directories Manager',
    link: '/dashboard/directories',
  },
];
function Menu({ className }) {
  let menuToggle = function (e) {
    e.preventDefault();
  };
  const compClass = clsx({
    ['relative py-0.5 menu-item group px-6']: true,
    [`${className}`]: className,
  });
  const linkClass = clsx({
    'rounded-md flex items-center gap-x-3 transition-all text-slate-500 group-[.is-active>]:text-blue-600 hover:text-blue-600 menu-link': true,
    [`px-3 py-2 hover:bg-blue-100 group-[.is-active>]:bg-blue-100`]: true,
    [`${className}`]: className,
  });
  return (
    <>
      <ul className='py-3 menu-base'>
        {menuData.map((item, index) => (
          <React.Fragment key={index}>
            {item.heading && (
              <h6 className='px-6 pt-5 pb-2 text-xs uppercase text-slate-500'>
                {item.heading}
              </h6>
            )}

            <li className={compClass}>
              <>
                <Link href={item.link} className={linkClass}>
                  {item.icon && (
                    <div className='h-6 w-6 flex-shrink-0 grayscale-[50%] group-[.is-active]:grayscale-0'>
                      {icon}
                    </div>
                  )}
                  <span className={`pe-2 text-md font-medium`}>
                    {item.text}
                  </span>
                </Link>
              </>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

export default Menu;
