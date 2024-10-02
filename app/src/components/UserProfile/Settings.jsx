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
      <div className='px-6 pt-4 pb-5'>
        <div className='flex flex-wrap items-center -mx-3'>
          <div className='w-full sm:w-1/2 px-3'>
            <div className='py-2'>
              <Label htmlFor='fullName' className='mb-2'>
                First Name
              </Label>
              <Input
                id='fullName'
                name='firstName'
                value={formValue.firstName}
                onChange={handleChange}
                error={errors.firstName ? 'First Name is required' : ''}
              />
            </div>
          </div>
          <div className='w-full sm:w-1/2 px-3'>
            <div className='py-2'>
              <Label htmlFor='lastName' className='mb-2'>
                Last Name
              </Label>
              <Input
                id='lastName'
                name='lastName'
                value={formValue.lastName}
                onChange={handleChange}
                error={errors.lastName ? 'Last Name is required' : ''}
              />
            </div>
          </div>
          <div className='w-full sm:w-1/2 px-3'>
            <div className='py-2'>
              <Label
                htmlFor='useremail'
                className='mb-2 w-full items-center justify-between'
              >
                Email
              </Label>
              <Input id='useremail' disabled value={user?.email} />
            </div>
          </div>

          <div className='w-full px-3 py-2'>
            <Button
              className={`bg-blue-600 text-white ${
                errors.firstName || errors.lastName
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'hover:bg-blue-800'
              }`}
              onClick={handleUpdateProfile}
              disabled={errors.firstName || errors.lastName}
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>
      <div className='px-6 pt-4 pb-5 border-t border-slate-200'>
        <div className='mt-2 mb-2'>
          <h2 className='text-xl font-bold text-slate-700 mb-2'>
            Reset Password
          </h2>
          <p className='text-sm text-slate-500'>
            Password must be at least 8 character and contain symbols.
          </p>
        </div>
        <div className='flex flex-wrap justify-center items-start -mx-3'>
          <div className='w-full  lg:w-1/3 px-3'>
            <div className='py-1'>
              <Label htmlFor='currentPassword' className='mb-2'>
                Current Password
              </Label>
              <Input
                id='currentPassword'
                type='password'
                name='currentPassword'
                value={formValue.currentPassword}
                onChange={handleChange}
                error={errors.currentPassword}
              />
            </div>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 px-3'>
            <div className='py-1'>
              <Label htmlFor='newPassword' className='mb-2'>
                New Password
              </Label>
              <Input
                id='newPassword'
                type='password'
                name='newPassword'
                value={formValue.newPassword}
                onChange={handleChange}
                error={errors.newPassword}
              />
            </div>
          </div>
          <div className='w-full sm:w-1/2 lg:w-1/3 px-3'>
            <div className='py-1'>
              <Label htmlFor='confirmPassword' className='mb-2'>
                Confirm Password
              </Label>
              <Input
                id='confirmPassword'
                type='password'
                name='confirmPassword'
                value={formValue.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
            </div>
          </div>
          <div className='w-full px-3 pb-2 pt-4'>
            <Button
              className='bg-blue-600 text-white hover:bg-blue-800'
              onClick={handlePasswordUpdate}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
