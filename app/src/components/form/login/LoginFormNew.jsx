'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import Label from '../Label';
import Input from '../Input';
import Image from "next/image";

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
    <div className="flex h-screen bg-[#181C1F]">
      {/* Left Side with AI Info */}
      <div className="w-1/3 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/images/authBg.png')" }}>
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

          <div className="space-y-4 text-center">
            <h2 className="text-white text-5xl font-bold mb-8">Sign in</h2>
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

              {/* Password Input with Floating Label */}
              <div className="relative w-[370px]">
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
                  PASSWORD
                </label>
              </div>
            </div>

            <div className="text-right text-white text-xs mt-8">
              <a href="/forget-password" className="text-additional-purple underline">Forget password</a>
            </div>

            <button className="bg-main-purple text-sm font-semibold text-white w-[94px] rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
              Sign in
            </button>



            <p className="text-white text-sm mt-8 font-semibold">
              Already have an account?{' '}
              <Link href="/register" className="text-additional-purple underline">Sign up</Link>
            </p>
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
  );
};

export default LoginForm;
