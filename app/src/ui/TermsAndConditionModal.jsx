"use client";
import React from "react";
import { useTheme } from "../layout/provider";
import htmlContentDark from '@/lib/t&c-dark.html'
import htmlContentWhite from '@/lib/t&c-white.html'

const TermsAndConditionModal = ({ isModalOpen, closeModal }) => {
  const theme = useTheme();

  return (
    <div
      id="default-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`${
        isModalOpen ? "flex" : "hidden"
      } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-[9999] justify-center items-center w-full md:inset-0 h-modal h-full md:h-full bg-gray-800 bg-opacity-50 pt-[30px] md:pt-[130px]`}
    >
      <div className="relative w-11/12 2xl:w-[800px] mt-12 sm:mt-0 h-[500px] sm:h-[600px] md:h-[700px] rounded-2xl overflow-x-hidden">
        <div className="relative bg-white rounded-lg shadow  dark:bg-slate-950">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              TERMS AND CONDITIONS
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <div className="p-2 md:px-10 overflow-y-scroll h-[500px]">
            {theme.mode === "light" ? (
              <div dangerouslySetInnerHTML={{ __html: htmlContentWhite }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: htmlContentDark }} />
            )}
          </div>

          <div className="flex items-center justify-end p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="default-modal"
              type="button"
              className="text-white bg-custom-blue-light hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:bg-custom-blue-dark transform transition-all duration-150 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionModal;
