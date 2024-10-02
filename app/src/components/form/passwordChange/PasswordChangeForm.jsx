'use client';

import { useCallback, useState } from 'react';
import Input from '../Input';
import Label from '../Label';

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
    <div className='flex justify-center -mx-3 w-[400px] md:w-[500px]'>
      <div className='w-full px-3'>
        <div className='bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-600 w-full p-6 pt-5'>
          <h3 className='text-2xl font-bold'>Change Password?</h3>
          <p className={paragraphClass}>
            For security reasons, we do NOT store your password. So rest assured
            that we will never send your password via email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className='py-2'>
              <Label htmlFor='emial-address' className='mb-2'>
                Password
              </Label>
              <Input
                id='password'
                type='password'
                name='password'
                value={formData.password}
                onChange={handleChange}
                onBlur={() => handleBlur('password')}
                error={errors.password}
              />
            </div>
            <div className='py-2'>
              <Label htmlFor='emial-address' className='mb-2'>
                Confirm Password
              </Label>
              <Input
                id='confirm-password'
                type='password'
                name='confirmPassword'
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={() => handleBlur('confirmPassword')}
                error={errors.confirmPassword}
              />
            </div>
            <div className='py-4'>
              <button
                className={`w-full p-2 ${
                  !formData.password ||
                  !formData.confirmPassword ||
                  Object.values(errors).some((error) => error)
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-800'
                } text-white`}
                type='submit'
                disabled={
                  !formData.password ||
                  !formData.confirmPassword ||
                  Object.values(errors).some((error) => error)
                }
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeForm;
