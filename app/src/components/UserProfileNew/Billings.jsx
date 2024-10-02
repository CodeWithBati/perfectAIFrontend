'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../global/Button';
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons';

const Billings = () => {
  return (
    <>
      <div className='p-4 xs:p-6'>
        <div className='mb-5 empty:mb-0'>
          <div className='flex items-center px-4 py-3 bg-sky-100 rounded-md'>
            <div className='bg-sky-400 p-2 rounded-full text-white'>
              {/* <ExclamationTriangleIcon className='h-4 w-4' /> */}
            </div>
            <div className='ps-3'>
              <h6 className='text-sm font-bold text-slate-700'>
                Attention Please!
              </h6>
              <p className='text-xs text-slate-600'>
                To start using our tools, please{' '}
                <button className='font-bold text-blue-500'>
                  Add Payment Method
                </button>
                .
              </p>
            </div>
            <button className='ms-auto text-sky-600'>
              {/* <XMarkIcon className='h-4 w-4' /> */}
            </button>
          </div>
        </div>
        <div className='flex flex-col'>
          <h6 className='text-xs font-bold text-slate-700 mb-3'>
            Current Package
          </h6>
          <div className='flex flex-wrap justify-between items-center border border-slate-200 px-5 py-4 rounded-md gap-3'>
            <div className=''>
              <h4 className='text-lg font-bold text-slate-600'>
                $14.59
                <span className='text-xs font-bold text-slate-400 ms-2'>
                  Per Month
                </span>
              </h4>
              <h3 className='text-xl font-bold text-slate-700 mb-1'>
                Premium Plan
              </h3>
              <p className='text-sm text-slate-500'>
                Next billing is on 10 Apr 2024
              </p>
            </div>
            <ul className='flex flex-wrap gap-3'>
              <li>
                <Button className='bg-slate-200 text-slate-600 hover:bg-rose-700 hover:text-white'>
                  Cancel Plan
                </Button>
              </li>
              <li>
                <Button className='bg-blue-600 text-white hover:bg-blue-800'>
                  Upgrade Plan
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Billings;
