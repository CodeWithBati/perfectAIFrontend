"use client";
import Cookies from "js-cookie";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Menu from "./Menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme, useThemeUpdate } from "@/app/src/layout/provider";
import Image from "next/image";
import {
  PowerIcon,
  SquaresPlusIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Header = ({ className }) => {
  const router = useRouter();
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuOpenAuth, setMenuOpenAuth] = useState(false);
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleMenuAuth = () => {
    setMenuOpenAuth(!menuOpenAuth);
  };

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 1140) {
        setTimeout(setMobile(true), 3000);
      } else {
        setMobile(false);
        setMenuVisibility(false);
      }
    };

    handleMobile();
    window.addEventListener("resize", handleMobile);
    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  const toggleProfileMenu = () => {
    setProfileMenuVisible((prev) => !prev);
  };

  const closeProfileMenu = () => {
    setProfileMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.getElementById("profile-menu");
      if (menu && !menu.contains(event.target)) {
        closeProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    dispatch(clearUser());
    closeProfileMenu();
    router.push("/", { scroll: false });
  };


  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <header className="absolute w-full bg-transparent z-10">
      <nav className="flex items-center justify-between py-4 px-[30px] sm:px-[135px]">
        {/* Logo */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg width="21" height="18" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.25 0H17.75V1.875H0.25V0ZM0.25 6.25H17.75V8.125H0.25V6.25ZM17.75 12.5V14.375H0.25V12.5H17.75Z" fill="white" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <Link href='/' className='flex text-white text-center items-center justify-center font-bold text-2xl'>
            <Image
              alt="website Logo"
              src={"/images/defaulticon4.png"}
              width={40}
              height={40}
              className="mx-auto rounded-[6.5px] mr-[10px]"
            /> myPerfectAI
          </Link>
        </div>

        {isAuthenticated ? <button onClick={toggleMenuAuth} className="sm:hidden flex items-center space-x-2 text-sm focus:outline-none">
          {
            user?.profile ? (
              <Image
                src={user?.profile}
                className="object-cover rounded-full w-[40px] h-[40px]"
                alt="avatar"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src="/images/avatar.svg"
                className="object-cover rounded-full w-[40px] h-[40px]"
                alt="No Profile Image Avatar"
                width={40}
                height={40}
              />
            )
          }
        </button>
          :
          <div className="lg:hidden" />}

        {/* Links */}
        <div className="hidden sm:flex items-center space-x-8 text-white">
          <Link href="/" className="hover:text-additional-purple tracking-wider text-sm">Home</Link>
          <Link href="/about" className="hover:text-additional-purple tracking-wider text-sm">About</Link>
          <Link href="/blogs" className="hover:text-additional-purple tracking-wider text-sm">Blogs</Link>
          <Link href="/pricing" className="hover:text-additional-purple tracking-wider text-sm">Pricing</Link>
        </div>

        {/* Authenticated or Non-Authenticated Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-white bg-[#323639] hover:bg-[#323639] border border-[rgba(255,255,255,0.2)] px-4 py-2 rounded-lg tracking-wider text-sm">
                Sign in
              </Link>
              <Link href="/register" className="text-white bg-main-purple hover:bg-additional-purple px-4 py-2 rounded-lg tracking-wider text-sm">
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative" ref={dropdownRef}>
              {/* Avatar and Dropdown */}
              <button onClick={toggleDropdown} className="flex items-center space-x-2 text-sm focus:outline-none">
                {
                  user?.profile ? (
                    <Image
                      src={user?.profile}
                      className="object-cover rounded-full w-[40px] h-[40px]"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src="/images/avatar.svg"
                      className="object-cover rounded-full w-[40px] h-[40px]"
                      alt="No Profile Image Avatar"
                      width={40}
                      height={40}
                    />
                  )
                }
                <span className="text-white text-sm tracking-wider text-sm">{user?.firstName || "User"}</span>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 1.42593L4.25 5.17593L8 1.42593V0.675934H0.5V1.42593Z" fill="white" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#323639] border border-[rgba(255,255,255,0.2)] text-white text-sm rounded-lg shadow-lg">
                  {user.role === "admin" && <Link href="/dashboard" className="block px-4 py-2 hover:bg-gray-700 tracking-wider text-sm">Admin</Link>}
                  {user.role === "creator" && <Link href="/directory-manager" className="block px-4 py-2 hover:bg-gray-700 tracking-wider text-sm">Directory Manager</Link>}
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700 tracking-wider text-sm">Profile</Link>
                  <span onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-700 tracking-wider text-sm cursor-pointer">Log out</span>
                </div>
              )}
            </div>
          )}
        </div>

        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-80 sm:hidden" onClick={toggleMenu}>
            <div className="bg-[#323639] absolute w-full text-white z-60">
              <div className="flex items-center justify-between px-[30px] py-[20px]">
                <button onClick={toggleMenu} className="text-white text-2xl">
                  &times;
                </button>
                <p className='flex text-white text-center items-center justify-center font-bold text-2xl'>
                  <Image
                    alt="website Logo"
                    src={"/images/defaulticon4.png"}
                    width={39}
                    height={39}
                    className="mx-auto rounded-[6.5px] mr-[10px]"
                  /> myPerfectAI
                </p>
                <div />
              </div>
              <div className="w-full h-[1px] block bg-[rgba(255,255,255,0.2)]" />
              <Link href="/" className="block py-2 hover:text-additional-purple px-[30px] py-[20px] flex items-center justify-between">
                <p className="tracking-wider text-sm">Home</p>
                <p>
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                  </svg>
                </p>
              </Link>
              <Link href="/about" className="block py-2 hover:text-additional-purple px-[30px] py-[10px] flex items-center justify-between">
                <p className="tracking-wider text-sm">About</p>
                <p>
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                  </svg>
                </p>
              </Link>
              <Link href="/blogs" className="block py-2 hover:text-additional-purple px-[30px] py-[20px] flex items-center justify-between">
                <p className="tracking-wider text-sm">Blog</p>
                <p>
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                  </svg>
                </p>
              </Link>
              <Link href="/pricing" className="block py-2 hover:text-additional-purple px-[30px] py-[20px] flex items-center justify-between">
                <p className="tracking-wider text-sm">Pricing</p>
                <p>
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                  </svg>
                </p>
              </Link>
              {!isAuthenticated && 
                <>
                  <div className="w-full h-[1px] block bg-[rgba(255,255,255,0.2)]" />
                  <div className="flex items-center justify-center w-full p-[20px] gap-[10px]">
                    <Link href="/login" className="block py-2 bg-[#1e1e1e] text-center rounded-[5px] border border-[rgba(255,255,255,0.2)] font-bold w-full tracking-wider text-sm">Sign in</Link>
                    <Link href="/register" className="block py-2 bg-main-purple text-center rounded-[5px] font-bold w-full tracking-wider text-sm">Sign up</Link>
                  </div>
              </>
              }
            </div>
          </div>
        )}
        {menuOpenAuth && isAuthenticated && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 sm:hidden" onClick={toggleMenuAuth}>
            <div className="bg-[#323639] absolute w-full text-white z-60">
              <div className="flex items-center justify-between px-[30px] py-[20px]">
                <button onClick={toggleMenu} className="text-white text-2xl">
                  &times;
                </button>
                <p className="flex text-white text-center items-center justify-center font-bold text-2xl">
                  {
                    user?.profile ? (
                      <Image
                        src={user?.profile}
                        className="object-cover rounded-full w-[40px] h-[40px]"
                        alt="avatar"
                        width={40}
                        height={40}
                      />
                    ) : (
                      <Image
                        src="/images/avatar.svg"
                        className="object-cover rounded-full w-[40px] h-[40px]"
                        alt="No Profile Image Avatar"
                        width={40}
                        height={40}
                      />
                    )
                  }
                  <span className="text-white ml-4">{user?.firstName || "User"}</span>
                </p>
                <div />
              </div>
              <div className="w-full h-[1px] block bg-[rgba(255,255,255,0.2)]" />
              {user.role === "admin" &&
                <Link href="/dashboard" className="block py-2 hover:text-additional-purple px-[30px] pt-[20px] pb-[15px] flex items-center justify-between">
                  <p className="tracking-wider text-sm">Admin</p>
                  <p>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                    </svg>
                  </p>
                </Link>
              }
              {user.role === "creator" &&
                <Link href="/directory-manager" className="block py-2 hover:text-additional-purple px-[30px] pt-[20px] pb-[15px] flex items-center justify-between">
                  <p className="tracking-wider text-sm">Directory Manager</p>
                  <p>
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                    </svg>
                  </p>
                </Link>
              }
              <Link href="/profile" className="block py-2 hover:text-additional-purple px-[30px] pt-[20px] pb-[15px] flex items-center justify-between">
                <p className="tracking-wider text-sm">Profile</p>
                <p>
                  <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.4062 6.53125L8.625 11.3438L8.09375 11.875L7.03125 10.8125L7.5625 10.2812L11.0625 6.75H0.75H0V5.25H0.75H11.0625L7.5625 1.75L7.03125 1.21875L8.09375 0.15625L8.625 0.6875L13.4062 5.46875L13.9375 6L13.4062 6.53125Z" fill="white" />
                  </svg>
                </p>
              </Link>
              <span onClick={handleLogout} className="block text-center font-bold px-[30px] py-[20px] border-t border-[rgba(255,255,255,0.2)] tracking-wider text-sm cursor-pointer">Log out</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
