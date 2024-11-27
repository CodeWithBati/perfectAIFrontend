'use client';

import { useCallback, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import Image from "next/image";
import AuthFooter from '../AuthFooter';
import SideBar from '../SideBar';
import Button from '../Button';
import InputNew from '../InputNew';
import { useSearchParams } from 'next/navigation';


import { useRouter } from 'next/navigation';

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

  const router = useRouter();

  const searchParams = useSearchParams();
  const key = searchParams.get('key');

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

    if (!formData.password || !formData.confirmPassword) {
      setErrors({
        password: 'Password is required.',
        confirmPassword: 'Password confirmation is required.',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        password: 'Passwords do not match.',
        confirmPassword: 'Passwords do not match.',
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?key=${key}`,
        JSON.stringify({
          password: formData.password
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        router.push('/reset-password-success', { scroll: false });
      }
    } catch (error) {
      console.error('Error sending reset instructions:', error.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-contain lg:bg-contain bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">
      <SideBar />

      {/* Right Side with Sign-Up Options */}
      <div className="relative z-10 lg:w-[60%] w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
        {/* Top Part (Logo and Sign Up Buttons) */}
        <Link href="/" className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
          <Image
            alt="website Logo"
            src={"/images/Profile_logo.png"}
            width={300}
            height={60}
            className="mx-auto rounded-[6.5px] mr-[10px] w-[300px] h-[100%]"
          />
        </Link>

        <div className="space-y-8 w-full text-center flex flex-col justify-center items-center">
          <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Reset Password?</h2>
          <h2 className="text-white text-sm lg:text-lg w-full lg:w-[550px] lg:font-semibold">Enter your new password</h2>
          <div className="space-y-3 w-full flex flex-col items-center">
            <div className="relative w-full lg:w-[370px]">
              <InputNew
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                onBlur={() => handleBlur('password')}
                error={errors.password}
                label="PASSWORD"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="relative w-full lg:w-[370px]">
              <InputNew
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder=" "
                value={formData.confirmPassword}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleBlur('confirmPassword')}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                error={errors.confirmPassword}
                label="CONFIRM PASSWORD"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
          </div>

          <Button onClick={handleSubmit} variant="primary" size="small">
            Reset password
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
  );
};

export default PasswordChangeForm;
