'use client';

const SnackBar = ({ icon, content, onClose, severity, open }) => {
  let bgColorClass, textColorClass;

  switch (severity) {
    case 'success':
      bgColorClass = 'bg-white';
      textColorClass = 'text-green-500';
      break;
    case 'error':
      bgColorClass = 'bg-white';
      textColorClass = 'text-red-500 font-extrabold	';
      break;
    default:
      bgColorClass = 'bg-white';
      textColorClass = 'text-gray-500';
  }

  return open ? (
    <div
      id='toast-success'
      className='fixed bottom-20 left-0 right-0 flex justify-center items-center z-40'
    >
      <div
        className={`flex items-center w-full max-w-xs p-4 mb-4 ${textColorClass} ${bgColorClass} rounded-lg shadow`}
        role='alert'
      >
        <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg'>
          {icon}
          <span className='sr-only'>Check icon</span>
        </div>
        <div className='ml-3 text-sm font-normal'>{content}</div>
        <button
          type='button'
          className='ml-auto -mx-1.5 -my-1.5 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 '
          data-dismiss-target='#toast-success'
          onClick={onClose}
          aria-label='Close'
        >
          <span className='sr-only'>Close</span>
          <svg
            className='w-3 h-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
};

export default SnackBar;
