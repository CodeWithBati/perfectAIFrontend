'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';

import ReactCodeInput from 'react-code-input';

import Label from '../Label';
import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';
import CountdownTimer from '../../global/CountdownTimer';

const VerifyEmail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const [code, setCode] = useState('');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    icon: null,
    severity: 'success',
  });

  const paragraphClass = 'text-slate-500 text-sm mb-1 py-3';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.email || !code) {
      console.error('Email and code are required.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`,
        {
          email: user?.email,
          code,
        }
      );

      if (response.status === 200) {
        dispatch(
          setUser({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
          })
        );

        Cookies.set('token', response.data.token, { expires: 35 });
        Cookies.set('user', JSON.stringify(response.data.user), {
          expires: 35,
        });
        
        router.push('/', { scroll: false });
      }
    } catch (error) {
      if (error.response.status === 404) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: 'error',
        });
      } else if (error.response.status === 400) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: 'error',
        });
      } else {
        setSnackbar({
          open: true,
          message: 'Something went wrong.',
          icon: <ErrorIcon />,
          severity: 'error',
        });
      }
    }
  };

  const handleChange = (value) => {
    setCode(value);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }));
  };

  useEffect(() => {
    if (snackbar.open) {
      const timer = setTimeout(() => {
        setSnackbar((prevSnackbar) => ({
          ...prevSnackbar,
          open: false,
        }));
      }, 6000);

      return () => clearTimeout(timer);
    }
  }, [snackbar.open]);

  const handleResendEmail = async () => {
    if (user.email) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification-email`,
          {
            email: user.email,
          }
        );

        if (response.status === 200) {
          setSnackbar({
            open: true,
            message: 'Email sent successfully!',
            icon: null,
            severity: 'success',
          });
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Something went wrong.',
          icon: <ErrorIcon />,
          severity: 'error',
        });
      }
    } else {
      setSnackbar({
        open: true,
        message: 'Email is required.',
        icon: <ErrorIcon />,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <SnackBar
        open={snackbar.open}
        icon={snackbar.icon}
        content={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
      <div className='flex justify-center -mx-3 w-[400px] md:w-[500px]'>
        <div className='w-full px-3'>
          <div className='bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-600 w-full p-6 pt-5'>
            <h3 className='text-2xl font-bold dark:text-white'>Verify Email</h3>
            <p className={paragraphClass}>
              Please enter the code below to confirm your email.
            </p>
            <form onSubmit={handleSubmit}>
              <div className='py-2'>
                <Label htmlFor='emial-address' className='mb-2'>
                  Code
                </Label>
                <div className='w-full text-center'>
                  <ReactCodeInput
                    fields={6}
                    type='text'
                    name='code'
                    value={code}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (!/^\d$/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    inputStyle={{
                      fontFamily: 'monospace',
                      borderRadius: '5px',
                      border: '1px solid #B8B8B8',
                      margin: '4px',
                      width: '45px',
                      height: '40px',
                      fontSize: '20px',
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>
              <div className='py-4'>
                <button className='w-full p-2 bg-blue-600 text-white hover:bg-blue-800'>
                  Confirm Email
                </button>
              </div>
            </form>
            <CountdownTimer handleResendEmail={handleResendEmail} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
