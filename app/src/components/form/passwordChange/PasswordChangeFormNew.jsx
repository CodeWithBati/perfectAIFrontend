'use client';

import { useCallback, useState } from 'react';
import Input from '../Input';
import Label from '../Label';
import Link from 'next/link';
import Image from "next/image";
import AuthFooter from '../AuthFooter';
import SideBar from '../SideBar';

const PasswordChangeForm = () => {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });

  const paragraphClass = 'text-slate-500 text-sm mb-1 py-3';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    validateField(name, value);
  };

  const validateField = useCallback(
    (field, value) => {
      const updatedErrors = { ...errors };

      switch (field) {
        case 'password':
          updatedErrors.password = !value
            ? 'Password is required'
            : value.length < 8
              ? 'Password must be at least 8 characters long'
              : '';
          break;
        case 'confirmPassword':
          updatedErrors.confirmPassword = !value
            ? 'Confirm Password is required'
            : value !== formData.password
              ? "Passwords don't match"
              : '';
          break;
        default:
          break;
      }

      setErrors(updatedErrors);
    },
    [errors, formData]
  );

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setErrors({
        password: 'Password is required.',
        confirmPassword: 'Password confirmation is required.',
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({
        password: 'Passwords do not match.',
        confirmPassword: 'Passwords do not match.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?key=${router.query.key}`,
        JSON.stringify({
          password,
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
      console.error('Error sending reset instructions:', error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">
      <SideBar />

      {/* Right Side with Sign-Up Options */}
      <div className="relative z-10 lg:w-2/3 w-full lg:min-h-full lg:min-h-screen lg:bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
        {/* Top Part (Logo and Sign Up Buttons) */}
        <p className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
          <Image
            alt="website Logo"
            src={"/images/defaulticon4.png"}
            width={40}
            height={40}
            className="mx-auto rounded-[6.5px] mr-[10px]"
          /> myPerfectAI
        </p>

        <div className="space-y-8 w-full text-center flex flex-col justify-center items-center">
          <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Reset Password?</h2>
          <h2 className="text-white text-sm lg:text-lg w-full lg:w-[550px] lg:font-semibold">Enter your new password</h2>
          <div className="space-y-[20px] w-full flex flex-col items-center">
            <div className="relative w-full lg:w-[370px]">
              <input
                type="password"
                id="password"
                placeholder=" "
                className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              />
              <label
                htmlFor="password"
                className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
              >
                NEW PASSWORD
              </label>
            </div>
            <div className="relative w-full lg:w-[370px]">
              <input
                type="password"
                id="conf_password"
                placeholder=" "
                className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
              />
              <label
                htmlFor="conf_password"
                className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
              >
                CONFIRM NEW PASSWORD
              </label>
            </div>
          </div>

          <button className="bg-main-purple text-sm font-semibold text-white w-full lg:w-auto rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
            Reset password
          </button>
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
  );
};

export default PasswordChangeForm;
