import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AlternativeComponet = ({ data }) => {
  const router = useRouter();
  const handleRedirectToDirectoryPage = (directorySlug) => {
    window.open(`/directories/${directorySlug}`, "_blank");
  };

  return (
    <div className="flex flex-row md:grid md:grid-cols-2 gap-5 rounded-md flex-wrap md:flex-nowrap">
      {data.map((rec, index) =>
        rec.directory ? (
          <div
            key={index}
            className=" max-w-96 bg-white dark:bg-slate-950 p-5 rounded-md shadow-md flex justify-between flex-col"
          >
            <div className="">
              <div className=" flex gap-2 items-center mb-4">
                <div className="w-12 h-12 md:w-14 md:h-14 flex justify-center items-center border border-gray-300 dark:border-gray-800 rounded-lg relative">
                  <Image
                    width={100}
                    height={100}
                    alt="Directory Icon"
                    src={rec.directory.icon}
                    className=" p-2"
                  />
                </div>
                <div>
                  <h1 className=" text-xl font-medium text-black dark:text-white">
                    {rec.directory.name}
                  </h1>
                </div>
              </div>
              <p className=" mb-5 text-black dark:text-white">
                {rec.description}
              </p>
            </div>
            <div className="w-40 ml-auto">
              <div
                onClick={() =>
                  handleRedirectToDirectoryPage(rec.directory.slug)
                }
                className="justify-center text-sm font-medium disabled:pointer-events-none cursor-pointer text-ice-500 hover:bg-blue-600 hover:text-white h-8 md:h-10 px-4 py-2 flex items-center gap-2 rounded-lg border-2 border-blue-600 transform duration-200"
              >
                <span className="text-lg font-normal dark:text-slate-100 ">
                  Get Started
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
              </div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="max-w-96 bg-white dark:bg-slate-950 p-5 rounded-md shadow-md"
          >
            <p className="dark:text-white text-black">
              This AI tool has been removed from the directory
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default AlternativeComponet;
