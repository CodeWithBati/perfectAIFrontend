"use client";
import React, { useState, useEffect, useRef } from "react";
import Container from "@/app/src/components/global/Container";
import Section from "@/app/src/components/global/Section";
import { useSelector } from "react-redux";
import UsersLists from "@/app/src/components/Dashboard/UsersLists";
import Button from "../global/Button";
import axios from "axios";
import toast from "react-hot-toast";

const DirectoryUsersMainPageView = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [MenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const toggleExportMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  const handleExport = async (key) => {
    setMenuVisible(false);
    const toastId = toast.loading("Downloading the files");

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/export?role=${key}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Section className="px-3 py-6 mt-20">
      {user?.role === "admin" && (
        <Container>
          <div className="mb-7 flex justify-between items-center -mx-3">
            <div className="px-3 flex items-center justify-between w-full">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                All Users
              </h2>

              <div className="relative" ref={menuRef}>
                <Button
                  onClick={toggleExportMenu}
                  className="bg-blue-600 text-white hover:bg-blue-800"
                >
                  Export
                </Button>

                {MenuVisible && (
                  <div
                    id="profile-menu"
                    className="absolute top-12 z-50 right-0 min-w-[170px]"
                  >
                    <div className="bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800 rounded-lg">
                      <ul className="py-2 border-t border-slate-200 dark:border-slate-800 list-none">
                        <li>
                          <p
                            onClick={() => handleExport("user")}
                            className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2 cursor-pointer"
                          >
                            <span>Export User Data</span>
                          </p>
                        </li>
                        <li>
                          <p
                            onClick={() => handleExport("creator")}
                            className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2 cursor-pointer"
                          >
                            <span>Export Creator Data</span>
                          </p>
                        </li>
                        <li>
                          <p
                            onClick={() => handleExport("both")}
                            className="flex text-xs px-4 py-2 font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:dark:text-blue-600 transition-all gap-2 cursor-pointer"
                          >
                            <span>Export All Data</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <UsersLists />
        </Container>
      )}
    </Section>
  );
};

export default DirectoryUsersMainPageView;
