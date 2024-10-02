'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuData } from '@/app/src/data/menuData';

function Menu({ className }) {
  const compClass =
    `flex flex-row xl:items-center gap-x-3 lg:gap-x-6 lg:px-6 px-2` + ` ${className} `;

  return (
    <>
      <ul className={`${compClass} flex `}>
        {menuData.map((item, index) => (
          <MenuItem text={item.text} link={item.link} key={index} />
        ))}
      </ul>
    </>
  );
}

export default Menu;

function MenuItem({ text, link }) {
  const pathname = usePathname();
  const activeClass =
    pathname === link ? 'text-slate-100 border-b-2 border-slate-100' : '';
  const compClass = `flex items-center gap-x-2 hover:border-b-2 border-slate-200 transition-all text-slate-600 ${activeClass} hover:text-slate-700 hover:dark:text-slate-100`;

  return (
    <li className={compClass}>
      <Link href={link}>{text}</Link>
    </li>
  );
}
