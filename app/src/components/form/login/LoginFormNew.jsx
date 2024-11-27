'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import InputNew from '../InputNew';
import Image from "next/image";

import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';
// import SnackBar from '../../global/Snackbar';
import ErrorIcon from '@/app/src/icons/errorIcon';
import { toast } from 'react-hot-toast';
import SideBar from '../SideBar';
import AuthFooter from '../AuthFooter';
import Button from '../Button';

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
    <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-contain lg:bg-contain bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">
      {/* Left Side with AI Info */}
      <SideBar />

      {/* Right Side with Sign-Up Options */}
      <div className="relative z-10 lg:w-[60%] w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
        {/* Top Part (Logo and Sign Up Buttons) */}
        <Link href='/' className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
          <Image
            alt="website Logo"
            src={"/images/Profile_logo.png"}
            width={300}
            height={60}
            className="mx-auto rounded-[6.5px] mr-[10px] w-[300px] h-[100%]"
          />
        </Link>

        <div className="space-y-6 w-full text-center flex flex-col items-center">
          <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Sign in</h2>
          <div className="space-y-3 w-full flex flex-col items-center">
            {/* Email Input with Floating Label */}
            <div className="relative w-full lg:w-[370px]">
              <InputNew
                type="email"
                id="email"
                name="email"
                value={formData.email}
                placeholder=" "
                onChange={(e) => handleChange(e)}
                onBlur={() => handleBlur('email')}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                error={errors.email}
                label="EMAIL ADDRESS"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
            <div className="relative w-full lg:w-[370px]">

              <InputNew
                type="password"
                id="password"
                name="password"
                placeholder=" "
                value={formData.password}
                onChange={(e) => handleChange(e)}
                onBlur={() => handleBlur('password')}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                error={errors.password}
                label="PASSWORD"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
          </div>

          <div className="text-right text-white text-xs mt-8 flex flex-col items-end w-full lg:w-[370px]">
            <a href="/forget-password" className="text-additional-purple underline">Forget password</a>
          </div>

          {/* <button className="bg-main-purple text-sm font-semibold text-white w-full lg:w-[94px] rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]"
            
          >
            Sign in
          </button> */}

          <Button onClick={handleSubmit} variant="primary" size="small">
            Sign in
          </Button>



          <p className="text-white text-sm mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-additional-purple underline">Sign up</Link>
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
  );
};

export default LoginForm;
