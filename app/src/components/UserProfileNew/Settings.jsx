'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../form/Input';
import Label from '../form/Label';
import Button from '../global/Button';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import SnackBar from '../global/Snackbar';
import { setUser } from '@/lib/features/auth/authSlice';
import ErrorIcon from '../../icons/errorIcon';
import SuccessCheckIcon from '../../icons/successCheckIcon';

const Settings = () => {
  const router = useRouter();

  const { user, token } = useAppSelector((state) => state.auth);

  const [formValue, setFormValue] = useState({
    firstName: user?.firstName ? user?.firstName : '',
    lastName: user?.lastName ? user?.lastName : '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    icon: null,
    severity: 'success',
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const dispatch = useAppDispatch();

  const handleUpdateProfile = async () => {
    const { firstName, lastName } = formValue;
    try {
      if (token) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/update-user`,
          JSON.stringify({
            firstName,
            lastName,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          dispatch(setUser({ user: response.data.user }));
          setFormValue({
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
          });
          router.push('/profile', { scroll: false });
        }
      }
    } catch (error) {
      if (error.response.status === 400) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === '' });
  };

  const validateForm = () => {
    let formErrors = {};
    const { currentPassword, newPassword, confirmPassword } = formValue;

    if (!currentPassword) {
      formErrors.currentPassword = 'Current Password is required';
    }

    if (!newPassword) {
      formErrors.newPassword = 'New Password is required';
    } else if (newPassword.length < 8) {
      formErrors.newPassword = 'Password length must be 8 characters';
    }

    if (!confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== newPassword) {
      formErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handlePasswordUpdate = async () => {
    const { currentPassword, newPassword, confirmPassword } = formValue;

    if (validateForm() && token) {
      try {
        if (token) {
          const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/users/update-password`,
            JSON.stringify({
              password: currentPassword,
              newPassword,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            dispatch(setUser({ user: response.data.user }));

            setFormValue((prevState) => ({
              ...prevState,
              currentPassword: '',
              newPassword: '',
              confirmPassword: '',
            }));

            setSnackbar({
              open: true,
              message: 'Password updated successully',
              icon: <SuccessCheckIcon />,
              severity: 'success',
            });
          }
        }
      } catch (error) {
        const errorString = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message;

        if (error.response.status === 400) {
          setSnackbar({
            open: true,
            message: errorString,
            icon: <ErrorIcon />,
            severity: 'error',
          });
        }
      }
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
      <div className="lg:p-8 flex jusitfy-center items-center flex-col rounded-lg w-full lg:w-[600px]">
        {/* Profile Form */}
        <div className="space-y-[20px] mt-[20px] w-full lg:mt-[40px]">
          <div className="relative w-full">
            <input
              type="password"
              id="current_password"
              placeholder=" "
              className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
            />
            <label
              htmlFor="current_password"
              className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
            >
              CURRENT PASSWORD
            </label>
          </div>
          <div className="relative w-full">
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
          <div className="relative w-full">
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
        <button onClick={handlePasswordUpdate} className="bg-main-purple text-sm font-semibold text-white w-full lg:w-auto mt-[30px] rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
          Update changes
        </button>
      </div>
    </>
  );
};

export default Settings;
