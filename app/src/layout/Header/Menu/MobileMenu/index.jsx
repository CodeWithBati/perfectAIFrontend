import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";


import { menuData } from '@/app/src/data/menuData';
import { useEffect } from 'react';

const MobileMenu = ({ setMenuVisibility }) => {
  const user = useSelector((state) => state.auth.user);
  const filteredMenuData = user ? menuData.filter(item => item.text !== 'Login') : menuData;

  return (
    <nav
      id='sidenav-1'
      className="absolute left-0 top-0 z-40 h-full w-60 py-6 -translate-x-full overflow-hidden text-white data-[te-sidenav-hidden='false']:translate-x-0 bg-gradient-to-r from-indigo-500 to-blue-500"
      data-te-sidenav-init
      onClick={(e) => {
        e.stopPropagation();
      }}
      data-te-sidenav-hidden='false'
      data-te-sidenav-position='absolute'
    >
      <ul className='flex flex-col mx-auto px-auto' data-te-sidenav-menu-ref>
        <div className='relative px-6 py-8'>
          <h3 className='flex-shrink-0 text-xl font-bold tracking-widest'>
            MyPerfectAI
          </h3>
        </div>
        {filteredMenuData.map((item, index) => (
          <li className='relative' key={index}>
            <Link
              href={item.link}
              className='flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-white outline-none transition duration-300 ease-linear hover:bg-slate-50 hover:text-slate-600 hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none'
              data-te-sidenav-link-ref
              onClick={() => setMenuVisibility(false)}
            >
              <span className='mr-4'>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileMenu;
