'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../form/Input';
import Label from '../form/Label';
import { faFacebookF, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import SnackBar from '../global/Snackbar';
import { setUser } from '@/lib/features/auth/authSlice';
import ErrorIcon from '../../icons/errorIcon';
import SuccessCheckIcon from '../../icons/successCheckIcon';
import InputNew from '../form/InputNew';
import Button from '../form/Button';

const Settings = () => {
  const router = useRouter();

  const { user, token } = useAppSelector((state) => state.auth);

  const [formValue, setFormValue] = useState({
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
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const dispatch = useAppDispatch();

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

    console.log(formValue)

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
            <InputNew
              type="password"
              id="currentPassword"
              name="currentPassword"
              placeholder=" "
              value={formValue.currentPassword}
              onChange={handleChange}
              error={errors.currentPassword}
              label="CURRENT PASSWORD"
              className="mb-4"
              labelClassName="text-[rgba(255,255,255,0.5)]"
            />
          </div>
          <div className="relative w-full">
            <InputNew
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder=" "
              value={formValue.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
              label="PASSWORD"
              className="mb-4"
              labelClassName="text-[rgba(255,255,255,0.5)]"
            />
          </div>
          <div className="relative w-full">
            <InputNew
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder=" "
              value={formValue.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              label="CONFIRM PASSWORD"
              className="mb-4"
              labelClassName="text-[rgba(255,255,255,0.5)]"
            />
          </div>
        </div>
        <Button onClick={handlePasswordUpdate} variant="primary" size="small">
          Update changes
        </Button>
      </div>
    </>
  );
};

export default Settings;
