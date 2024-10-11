"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Spinner from "../../ui/Spinner";
import DirectoryCarousel from "./DirectoryCarousel";
import StarsRating from "../../ui/StarsRating";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { BookmarkIcon as OutlineBookMarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as FillBookMarkIcon } from "@heroicons/react/24/solid";
import FeaturedSideBar from "./FeaturedSideBar/FeaturedSideBar";
import DOMPurify from "dompurify";
import "./Directory.module.css";
import { useRouter } from "next/navigation";
import { toastText } from "@/constants/text-constants";

const DirectoryView = ({ dir }) => {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();
  const [directorySaveStatus, setDirectorySaveStatus] = useState(dir?.hasSaved);
  const [directorySaves, setDirectorySaves] = useState(dir.saves)

  const handleToggleSaved = async (event) => {
    event.stopPropagation();

    if (!user) {
      toast.error(toastText.error.savingWithoutLogin);
      router.push("/login");
      return;
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/directories/${dir.id}/saves`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      setDirectorySaveStatus(!directorySaveStatus);
      if (directorySaveStatus) {
        setDirectorySaves(prevState => prevState - 1)
        toast.success(toastText.success.removedFromSaveList);
      } else {
        setDirectorySaves(prevState => prevState + 1)
        toast.success(toastText.success.addToSaveList);
      }
    } else {
      toast.error(toastText.error.directoryNotSaved);
    }
  };

  return (
    <div className=" mt-12">
      {Object.keys(dir).length === 0 ? (
        <div className=" flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className=" md:grid md:grid-cols-4 ">
          <div className="md:col-span-3 p-2 md:p-5">
            <div className="">
              <div className=" grid md:grid-cols-2">
                <div className="flex flex-row items-center gap-10">
                  <div className=" flex flex-row gap-5 items-center">
                    <div className="max-w-16 max-h-16 md:w-20 md:h-20 flex justify-center items-center border border-gray-300 dark:border-gray-800 rounded-lg relative">
                      <Image
                        width={100}
                        height={100}
                        alt="Directory Icon"
                        src={dir.icon}
                        className=" p-2"
                      />
                      <svg
                        className={`absolute -right-2 -top-2 ${
                          dir.isVerified ? "" : "invisible"
                        }`}
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.6453 7.03281C16.3508 6.725 16.0461 6.40781 15.9312 6.12891C15.825 5.87344 15.8187 5.45 15.8125 5.03984C15.8008 4.27734 15.7883 3.41328 15.1875 2.8125C14.5867 2.21172 13.7227 2.19922 12.9602 2.1875C12.55 2.18125 12.1266 2.175 11.8711 2.06875C11.593 1.95391 11.275 1.64922 10.9672 1.35469C10.4281 0.836719 9.81563 0.25 9 0.25C8.18437 0.25 7.57266 0.836719 7.03281 1.35469C6.725 1.64922 6.40781 1.95391 6.12891 2.06875C5.875 2.175 5.45 2.18125 5.03984 2.1875C4.27734 2.19922 3.41328 2.21172 2.8125 2.8125C2.21172 3.41328 2.20312 4.27734 2.1875 5.03984C2.18125 5.45 2.175 5.87344 2.06875 6.12891C1.95391 6.40703 1.64922 6.725 1.35469 7.03281C0.836719 7.57188 0.25 8.18437 0.25 9C0.25 9.81563 0.836719 10.4273 1.35469 10.9672C1.64922 11.275 1.95391 11.5922 2.06875 11.8711C2.175 12.1266 2.18125 12.55 2.1875 12.9602C2.19922 13.7227 2.21172 14.5867 2.8125 15.1875C3.41328 15.7883 4.27734 15.8008 5.03984 15.8125C5.45 15.8187 5.87344 15.825 6.12891 15.9312C6.40703 16.0461 6.725 16.3508 7.03281 16.6453C7.57188 17.1633 8.18437 17.75 9 17.75C9.81563 17.75 10.4273 17.1633 10.9672 16.6453C11.275 16.3508 11.5922 16.0461 11.8711 15.9312C12.1266 15.825 12.55 15.8187 12.9602 15.8125C13.7227 15.8008 14.5867 15.7883 15.1875 15.1875C15.7883 14.5867 15.8008 13.7227 15.8125 12.9602C15.8187 12.55 15.825 12.1266 15.9312 11.8711C16.0461 11.593 16.3508 11.275 16.6453 10.9672C17.1633 10.4281 17.75 9.81563 17.75 9C17.75 8.18437 17.1633 7.57266 16.6453 7.03281ZM12.5672 7.56719L8.19219 11.9422C8.13414 12.0003 8.06521 12.0464 7.98934 12.0779C7.91346 12.1093 7.83213 12.1255 7.75 12.1255C7.66787 12.1255 7.58654 12.1093 7.51066 12.0779C7.43479 12.0464 7.36586 12.0003 7.30781 11.9422L5.43281 10.0672C5.31554 9.94991 5.24965 9.79085 5.24965 9.625C5.24965 9.45915 5.31554 9.30009 5.43281 9.18281C5.55009 9.06554 5.70915 8.99965 5.875 8.99965C6.04085 8.99965 6.19991 9.06554 6.31719 9.18281L7.75 10.6164L11.6828 6.68281C11.7409 6.62474 11.8098 6.57868 11.8857 6.54725C11.9616 6.51583 12.0429 6.49965 12.125 6.49965C12.2071 6.49965 12.2884 6.51583 12.3643 6.54725C12.4402 6.57868 12.5091 6.62474 12.5672 6.68281C12.6253 6.74088 12.6713 6.80982 12.7027 6.88569C12.7342 6.96156 12.7503 7.04288 12.7503 7.125C12.7503 7.20712 12.7342 7.28844 12.7027 7.36431C12.6713 7.44018 12.6253 7.50912 12.5672 7.56719Z"
                          fill="#49ADFF"
                        ></path>
                      </svg>
                    </div>
                    <h1 className=" dark:text-white text-2xl md:text-4xl font-semibold">
                      {dir.name}
                    </h1>
                  </div>
                  <Link
                    href={dir.website ?? "#"}
                    target="_blank"
                    className="justify-center text-sm font-medium disabled:pointer-events-none text-ice-500 hover:bg-blue-600 hover:text-white h-7 md:h-10 px-4 py-1 flex items-center gap-2 rounded-lg border-2 border-blue-600 transform duration-200"
                  >
                    <span className="text-sm md:text-lg font-normal dark:text-slate-100 ">
                      Visit
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="3"
                      height="3"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 dark:text-slate-100"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" x2="21" y1="14" y2="3"></line>
                    </svg>
                  </Link>
                </div>
                <div className="flex flex-row items-center justify-between md:justify-end gap-20">
                  <div className=" flex flex-row justify-between items-center">
                    <div className=" my-3 text-yellow-500 flex items-center gap-2 ">
                      <StarsRating starsCount={dir?.averageRating} />{" "}
                      <span className=" dark:text-white text-slate-800">
                        ({dir.reviews})
                      </span>
                    </div>
                  </div>
                  <div className=" flex gap-1">
                    <p className=" dark:text-slate-100 text-black">
                      ({directorySaves || 0})
                    </p>
                    {directorySaveStatus ? (
                      <button
                        onClick={handleToggleSaved}
                        className="h-6 cursor-pointer dark:text-white"
                      >
                        <FillBookMarkIcon className="h-6 " />
                      </button>
                    ) : (
                      <button
                        onClick={handleToggleSaved}
                        className="h-6 cursor-pointer dark:text-white"
                      >
                        <OutlineBookMarkIcon className="h-6 " />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex items-start justify-between my-2 md:my-5">
              <div className=" flex flex-row gap-2 flex-wrap">
                {dir.categories?.map((cat, index) => (
                  <div
                    key={index}
                    className=" bg-slate-600 text-white inline dark:bg-slate-500 px-4 py-1 rounded-md text-sm dark:text-slate-200"
                  >
                    {cat}
                  </div>
                ))}
              </div>

              <div className=" flex justify-end flex-col items-end gap-3">
                {dir.type && (
                  <div className=" bg-custom-blue-light text-white inline dark:bg-custom-blue-dark px-4 py-1 rounded-md text-sm dark:text-white ">
                    {dir.type}
                  </div>
                )}
                {dir.type === "Paid" &&
                  dir.pricings.filter((rec) => rec.price !== 0).length !==
                    0 && (
                    <p className=" flex flex-row items-end gap-3 bg-gray-700 px-3 py-1 rounded-md ">
                      {dir.pricings
                        .filter((rec) => rec.price !== 0)
                        .map((rec, index) => (
                          <span key={index} className="text-sm text-white">
                            ${rec.price} / {rec.name}
                          </span>
                        ))}
                    </p>
                  )}
              </div>
            </div>
            <div className=" md:w-[550px] md:float-right">
              <DirectoryCarousel mediaItems={[...dir.images, ...dir.videos]} />
            </div>
            <div className="ql-snow">
              <div
                className={`ql-editor mt-6 prose dark:prose-dark inline`}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(dir.description),
                }}
              />
            </div>
          </div>
          <div className=" flex-1">
            <FeaturedSideBar />
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectoryView;
