'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Label from '../Label';
import Input from '../Input';

import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';
// import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';
import { toast } from 'react-hot-toast';

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    if (name === 'email') {
      validateField(name, value, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email');
    } else if (name === 'password') {
      validateField(name, value, /^(?=.{8,})/, 'Password');
    } else {
      validateField(name, value, null, null);
    }
  };

  const validateField = (name, value, regex, fieldName) => {
    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${fieldName} is required`,
      }));
    } else if (regex && !regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `Invalid ${fieldName} format`,
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    if (field === 'email') {
      validateField(
        field,
        formData[field],
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Email'
      );
    } else if (field === 'password') {
      validateField(field, formData[field], /^(?=.{8,})/, 'Password');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        JSON.stringify({
          email,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        if (response.data.email_verified === false) {
          dispatch(
            setUser({
              user: response.data.user,
              isAuthenticated: false,
            })
          );
          router.push('/verify-email', { scroll: false });
        } else {
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

          setFormData({
            email: '',
            password: '',
          });

          setErrors({
            email: '',
            password: '',
          });
          router.push('/', { scroll: false });
        }
      }
    } catch (error) {
      console.log(error)
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Something went wrong...')
      }
    }
  };

  return (
    <>
      <div className='flex justify-center -mx-3 min-w-[400px] md:min-w-[500px]'>
        <div className='w-full px-3'>
          <div className='bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 w-full p-6 pt-5'>
            <form onSubmit={handleSubmit}>
              <div className='mb-2'>
                <h3 className='text-xl font-bold text-slate-700 dark:text-white mb-1'>Login</h3>
                <p className='text-sm text-slate-500 dark:text-slate-400'>With valid credentials</p>
              </div>
              <div className='py-3'>
                <Label htmlFor='emial-address' className='mb-2'>
                  Email Address
                </Label>
                <Input
                  placeholder='example@email.com'
                  id='emial-address'
                  type='email'
                  name='email'
                  onChange={(e) => handleChange(e)}
                  onBlur={() => handleBlur('email')}
                  error={errors.email}
                />
              </div>
              <div className='py-3'>
                <Label
                  htmlFor='password'
                  className='mb-2 justify-between w-full items-center'
                >
                  Password
                  <Link
                    className='text-xs text-blue-500 hover:text-blue-700'
                    href='/forget-password'
                  >
                    Forgot
                  </Link>
                </Label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  placeholder='password'
                  onChange={(e) => handleChange(e)}
                  onBlur={() => handleBlur('password')}
                  error={errors.password}
                />
              </div>
              <div className='py-4'>
                <button
                  className={`w-full p-2 ${
                    !formData.email || !formData.password
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-800'
                  } text-white`}
                  disabled={!formData.email || !formData.password}
                  type='submit'
                >
                  Account Login
                </button>
              </div>
            </form>
            <div className='py-4'>
              <p className='text-center text-sm text-slate-500 dark:text-slate-300'>
                Don&apos;t have an account?&nbsp;
                <Link
                  href='/register'
                  className='text-slate-600 dark:text-slate-300 underline hover:text-blue-400'
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
