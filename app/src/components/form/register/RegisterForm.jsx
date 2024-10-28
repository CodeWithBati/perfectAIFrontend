"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/auth/authSlice";

import Label from "../Label";
import Input from "../Input";

import Image from "next/image";
import Link from "next/link";
import SnackBar from "../../global/Snackbar";
import ErrorIcon from "@/app/src/icons/errorIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import TermsAndConditionModal from "@/app/src/ui/TermsAndConditionModal";
import PrivacyPolicyModal from "@/app/src/ui/PrivacyPolicyModal";
import SideBar from "../SideBar";
import AuthFooter from "../AuthFooter";
import Terms from "../../Term&Conditions/Terms";
import PrivacyPolicy from "../../Privacy&Policy/PrivacyPolicy";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [roleForm, setRoleForm] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);
  const [isPpModalOpen, setIsPpModalOpen] = useState(false);
  const [termModalOpen, setTermModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
    role: "user",
  });
  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isChecked: false,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    icon: null,
    severity: "success",
  });


  const openModalTerms = () => setTermModalOpen(true);
  const closeModalTerms = () => setTermModalOpen(false);
  const openModalPrivacy = () => setPrivacyModalOpen(true);
  const closeModalPrivacy = () => setPrivacyModalOpen(false);

  const handleCheckboxChange = (newVal) => {
    setFormData((prevFormData) => ({ ...prevFormData, isChecked: newVal }));
  };

  const handleRoleChange = (newRole) => {
    setFormData((prevFormData) => ({ ...prevFormData, role: newRole }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

    if (name === "confirmPassword") {
      validateField("confirmPassword");
    } else if (name === "email") {
      validateField("email");
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateField(field);
  };

  const validateField = useCallback(
    (field) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      setErrors((prevErrors) => {
        const updatedErrors = { ...prevErrors };

        switch (field) {
          case "email":
            updatedErrors.email = !formData.email
              ? "Email is required"
              : !emailRegex.test(formData.email)
                ? "Invalid Format"
                : "";
            break;
          case "password":
            updatedErrors.password = !formData.password
              ? "Password is required"
              : formData.password.length < 8
                ? "Password must be at least 8 characters long"
                : "";
            break;
          case "firstName":
            updatedErrors.firstName = !formData.firstName
              ? "First Name is required"
              : "";
            break;
          case "lastName":
            updatedErrors.lastName = !formData.lastName
              ? "Last Name is required"
              : "";
            break;
          case "confirmPassword":
            updatedErrors.confirmPassword = !formData.confirmPassword
              ? "Password is required"
              : formData.password !== formData.confirmPassword
                ? "Passwords don't match"
                : "";
            break;
          case "termsCheckbox":
            updatedErrors.isChecked = !formData.isChecked
              ? "Please check the term and condition box"
              : "";
            break;
          default:
            break;
        }

        return updatedErrors;
      });
    },
    [formData, setErrors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, role } = formData;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          role,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        dispatch(setUser({ user: response.data.user }));
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        router.push("/verify-email", { scroll: false });
      }
    } catch (error) {
      if (error.response.status === 400) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: "error",
        });
      } else if (error.response.status === 409) {
        setSnackbar({
          open: true,
          message: error.response.data.message,
          icon: <ErrorIcon />,
          severity: "error",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Something went wrong.",
          icon: <ErrorIcon />,
          severity: "error",
        });
      }
    }
  };

  useEffect(() => {
    if (formData.confirmPassword) {
      validateField("confirmPassword");
    } else if (formData.email) {
      validateField("email");
    }
  }, [formData, validateField]);

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

  const handleCloseSnackbar = () => {
    setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }));
  };
  return (
    <>
      <TermsAndConditionModal
        isModalOpen={isTCModalOpen}
        closeModal={() => setIsTCModalOpen(false)}
      />
      <PrivacyPolicyModal
        isModalOpen={isPpModalOpen}
        closeModal={() => setIsPpModalOpen(false)}
      />
      <SnackBar
        open={snackbar.open}
        icon={snackbar.icon}
        content={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">
        {/* Left Side with AI Info */}
        <SideBar />

        {/* Right Side with Sign-Up Options */}
        <div className="relative z-10 relative z-10 lg:w-2/3 w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
          {/* Top Part (Logo and Sign Up Buttons) */}
          <Link href='/' className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
          <Image
            alt="website Logo"
            src={"/images/Profile_logo.png"}
            width={160}
            height={40}
            className="mx-auto rounded-[6.5px] mr-[10px] w-[171px] h-[100%]"
          />
          </Link>

          <div className="space-y-8 text-center">
            <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Sign up</h2>
            <div className="space-y-4 lg:space-y-2">

              {/* Client Signup Button */}
              <button className="w-full lg:w-[515px] h-auto lg:h-[100px] text-white bg-quill-dark-background border border-[#ffffff33] rounded-md flex items-center justify-between p-[20px] lg:px-6 lg:py-4 hover:bg-gray-700 transition-all"
                onClick={() => router.push('/registerCreate')}
              >
                <div className="flex items-start lg:items-center">
                  <svg width="22" height="25" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden lg:block">
                    <path d="M14.75 7C14.75 5.6875 14 4.46875 12.875 3.76562C11.7031 3.10938 10.25 3.10938 9.125 3.76562C7.95312 4.46875 7.25 5.6875 7.25 7C7.25 8.35938 7.95312 9.57812 9.125 10.2812C10.25 10.9375 11.7031 10.9375 12.875 10.2812C14 9.57812 14.75 8.35938 14.75 7ZM5 7C5 4.89062 6.125 2.92188 8 1.84375C9.82812 0.765625 12.125 0.765625 14 1.84375C15.8281 2.92188 17 4.89062 17 7C17 9.15625 15.8281 11.125 14 12.2031C12.125 13.2812 9.82812 13.2812 8 12.2031C6.125 11.125 5 9.15625 5 7ZM3.54688 22.75H18.4531L16.8125 17.5H5.14062L3.54688 22.75ZM3.5 15.25H18.5L20.7969 22.75L21.5 25H19.1094H2.84375H0.5L1.15625 22.75L3.5 15.25Z" fill="white" />
                  </svg>
                  <div className="lg:hidden bg-[#4B4B4B] rounded-full p-[10px]">
                    <svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.50016 5C9.50016 4.125 9.00016 3.3125 8.25016 2.84375C7.46891 2.40625 6.50016 2.40625 5.75016 2.84375C4.96891 3.3125 4.50016 4.125 4.50016 5C4.50016 5.90625 4.96891 6.71875 5.75016 7.1875C6.50016 7.625 7.46891 7.625 8.25016 7.1875C9.00016 6.71875 9.50016 5.90625 9.50016 5ZM3.00016 5C3.00016 3.59375 3.75016 2.28125 5.00016 1.5625C6.21891 0.84375 7.75016 0.84375 9.00016 1.5625C10.2189 2.28125 11.0002 3.59375 11.0002 5C11.0002 6.4375 10.2189 7.75 9.00016 8.46875C7.75016 9.1875 6.21891 9.1875 5.00016 8.46875C3.75016 7.75 3.00016 6.4375 3.00016 5ZM2.03141 15.5H11.9689L10.8752 12H3.09391L2.03141 15.5ZM2.00016 10.5H12.0002L13.5314 15.5L14.0002 17H12.4064H1.56266H0.000160217L0.43766 15.5L2.00016 10.5Z" fill="white" />
                    </svg>
                  </div>

                  <div className="text-left ml-4">
                    <p className="font-semibold text-lg">USER</p>
                    <p className="text-sm max-w-[200px]">Create your MyPerfectAI user account</p>
                  </div>
                </div>
                <svg width="20" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.8125 13.0625L17.25 22.6875L16.1875 23.75L14.0625 21.625L15.125 20.5625L22.125 13.5H1.5H0V10.5H1.5H22.125L15.125 3.5L14.0625 2.4375L16.1875 0.3125L17.25 1.375L26.8125 10.9375L27.875 12L26.8125 13.0625Z" fill="white" />
                </svg>
              </button>

              {/* User Signup Button */}
              <button className="w-full lg:w-[515px] h-auto lg:h-[100px] text-white bg-quill-dark-background border border-[#ffffff33] rounded-md flex items-center justify-between p-[20px] lg:px-6 lg:py-4 hover:bg-gray-700 transition-all"
                onClick={() => router.push('/registerCreatePartner')}
              >
                <div className="flex items-start lg:items-center">
                  
                  <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden lg:block">
                    <path d="M9.5 0H22.5H24V1.5V6H29H32V9V17.5V27V30H29H3H0V27V17.5V9V6H3H8V1.5V0H9.5ZM29 16V9H22.5H9.5H3V16H12H20H29ZM20 19V22H12V19H3V27H29V19H20ZM21 6V3H11V6H21Z" fill="white" />
                  </svg>

                  <div className="lg:hidden bg-[#4B4B4B] rounded-full p-[10px]">
                    <svg width="15" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.75016 0H11.2502H12.0002V0.75V3H14.5002H16.0002V4.5V8.75V13.5V15H14.5002H1.50016H0.000160217V13.5V8.75V4.5V3H1.50016H4.00016V0.75V0H4.75016ZM14.5002 8V4.5H11.2502H4.75016H1.50016V8H6.00016H10.0002H14.5002ZM10.0002 9.5V11H6.00016V9.5H1.50016V13.5H14.5002V9.5H10.0002ZM10.5002 3V1.5H5.50016V3H10.5002Z" fill="white" />
                    </svg>
                  </div>
                  <div className="text-left ml-4">
                    <p className="font-semibold text-lg">PARTNER</p>
                    <p className="text-sm max-w-[200px]">Create your MyPerfectAI Partner account</p>
                  </div>
                </div>
                <svg width="20" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.8125 13.0625L17.25 22.6875L16.1875 23.75L14.0625 21.625L15.125 20.5625L22.125 13.5H1.5H0V10.5H1.5H22.125L15.125 3.5L14.0625 2.4375L16.1875 0.3125L17.25 1.375L26.8125 10.9375L27.875 12L26.8125 13.0625Z" fill="white" />
                </svg>
              </button>
            </div>

            <p className="text-white text-sm">
              Already have an account?{' '}
              <Link href="/login" className="text-additional-purple underline">Sign in</Link>
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
        <Terms isOpen={termModalOpen} onClose={closeModalTerms} />
        <PrivacyPolicy isOpen={privacyModalOpen} onClose={closeModalPrivacy} />
      </div>
    </>
  );
};

export default RegisterForm;
