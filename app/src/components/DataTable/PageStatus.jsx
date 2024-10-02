import React from 'react';

function PageStatus({ table }) {
  
  return (
    <span className='flex items-center gap-1 text-sm text-slate-500 dark:text-slate-300'>
      <div>Showing</div>
      <strong className='text-slate-600 dark:text-slate-200'>
        {table.getState().pagination.pageSize *
          (table.getState().pagination.pageIndex + 1 - 1) +
          1}
      </strong>{' '}
      -{' '}
      <strong className='text-slate-600 dark:text-slate-200'>
        {table.getFilteredRowModel().rows.length >
        table.getState().pagination.pageSize *
          (table.getState().pagination.pageIndex + 1)
          ? table.getState().pagination.pageSize *
            (table.getState().pagination.pageIndex + 1)
          : table.getFilteredRowModel().rows.length}{' '}
      </strong>
      of{' '}
      <strong className='text-slate-600 dark:text-slate-200'>
        {table.getFilteredRowModel().rows.length}
      </strong>{' '}
      results
    </span>
  );
}

export default PageStatus;
