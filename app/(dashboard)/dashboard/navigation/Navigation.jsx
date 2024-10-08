"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Menu from "@/app/src/layout/Header/Menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearUser } from "@/lib/features/auth/authSlice";
import { useRouter } from "next/navigation";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme, useThemeUpdate } from "@/app/src/layout/provider";
import { CubeIcon, PowerIcon, UserIcon } from "@heroicons/react/24/outline";

const Navigation = ({ setSidebarVisibility }) => {
  const router = useRouter();

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [mobile, setMobile] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();

  useEffect(() => {
    const handleMobile = () => {
      if (window.innerWidth < 1500) {
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

  return (
    <div className="isolate fixed top-0 start-0 w-full py-5 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 z-[999] lg:z-[1020] px-3 text-gray-600 dark:text-gray-300">
      <div className=" px-5">
        <div className="flex items-center w-100 justify-between">
          <div className="flex items-center gap-x-2">
            <div className="2xl:hidden">
              <button
                onClick={() => {
                  setSidebarVisibility(true);
                }}
                className="flex items-center justify-center h-4 w-4 text-gray-600 hover:text-slate-300"
              >
                <FontAwesomeIcon icon={faBars} />
              </button>
            </div>
            <Link className="flex-shrink-0 text-lg font-bold" href="/">
              <div className="hidden 2xl:block">
                {theme.mode === "dark" ? (
                  <Image
                    src={"/images/DarkLogo.png"}
                    alt="website Logo"
                    width={200}
                    height={200}
                    className="!h-11"
                  />
                ) : (
                  <Image
                    src={"/images/defaulticon4.png"}
                    alt="website Logo"
                    width={200}
                    height={200}
                    className="!h-11"
                  />
                )}
              </div>
            </Link>
          </div>
          {!isAuthenticated ? (
            <Menu mobile={mobile} />
          ) : (
            <div className="relative flex gap-3 md:gap-5 items-center">
              <Link href={"/pricing"}>Submit Tool</Link>
              <div
                className="flex flex-row gap-4 items-center justify-center cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <button className="inline-flex h-7 w-7 rounded-full overflow-hidden outline outline-2 outline-offset-2 outline-slate-300">
                  {user.profile ? (
                    <Image
                      src={user.profile}
                      className=" h-full w-full object-cover"
                      alt="avatar"
                      width={100}
                      height={100}
                    />
                  ) : (
                    <Image
                      src="/images/avatar.svg"
                      alt="No Avatar Uploaded"
                      width={100}
                      height={100}
                    />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => {
                    theme.mode === "dark" && themeUpdate.mode("light");
                    theme.mode === "light" && themeUpdate.mode("dark");
                  }}
                  className={`inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800`}
                >
                  {theme.mode === "dark" && <MoonIcon className="h-4" />}
                  {theme.mode === "light" && <SunIcon className="h-5" />}
                </button>
              </div>
              {profileMenuVisible && (
                <div
                  id="profile-menu"
                  className="absolute top-12 right-0 min-w-[170px]"
                >
                  <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                    <div className="p-4 flex items-center">
                      <h6 className="ms-1 text-md font-bold text-slate-500 -mt-0.5">
                        {user?.firstName} {user?.lastName}
                      </h6>
                    </div>
                    <ul className="py-2 border-t border-slate-200 dark:border-slate-800">
                      <li>
                        <Link
                          href="/"
                          className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2"
                          onClick={closeProfileMenu} // Close menu on click
                        >
                          <CubeIcon className="w-4 me-2" />
                          <span>Go To App</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile?tab=overview"
                          className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2"
                          onClick={closeProfileMenu} // Close menu on click
                        >
                          <UserIcon className="w-4 me-2" />
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <p
                          onClick={handleLogout}
                          className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2 cursor-pointer"
                        >
                          <PowerIcon className="w-4 me-2" />
                          <span>Logout</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
