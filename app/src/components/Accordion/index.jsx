import React from 'react';
import clsx from 'clsx';
import {
  useAccordion,
  useAccordionProvider,
  AccordionProvider,
  AccordionItem as Item,
} from '@szhsin/react-accordion';

function Accordion({ className, children }) {
  const providerValue = useAccordionProvider({
    transition: true,
    transitionTimeout: 200,
  });
  const { accordionProps } = useAccordion();

  const compClass = clsx({
    [`${className}`]: className,
  });
  return (
    <AccordionProvider value={providerValue}>
      <div className={compClass} {...accordionProps}>
        {children}
      </div>
    </AccordionProvider>
  );
}

export default Accordion;

function AccordionItem({
  header,
  buttonClass,
  buttonActiveClass,
  panelClass,
  className,
  size,
  ...rest
}) {
  const btnClass = clsx({
    'flex justify-between items-center w-full text-slate-600 dark:text-slate-200 font-bold text-start': true,
    'py-3 px-4': !size,
    'py-4 px-6': size === 'lg',
    [`${buttonClass}`]: buttonClass,
  });
  const btnActiveClass = clsx({
    [`${buttonActiveClass}`]: buttonActiveClass,
  });
  const pnlClass = clsx({
    'text-slate-500 text-base': true,
    'px-4 pb-4': !size,
    'px-6 pb-5': size === 'lg',
    [`${panelClass}`]: panelClass,
  });
  const mainClass = clsx({
    [`${className}`]: className,
  });
  return (
    <Item
      {...rest}
      header={({ state: { isEnter } }) => (
        <>
          {header}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
            className={`h-2.5 ms-2 transition-all ${isEnter && 'rotate-180'}`}
          >
            <path
              fill='currentColor'
              d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z'
            />
          </svg>
        </>
      )}
      className={mainClass}
      buttonProps={{
        className: ({ isEnter }) => `${btnClass} ${isEnter && btnActiveClass}`,
      }}
      contentProps={{
        className: 'transition-height duration-200 ease-in-out',
      }}
      panelProps={{ className: pnlClass }}
    />
  );
}

Accordion.Item = AccordionItem;
