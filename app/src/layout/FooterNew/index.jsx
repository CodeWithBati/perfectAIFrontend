"use client";
import Container from "@/app/src/components/global/Container";
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from "react";
import Terms from "../../components/Term&Conditions/Terms";
import PrivacyPolicy from "../../components/Privacy&Policy/PrivacyPolicy";

const Footer = () => {


  const [termModalOpen, setTermModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const openModalTerms = () => setTermModalOpen(true);
  const closeModalTerms = () => setTermModalOpen(false);
  const openModalPrivacy = () => setPrivacyModalOpen(true);
  const closeModalPrivacy = () => setPrivacyModalOpen(false);


  // useEffect(() => {
  //   const originalStyle = window.getComputedStyle(document.body).overflow;
  //   document.body.style.overflow = termModalOpen ? "hidden" : originalStyle;
  //   return () => (document.body.style.overflow = originalStyle);
  // }, [termModalOpen]);

  return (
    <footer className="text-white sm:px-[135px] bg-[#181C1F] ">
      <div className="mx-auto flex-col sm:flex-row justify-center items-center flex sm:justify-between items-start px-[30px] lg:px-0 py-8 border-t border-[rgba(255,255,255,0.2)]">
        {/* Left Side - Logo and Description */}
        <div className="flex flex-col sm:items-start items-center">
          <div className="flex items-center mb-4">
            <Image
              alt="website Logo"
              src={"/images/defaulticon4.png"}
              width={40}
              height={40}
              className="mx-auto rounded-[6.5px] mr-[10px]"
            />
            <span className="text-2xl font-semibold">myPerfectAI</span>
          </div>
          <p className="text-xs text-center max-w-[350px]">
            FindMyAITool is a website dedicated to providing a comprehensive list of AI tools to assist individuals and businesses in finding the most suitable AI tool for their specific requirements.
          </p>
        </div>

        {/* Right Side - Navigation and Social Icons */}
        <div className="flex flex-col items-center sm:justify-between space-y-6 sm:items-end h-full">
          {/* Navigation Links */}
          <div className="flex sm:flex-row flex-col items-center sm:items-end sm:space-x-6 space-y-6 mb-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm hover:underline">Home</Link>
            <Link href="#" className="text-sm hover:underline">About</Link>
            <Link href="#" className="text-sm hover:underline">Blogs</Link>
            <Link href="#" className="text-sm hover:underline">Pricing</Link>
            <p onClick={openModalPrivacy} href="#" className="text-sm hover:underline">Privacy Policy</p>
            <p onClick={openModalTerms} className="text-sm hover:underline">Terms and Conditions</p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 mb-4">
            <Link href="#" className="hover:text-purple-400">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" fill="white" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-purple-400">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0C12.717 0 13.056 0.00999994 14.122 0.0599999C15.187 0.11 15.912 0.277 16.55 0.525C17.21 0.779 17.766 1.123 18.322 1.678C18.8305 2.1779 19.224 2.78259 19.475 3.45C19.722 4.087 19.89 4.813 19.94 5.878C19.987 6.944 20 7.283 20 10C20 12.717 19.99 13.056 19.94 14.122C19.89 15.187 19.722 15.912 19.475 16.55C19.2247 17.2178 18.8311 17.8226 18.322 18.322C17.822 18.8303 17.2173 19.2238 16.55 19.475C15.913 19.722 15.187 19.89 14.122 19.94C13.056 19.987 12.717 20 10 20C7.283 20 6.944 19.99 5.878 19.94C4.813 19.89 4.088 19.722 3.45 19.475C2.78233 19.2245 2.17753 18.8309 1.678 18.322C1.16941 17.8222 0.775931 17.2175 0.525 16.55C0.277 15.913 0.11 15.187 0.0599999 14.122C0.0129999 13.056 0 12.717 0 10C0 7.283 0.00999994 6.944 0.0599999 5.878C0.11 4.812 0.277 4.088 0.525 3.45C0.775236 2.78218 1.1688 2.17732 1.678 1.678C2.17767 1.16923 2.78243 0.775729 3.45 0.525C4.088 0.277 4.812 0.11 5.878 0.0599999C6.944 0.0129999 7.283 0 10 0ZM10 5C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10C5 11.3261 5.52678 12.5979 6.46447 13.5355C7.40215 14.4732 8.67392 15 10 15C11.3261 15 12.5979 14.4732 13.5355 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5355 6.46447C12.5979 5.52678 11.3261 5 10 5ZM16.5 4.75C16.5 4.41848 16.3683 4.10054 16.1339 3.86612C15.8995 3.6317 15.5815 3.5 15.25 3.5C14.9185 3.5 14.6005 3.6317 14.3661 3.86612C14.1317 4.10054 14 4.41848 14 4.75C14 5.08152 14.1317 5.39946 14.3661 5.63388C14.6005 5.8683 14.9185 6 15.25 6C15.5815 6 15.8995 5.8683 16.1339 5.63388C16.3683 5.39946 16.5 5.08152 16.5 4.75ZM10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7Z" fill="white" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-purple-400">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.839 0H2.16104C0.967563 0 0 0.967563 0 2.16104V17.839C0 19.0324 0.967563 20 2.16104 20H17.839C19.0324 20 20 19.0324 20 17.839V2.16104C20 0.967563 19.0324 0 17.839 0ZM12.7566 16.9604L9.0401 11.5514L4.38696 16.9604H3.18435L8.50611 10.7746L3.18435 3.02934H7.24336L10.7627 8.15126L15.1689 3.02934H16.3715L11.2968 8.92828H11.2965L16.8156 16.9604H12.7566Z" fill="white" />
              </svg>
            </Link>
            <Link href="#" className="hover:text-purple-400">
              <svg width="21" height="22" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 0.5H1.49531C0.670312 0.5 0 1.17969 0 2.01406V19.9859C0 20.8203 0.670312 21.5 1.49531 21.5H19.5C20.325 21.5 21 20.8203 21 19.9859V2.01406C21 1.17969 20.325 0.5 19.5 0.5ZM6.34687 18.5H3.23438V8.47812H6.35156V18.5H6.34687ZM4.79062 7.10938C3.79219 7.10938 2.98594 6.29844 2.98594 5.30469C2.98594 4.31094 3.79219 3.5 4.79062 3.5C5.78437 3.5 6.59531 4.31094 6.59531 5.30469C6.59531 6.30312 5.78906 7.10938 4.79062 7.10938ZM18.0141 18.5H14.9016V13.625C14.9016 12.4625 14.8781 10.9672 13.2844 10.9672C11.6625 10.9672 11.4141 12.2328 11.4141 13.5406V18.5H8.30156V8.47812H11.2875V9.84687H11.3297C11.7469 9.05937 12.7641 8.22969 14.2781 8.22969C17.4281 8.22969 18.0141 10.3062 18.0141 13.0062V18.5Z" fill="white" />
              </svg>
            </Link>
          </div>
          <p className="text-sm text-white mt-4">
            © 2024. Crafted By <Link href="#" className="text-purple-400 hover:underline">MyPerfectAI</Link>
          </p>
        </div>
      </div>
      <Terms isOpen={termModalOpen} onClose={closeModalTerms} />
      <PrivacyPolicy isOpen={privacyModalOpen} onClose={closeModalPrivacy} />
    </footer>

  );
};

export default Footer;
