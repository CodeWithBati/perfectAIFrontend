'use client';
import Link from 'next/link';
import clsx from 'clsx';
import Menu from './Menu';
import SimpleBar from 'simplebar-react';
function Sidebar({ mobile, visibility, setVisibility, className }) {
  const compClass = clsx({
    'fixed 2xl:translate-x-0 start-0 top-0 border-e border-slate-200 bg-white z-[1000] w-64 min-h-screen flex-shrink-0': true,
    'transition-transform': mobile,
    [`${className}`]: className,
  });
  return (
    <>
      <div className={compClass}>
        <div className='flex px-6 py-4 border-b border-slate-200'>
          <Link href='/dashboard' className='inline-flex h-8'>
            MYPERFECTAI
          </Link>
        </div>
        <SimpleBar>
          <Menu />
        </SimpleBar>
      </div>
      {visibility && (
        <div
          onClick={() => {
            setVisibility(false);
          }}
          className='fixed inset-0 bg-slate-950 bg-opacity-50 z-[1019]'
        ></div>
      )}
    </>
  );
}

export default Sidebar;
