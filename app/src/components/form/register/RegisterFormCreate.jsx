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
import SideBar from "../SideBar";
import AuthFooter from "../AuthFooter";
import InputNew from "../InputNew";
import Button from "../Button";
import Terms from "../../Term&Conditions/Terms";
import PrivacyPolicy from "../../Privacy&Policy/PrivacyPolicy";

const RegisterFormCreate = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [roleForm, setRoleForm] = useState(false);
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

  const handleCheckboxChange = (newVal) => {
    setFormData((prevFormData) => ({ ...prevFormData, isChecked: newVal }));
  };

  const handleRoleChange = (newRole) => {
    setFormData((prevFormData) => ({ ...prevFormData, role: newRole }));
  };

  const openModalTerms = () => setTermModalOpen(true);
  const closeModalTerms = () => setTermModalOpen(false);
  const openModalPrivacy = () => setPrivacyModalOpen(true);
  const closeModalPrivacy = () => setPrivacyModalOpen(false);

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
      <Terms isOpen={termModalOpen} onClose={closeModalTerms} />
      <PrivacyPolicy isOpen={privacyModalOpen} onClose={closeModalPrivacy} />
      <SnackBar
        open={snackbar.open}
        icon={snackbar.icon}
        content={snackbar.message}
        severity={snackbar.severity}
        onClose={handleCloseSnackbar}
      />

      <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-contain lg:bg-contain bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">

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

          <div className="space-y-8 text-center flex flex-col justify-center items-center">
            <h2 className="text-white text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8">Create your <br />MyPerfectAI account</h2>
            <div className="space-y-3 w-full flex flex-col items-center">
              <div className="flex space-x-[20px] w-full lg:w-[370px]">
                {/* First Name */}
                <div className="relative w-full lg:w-[178px]">
                  <InputNew
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder=" "
                    value={formData.firstName}
                    onChange={(e) => handleChange(e)}
                    onBlur={() => handleBlur('firstName')}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        handleSubmit(e);
                      }
                    }}
                    error={errors.firstName}
                    label="FIRST NAME"
                    labelClassName="text-[rgba(255,255,255,0.5)]"
                  />
                </div>

                {/* Last Name */}
                <div className="relative w-full lg:w-[178px]">
                  <InputNew
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder=" "
                    value={formData.lastName}
                    onChange={(e) => handleChange(e)}
                    onBlur={() => handleBlur('lastName')}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        handleSubmit(e);
                      }
                    }}
                    error={errors.lastName}
                    label="LAST NAME"
                    labelClassName="text-[rgba(255,255,255,0.5)]"
                  />
                </div>
              </div>

              {/* Email Input with Floating Label */}
              <div className="relative w-full lg:w-[370px]">
                <InputNew
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
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

              {/* Password Input with Floating Label */}
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
              <div className="relative w-full lg:w-[370px]">
                <InputNew
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder=" "
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSubmit(e);
                    }
                  }}
                  onBlur={() => handleBlur('confirmPassword')}
                  error={errors.confirmPassword}
                  label="CONFIRM PASSWORD"
                  labelClassName="text-[rgba(255,255,255,0.5)]"
                />
              </div>
            </div>

            <div className="flex justify-start space-x-2 text-white font-semibold w-full lg:w-[370px]">
              <input
                type="checkbox"
                id="terms"
                className="h-[16px] w-[16px] border-gray-300 bg-[#323639] rounded text-purple-600 focus:ring-purple-500 focus:ring-2"
              />
              <label htmlFor="terms" className="text-xs">
                I agree to the{' '}
                <span onClick={openModalTerms} className="text-additional-purple underline cursor-pointer">
                  Terms and Conditions
                </span>{' '}
                and{' '}
                <span onClick={openModalPrivacy} className="text-additional-purple underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            <Button onClick={handleSubmit} variant="primary" size="small">
              Sign Up
            </Button>

            <p className="text-white text-sm mt-14">
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
      </div>
    </>
  );
};

export default RegisterFormCreate;
