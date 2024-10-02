'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '../Input';
import Label from '../Label';
import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';

const PasswordResetForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
  });
  const [touched, setTouched] = useState({
    email: false,
  });
  const [errors, setErrors] = useState({
    email: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    icon: null,
    severity: 'success',
  });

  const paragraphClass = 'text-slate-500 text-sm mb-1 py-3';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    if (name === 'email') {
      validateEmail(value);
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateEmail(formData.email);
  };

  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
    } else if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid Format' }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || formData.email === '') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Email is required',
      }));
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        JSON.stringify({
          email: formData.email,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        router.push('/', { scroll: false });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: 'error',
        });
      } else if (error.response.status === 404) {
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
            <h3 className='text-2xl font-bold  dark:text-white '>Forgot Password?</h3>
            <p className={`${paragraphClass} dark:text-slate-300`}>
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className='py-2'>
                <Label htmlFor='email-address' className='mb-2'>
                  Email Address
                </Label>
                <Input
                  placeholder='example@email.com'
                  id='email-address'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  error={touched.email && errors.email}
                />
              </div>
              <div className='py-4'>
                <button
                  className={`w-full p-2 ${
                    !formData.email || errors.email
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-800'
                  } text-white`}
                  type='submit'
                  disabled={!formData.email || errors.email}
                >
                  Send Reset Instructions
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetForm;
