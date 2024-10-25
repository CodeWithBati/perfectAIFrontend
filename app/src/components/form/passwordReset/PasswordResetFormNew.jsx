'use client';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Input from '../Input';
import Label from '../Label';

import Link from 'next/link';
import Image from "next/image";
import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';
import SideBar from '../SideBar';
import AuthFooter from '../AuthFooter';
import Button from '../Button';
import InputNew from '../InputNew';

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
        router.push('/forget-password-success', { scroll: false });
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

      <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">

        <SideBar />

        {/* Right Side with Sign-Up Options */}
        <div className="relative z-10 lg:w-2/3 w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
          {/* Top Part (Logo and Sign Up Buttons) */}
          <Link href='/' className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
            <Image
              alt="website Logo"
              src={"/images/defaulticon4.png"}
              width={40}
              height={40}
              className="mx-auto rounded-[6.5px] mr-[10px]"
            /> myPerfectAI
          </Link>

          <div className="space-y-8 text-center flex flex-col justify-center items-center">
            <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-0 lg:mb-8">Forget Password?</h2>
            <p className='text-white text-sm lg:text-lg w-full lg:w-[550px] lg:font-semibold mb-6'>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
            <div className="space-y-[20px] w-full flex flex-col items-center">
              {/* Email Input with Floating Label */}
              <div className="relative w-full lg:w-[370px]">
                <InputNew
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  onBlur={() => handleBlur('email')}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSubmit(e);
                    }
                  }}
                  error={errors.email}
                  label="EMAIL ADDRESS"
                  className="mb-4"
                  labelClassName="text-[rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} variant="primary" size="small">
              Send Reset Instructions
            </Button>
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

export default PasswordResetForm;
