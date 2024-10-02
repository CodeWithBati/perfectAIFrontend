"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
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
    <header className="fixed w-full bg-transparent z-10">
      <nav className="flex items-center justify-between py-4 px-[30px] sm:px-[135px]">
        {/* Logo */}
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <p className='flex text-white text-center items-center justify-center font-bold text-2xl'>
            <Image
              alt="website Logo"
              src={"/images/defaulticon4.png"}
              width={40}
              height={40}
              className="mx-auto rounded-[6.5px] mr-[10px]"
            /> myPerfectAI
          </p>
        </div>

        {!isAuthenticated ? <button onClick={toggleMenuAuth} className="sm:hidden flex items-center space-x-2 text-sm focus:outline-none">
          {
            user?.profile ? (
              <Image
                src={user?.profile}
                className="object-cover rounded-[6.5px]"
                alt="avatar"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src="/images/avatar.svg"
                className="object-cover rounded-[6.5px]"
                alt="No Profile Image Avatar"
                width={40}
                height={40}
              />
            )
          }
        </button>
          :
          <div />}

        {/* Links */}
        <div className="hidden sm:flex items-center space-x-6 text-white">
          <Link href="/" className="font-semibold hover:text-purple-500">Home</Link>
          <Link href="/about" className="hover:text-purple-500">About</Link>
          <Link href="/blogs" className="hover:text-purple-500">Blogs</Link>
          <Link href="/pricing" className="hover:text-purple-500">Pricing</Link>
        </div>

        {/* Authenticated or Non-Authenticated Actions */}
        <div className="hidden sm:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/login" className="text-white font-semibold hover:bg-gray-800 px-4 py-2 rounded-lg">
                Sign in
              </Link>
              <Link href="/register" className="text-white bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg">
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative">
              {/* Avatar and Dropdown */}
              <button onClick={toggleDropdown} className="flex items-center space-x-2 text-sm focus:outline-none">
                {
                  user?.profile ? (
                    <Image
                      src={user?.profile}
                      className="object-cover rounded-[6.5px]"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src="/images/avatar.svg"
                      className="object-cover rounded-[6.5px]"
                      alt="No Profile Image Avatar"
                      width={40}
                      height={40}
                    />
                  )
                }
                <span className="text-white text-sm">{user?.name || "User"}</span>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 1.42593L4.25 5.17593L8 1.42593V0.675934H0.5V1.42593Z" fill="white" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#323639] border border-[rgba(255,255,255,0.2)] text-white text-sm rounded-lg shadow-lg">
                  <Link href="/directory" className="block px-4 py-2 hover:bg-gray-700">Directory Manager</Link>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">Profile</Link>
                  <Link href="/logout" className="block px-4 py-2 hover:bg-gray-700">Log out</Link>
                </div>
              )}
            </div>
          )}
        </div>

        {menuOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 sm:hidden" onClick={toggleMenu}>
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
              <Link href="/" className="block py-2 hover:text-purple-500 px-[30px] py-[20px]">Home</Link>
              <Link href="/about" className="block py-2 hover:text-purple-500 px-[30px] py-[10px]">About</Link>
              <Link href="/blogs" className="block py-2 hover:text-purple-500 px-[30px] py-[20px]">Blogs</Link>
              <div className="w-full h-[1px] block bg-[rgba(255,255,255,0.2)]" />
              <div className="flex items-center justify-center w-full p-[20px] gap-[10px]">
                <Link href="/login" className="block py-2 bg-[#1e1e1e] text-center rounded-[5px] border border-[rgba(255,255,255,0.2)] font-bold w-full">Sign in</Link>
                <Link href="/register" className="block py-2 bg-purple-500 text-center rounded-[5px] font-bold w-full">Sign up</Link>
              </div>
            </div>
          </div>
        )}
        {menuOpenAuth && !isAuthenticated && (
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
                      className="object-cover rounded-[6.5px]"
                      alt="avatar"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src="/images/avatar.svg"
                      className="object-cover rounded-[6.5px]"
                      alt="No Profile Image Avatar"
                      width={40}
                      height={40}
                    />
                  )
                }
                <span className="text-white ml-4">{user?.name || "User"}</span>
                </p>
                <div />
              </div>
              <div className="w-full h-[1px] block bg-[rgba(255,255,255,0.2)]" />
              <Link href="/directory" className="block py-2 hover:text-purple-500 px-[30px] pt-[20px] pb-[15px]">Directory Manager</Link>
              <Link href="/profile" className="block py-2 hover:text-purple-500 px-[30px] pt-[15px] pb-[20px]">Profile</Link>
              <Link href="/logout" className="block text-center font-bold px-[30px] py-[20px] border-t border-[rgba(255,255,255,0.2)]">Log out</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
