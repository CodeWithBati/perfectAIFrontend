import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPen } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "@/lib/hooks";
import SnackBar from '../global/Snackbar';
import Spinner from "../../ui/Spinner";
import axios from "axios";
import { useAppDispatch } from "@/lib/hooks";
import { setUser } from '@/lib/features/auth/authSlice';
import { updateProfileImage } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";
import ErrorIcon from '@/app/src/icons/errorIcon';
import Button from "../form/Button";
import InputNew from "../form/InputNew";

const Overview = ({ setSelectedIndex }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, token } = useAppSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.profile);

  const [formValue, setFormValue] = useState({
    firstName: user?.firstName ? user?.firstName : '',
    lastName: user?.lastName ? user?.lastName : '',
    email: user?.email ? user?.email : '',
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
    email: false,
  });

  const handleImageChange = (e) => {
    console.log("function called");
    const file = e.target.files[0];
    handleUpload(file);
  };

  const handleUpload = async (selectedImage) => {
    if (selectedImage) {
      setSpinner(true);
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateProfileImage({ profile: response.data.profile }));
        setImageUrl(response.data.profile);
        toast.success("Image Uploaded Successfully");
      }
      setSpinner(false);
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
      console.log(error)
      if (error.response.status === 400) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: 'error',
        });
      }
    }
    setEditProfile(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === '' });
  };

  return (
    <div className="lg:p-6 w-full lg:w-auto">
      <SnackBar
        open={snackbar.open}
        icon={snackbar.icon}
        content={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />
      <div className="flex flex-wrap w-full lg:w-auto">
        <div className="lg:p-8 flex justify-center items-center flex-col rounded-lg lg:min-w-[600px] w-full lg:w-auto">
          <div className="text-center flex flex-col lg:flex-row justify-center items-center gap-[30px]">
            <div className="relative w-[150px] h-[150px]">
              {user && user.profile ? (
                <Image src={imageUrl} alt="" height={150} width={150} className="rounded-full mb-4" />
              ) : (
                <Image
                  src="/images/avatar.svg"
                  alt=""
                  height={150}
                  width={150}
                  className="rounded-full mb-4"
                />
              )}
              <div className="absolute bottom-1 right-1">
                <label
                  className="cursor-pointer flex items-center justify-center min-w-7 min-h-7 bg-[#1E1E1E] p-2 border border-gray-700 rounded-md font-bold"
                  onChange={handleImageChange}
                  htmlFor="mobileImageUpload"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="mobileImageUpload"
                    hidden
                    onChange={handleImageChange}
                  />
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5007 0.333336L12.1569 2.33334H15.0007H16.5007V3.83334V12.8333V14.3333H15.0007H2.00065H0.500652V12.8333V3.83334V2.33334H2.00065H4.81315L5.50065 0.333336H11.5007ZM12.1569 3.83334H11.0632L10.7194 2.83334L10.4069 1.83334H6.56315L6.25065 2.83334L5.9069 3.83334H4.81315H2.00065V12.8333H15.0007V3.83334H12.1569ZM8.50065 4.83334C9.75065 4.83334 10.8757 5.52084 11.5007 6.58334C12.1569 7.67709 12.1569 9.02084 11.5007 10.0833C10.8757 11.1771 9.75065 11.8333 8.50065 11.8333C7.2194 11.8333 6.0944 11.1771 5.4694 10.0833C4.81315 9.02084 4.81315 7.67709 5.4694 6.58334C6.0944 5.52084 7.2194 4.83334 8.50065 4.83334ZM10.5007 8.33334C10.5007 7.64584 10.0944 6.98959 9.50065 6.61459C8.87565 6.27084 8.0944 6.27084 7.50065 6.61459C6.87565 6.98959 6.50065 7.64584 6.50065 8.33334C6.50065 9.05209 6.87565 9.70834 7.50065 10.0833C8.0944 10.4271 8.87565 10.4271 9.50065 10.0833C10.0944 9.70834 10.5007 9.05209 10.5007 8.33334Z" fill="white" />
                  </svg>
                </label>
              </div>
            </div>
            {!editProfile && (
              <div className="flex flex-col justify-center items-center lg:items-start">
                <h2 className="text-[32px] font-semibold overflow-hidden text-ellipsis whitespace-normal lg:max-w-[250px] lg:text-left">
                  {user?.firstName} {user?.lastName}
                </h2>
                <button
                  className="px-4 py-2 bg-[#323639] text-white font-bold rounded-md hover:bg-gray-600 border border-[rgba(255,255,255,0.2)] mt-4"
                  onClick={() => setEditProfile(true)}
                >
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block mr-2"
                  >
                    <path d="M0.5 16L0.8125 14.4062L1.5 11L11.4375 1.0625L12.5 0L13.5312 1.0625L15.4375 2.9375L16.5 4L15.4375 5.0625L5.5 15L2.09375 15.6875L0.5 16ZM4.75 13.625L12.4375 5.96875L10.5625 4.0625L2.875 11.75L2.40625 14.0938L4.75 13.625Z" fill="white" />
                  </svg>
                  Edit profile
                </button>
              </div>
            )}
          </div>

          {/* Profile Form */}
          <div className="space-y-[20px] mt-[40px] w-full lg:w-auto">
            <div className="flex flex-col lg:flex-row space-y-[20px] lg:space-y-0 lg:space-x-[20px] lg:w-full">
              {/* First Name */}
              <div className="relative">
                <InputNew
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder=" "
                  onChange={(e) => handleChange(e)}
                  value={formValue.firstName}
                  error={errors.firstName}
                  label="FIRST NAME"
                  className="mb-4"
                  labelClassName="text-[rgba(255,255,255,0.5)]"
                />
              </div>

              {/* Last Name */}
              <div className="relative">
                <InputNew
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder=" "
                  onChange={(e) => handleChange(e)}
                  value={formValue.lastName}
                  error={errors.lastName}
                  label="LAST NAME"
                  className="mb-4"
                  labelClassName="text-[rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            {/* Email Input with Floating Label */}
            <div className="relative">
              <InputNew
                type="email"
                id="email"
                name="email"
                placeholder=" "
                disabled
                value={formValue.email}
                error={errors.email}
                label="EMAIL ADDRESS"
                className="mb-4"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
          {editProfile && (
            <Button onClick={handleUpdateProfile} variant="primary" size="small">
              Update changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Overview;
