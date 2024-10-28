'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';

import Link from 'next/link';

import Image from "next/image";

import ReactCodeInput from 'react-code-input';

import Label from '../Label';
import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';
import CountdownTimer from '../../global/CountdownTimer';
import AuthFooter from '../AuthFooter';
import SideBar from '../SideBar';
import Button from '../Button';

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
      <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">

        <SideBar />
        <div className="relative z-10 lg:w-[60%] w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
          <Link href='/' className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
            <Image
              alt="website Logo"
              src={"/images/Profile_logo.png"}
              width={170}
              height={40}
              className="mx-auto rounded-[6.5px] mr-[10px] w-[190px] h-[100%]"
            />
          </Link>

          <div className="space-y-4 text-center w-full lg:w-auto flex flex-col items-center">
            <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Verify Your Account</h2>
            <ReactCodeInput
              fields={6}
              type='text'
              name='code'
              value={code}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (!/^\d$/.test(e.key)) {
                  e.preventDefault();
                } else if (e.key === "Enter" && !e.shiftKey) {
                  handleSubmit(e);
                }
              }}
              inputStyle={{
                color: 'white',
                borderRadius: '5px',
                border: '1px solid [rgba(255,255,255,0.2)]',
                margin: '2px',
                width: '50px',
                height: '60px',
                fontSize: '20px',
                textAlign: 'center',
                backgroundColor: '#323639'
              }}
            />

            {/* Confirm Button */}
            <Button onClick={handleSubmit} variant="primary" size="small">
              Confirm
            </Button>

            <p className="text-white text-sm mt-8">
              Don&apos;t received any email?{' '}
              <br className='lg:hidden' />
              <span onClick={handleResendEmail} className="text-additional-purple underline cursor-pointer">Resend code</span>{' '} | {' '}
              <Link href="/register" className="text-additional-purple underline">Change email address</Link>
            </p>
          </div>

          <div className="block lg:hidden text-center text-white mt-20 mb-12">
            <p className="bg-main-purple text-xs px-[10px] py-[5px] mb-4 font-semibold inline-block rounded-[5px]">DID YOU KNOW?</p>
            <h1 className="text-lg font-bold mb-4">AI can improve customer service</h1>
            <p className="text-xs">
              AI-powered chatbots and virtual assistants can improve customer service by providing quick and accurate responses to customer inquiries.
            </p>
          </div>
          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
