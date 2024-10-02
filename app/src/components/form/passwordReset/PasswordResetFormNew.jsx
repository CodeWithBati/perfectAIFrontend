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

      <div className="flex h-screen bg-[#181C1F]">
        {/* Left Side with AI Info */}
        <div className="w-1/3 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/images/auth_bg.png')" }}>
          <div className="text-center text-white px-8">
            <p className="bg-main-purple text-xs px-[10px] py-[5px] mb-4 font-semibold inline-block rounded-[5px]">DID YOU KNOW?</p>
            <h1 className="text-[32px] font-bold mb-4">AI can improve customer service</h1>
            <p className="text-lg">
              AI-powered chatbots and virtual assistants can improve customer service by providing quick and accurate responses to customer inquiries.
            </p>
          </div>
        </div>

        {/* Right Side with Sign-Up Options */}
        <div className="w-2/3 h-screen bg-dark-bg flex flex-col justify-between items-center">
            {/* Top Part (Logo and Sign Up Buttons) */}
            <p className='flex text-white text-center items-center justify-center mt-[68px] mb-8 font-bold text-2xl'>
              <Image
                alt="website Logo"
                src={"/images/defaulticon4.png"}
                width={40}
                height={40}
                className="mx-auto rounded-[6.5px] mr-[10px]"
              /> myPerfectAI
            </p>

            <div className="space-y-8 text-center flex flex-col justify-center items-center">
              <h2 className="text-white text-5xl font-bold">Forget Password?</h2>
              <p className='text-white text-lg w-[550px] font-semibold mb-6'>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
              <div className="space-y-[20px]">
                {/* Email Input with Floating Label */}
                <div className="relative w-[370px]">
                  <input
                    type="email"
                    id="email"
                    placeholder=" "
                    className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                  >
                    EMAIL ADDRESS
                  </label>
                </div>
              </div>

              <button className="bg-main-purple text-sm font-semibold text-white rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
                Send Reset Instructions
              </button>
            </div>

            {/* Bottom Links */}
            <div className="text-center mb-8 text-white font-semibold flex justify-center space-x-4 text-xs">
              <p className="text-xs">
                © 2024. Crafted By <Link href="/" className="text-additional-purple underline">MyPerfectAI</Link>
              </p>
              <Link href="#" className="text-white text-xs mt-0">Privacy Policy</Link>
              <Link href="#" className="text-white text-xs mt-0">Terms and Conditions</Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default PasswordResetForm;
