"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch } from "@/lib/hooks";
import { setUser } from "@/lib/features/auth/authSlice";
import Link from "next/link";
import Image from "next/image";
import SnackBar from "../../global/Snackbar";
import ErrorIcon from "@/app/src/icons/errorIcon";
import TermsAndConditionModal from "@/app/src/ui/TermsAndConditionModal";
import PrivacyPolicyModal from "@/app/src/ui/PrivacyPolicyModal";

const RegisterFormCreatePartner = () => {
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

            <div className="space-y-4 text-center flex flex-col justify-center items-center">
              <h2 className="text-white text-5xl font-bold mb-8">Create your MyPerfectAI <br/>Partner account</h2>
              <div className="space-y-[20px]">
                <div className="flex space-x-[20px]">
                  {/* First Name */}
                  <div className="relative w-[178px]">
                    <input
                      type="text"
                      id="first_name"
                      placeholder=" "
                      className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                    />
                    <label
                      htmlFor="first_name"
                      className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                    >
                      FIRST NAME
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="relative w-[175px]">
                    <input
                      type="text"
                      id="last_name"
                      placeholder=" "
                      className="block px-[15px] pt-[20px] pb-[8px] w-full h-[56px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
                    />
                    <label
                      htmlFor="last_name"
                      className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 transform -translate-y-4 scale-100 top-[18px] left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[18px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
                    >
                      LAST NAME
                    </label>
                  </div>
                </div>
                
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
                <div className="relative w-[370px]">
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
                    CONFIRM PASSWORD
                  </label>
                </div>
              </div>

              <div className="flex justify-start space-x-2 text-white font-semibold  w-[370px]">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-[16px] w-[16px] border-gray-300 bg-[#323639] rounded text-purple-600 focus:ring-purple-500 focus:ring-2"
                />
                <label htmlFor="terms" className="text-xs">
                  I agree to the{' '}
                  <Link href="#" className="text-additional-purple underline">
                    Terms and Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-additional-purple underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <button className="bg-main-purple text-sm font-semibold text-white rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2]">
                Sign up
              </button>

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

export default RegisterFormCreatePartner;
