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

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [roleForm, setRoleForm] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);
  const [isPpModalOpen, setIsPpModalOpen] = useState(false);

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

      <div className="flex h-screen bg-[#181C1F]">
        {/* Left Side with AI Info */}
        <div className="w-1/3 bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: "url('/images/auth_bg.png')" }}>
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
              <h2 className="text-white text-5xl font-bold mb-8">Sign up</h2>
              <div className="space-y-2">
                {/* User Signup Button */}
                <button className="w-[515px] h-[100px] text-white bg-quill-dark-background border border-[#ffffff33] rounded-md flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-all"
                  onClick={() => router.push('/registerCreate')}
                >
                  <div className="flex items-center">
                    <svg width="28" height="33" viewBox="0 0 28 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9C19 7.25 18 5.625 16.5 4.6875C14.9375 3.8125 13 3.8125 11.5 4.6875C9.9375 5.625 9 7.25 9 9C9 10.8125 9.9375 12.4375 11.5 13.375C13 14.25 14.9375 14.25 16.5 13.375C18 12.4375 19 10.8125 19 9ZM6 9C6 6.1875 7.5 3.5625 10 2.125C12.4375 0.6875 15.5 0.6875 18 2.125C20.4375 3.5625 22 6.1875 22 9C22 11.875 20.4375 14.5 18 15.9375C15.5 17.375 12.4375 17.375 10 15.9375C7.5 14.5 6 11.875 6 9ZM4.0625 30H23.9375L21.75 23H6.1875L4.0625 30ZM4 20H24L27.0625 30L28 33H24.8125H3.125H0L0.875 30L4 20Z" fill="white"/>
                    </svg>
                    <div className="text-left ml-4">
                      <p className="font-semibold text-lg">USER</p>
                      <p className="text-sm">Create your MyPerfectAI user account</p>
                    </div>
                  </div>
                  <svg width="20" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.8125 13.0625L17.25 22.6875L16.1875 23.75L14.0625 21.625L15.125 20.5625L22.125 13.5H1.5H0V10.5H1.5H22.125L15.125 3.5L14.0625 2.4375L16.1875 0.3125L17.25 1.375L26.8125 10.9375L27.875 12L26.8125 13.0625Z" fill="white"/>
                  </svg>
                </button>

                {/* Client Signup Button */}
                <button className="w-[515px] h-[100px] text-white bg-quill-dark-background border border-[#ffffff33] rounded-md flex items-center justify-between px-6 py-4 hover:bg-gray-700 transition-all"
                  onClick={() => router.push('/registerCreatePartner')}
                >
                  <div className="flex items-center">
                    <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.5 0H22.5H24V1.5V6H29H32V9V17.5V27V30H29H3H0V27V17.5V9V6H3H8V1.5V0H9.5ZM29 16V9H22.5H9.5H3V16H12H20H29ZM20 19V22H12V19H3V27H29V19H20ZM21 6V3H11V6H21Z" fill="white"/>
                    </svg>
                    <div className="text-left ml-4">
                      <p className="font-semibold text-lg">CLIENT</p>
                      <p className="text-sm">Create your MyPerfectAI client account</p>
                    </div>
                  </div>
                  <svg width="20" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M26.8125 13.0625L17.25 22.6875L16.1875 23.75L14.0625 21.625L15.125 20.5625L22.125 13.5H1.5H0V10.5H1.5H22.125L15.125 3.5L14.0625 2.4375L16.1875 0.3125L17.25 1.375L26.8125 10.9375L27.875 12L26.8125 13.0625Z" fill="white"/>
                  </svg>

                </button>
              </div>

              <p className="text-white text-sm mt-8">
                Already have an account?{' '}
                <Link href="/login" className="text-additional-purple underline">Sign in</Link>
              </p>
            </div>

            {/* Bottom Links */}
            <div className="text-center font-semibold mb-8 text-white flex justify-center space-x-4 text-xs">
              <p className="text-xs">
                © 2024. Crafted By <Link href="/" className="text-additional-purple underline">MyPerfectAI</Link>
              </p>
              <Link href="#" className="text-white text-xs mt-0">Privacy Policy</Link>
              <Link href="#" className="text-white text-xs mt-0">Terms and Conditions</Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
