import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CustomModel from "@/app/src/components/CustomModel/CustomModel";

import { useSelector } from "react-redux";
import HeaderNew from "@/app/src/layout/Header/HeaderNew";
import Image from "next/image";

import axios from "axios";
import toast from "react-hot-toast";
import Link from 'next/link';
import { useTheme } from "../../provider";
import { toastText } from "@/constants/text-constants";
import FeatureSection from "../FeatureSection";
import BlogSection from "../BlogSection";
import SubScriptionSection from "../SubScriptionSection";
import FooterNew from "../../FooterNew";
import Spinner from "@/app/src/ui/Spinner";

const MainSection = () => {
    const theme = useTheme();
    const router = useRouter();
    const [input, setInput] = useState("");
    const { user, token } = useSelector((state) => state.auth);
    const [spinner, setSpinner] = useState(false);

    const handleChange = (evt) => {
        const val = evt.target?.value;

        setInput(val);
    };

    const handleFocus = () => {
        if (!user) {
            router.push('/login');
            return;
        }
    };

    const handleSearchChatbot = async () => {
        if (!user) {
            router.push("/login");
            return;
        }

        setSpinner(true);

        const formData = {
            input: input,
        };

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/chat`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                router.push(`/chat/${response.data.id}`);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSpinner(false);
        }
    };
    const [isOpen, setIsOpen] = useState(false);


    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <section className="text-white bg-contain bg-no-repeat bg-[url('/images/mobileHomeBg.png')] lg:bg-[url('/images/homeBgFull1.png')]" >
            <div className="relative flex flex-col items-center justify-center min-w-screen sm:pt-32 pt-20 pb-8">
                <h1 className="text-[32px] sm:text-[80px] font-bold text-center tracking-tight">Unlock the <span className="text-additional-purple">Power of AI</span></h1>
                <h5 className="text-base sm:text-2xl font-bold text-center mb-8 w-[85%] sm:w-[50%]">Don&apos;t waste time researching AI tools for your business. Our AI system does it all in a matter of seconds. For free.</h5>

                {/* Search and Prompt Guidelines */}
                {spinner ? (
                    <div className="
                        flex 
                        items-center 
                        justify-center
                        rounded-md 
                        w-full
                        max-w-[85%] 
                        sm:max-w-[570px] 
                        p-2 
                        mb-14
                    ">
                    <Spinner />
                    </div>
                ) : (
                    <div className="
                            flex 
                            items-center 
                            bg-[#1e1e1e] 
                            rounded-md 
                            w-full 
                            border 
                            border-[rgba(255,255,255,0.2)] 
                            focus-within:border-[#8B60B2] 
                            max-w-[85%] 
                            sm:max-w-[570px] 
                            p-2 
                            mb-14 
                            transition-colors 
                            duration-200 
                            ease-in-out
                        ">
                        {/* Search Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="white"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z"
                            />
                        </svg>

                        {/* Input Field */}
                        <input
                            type="text"
                            placeholder="Describe your AI tool use case in detail.."
                            className="bg-[#1e1e1e] focus:bg-transparent focus:outline-none focus:border-none focus:ring-0 focus:shadow-none text-gray-300 text-sm w-full border-none placeholder-gray-500"
                            onChange={handleChange}
                            value={input}
                            onFocus={handleFocus}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSearchChatbot();
                                }
                            }}
                        />
                    </div>
                )}

                <div onClick={openModal} className="bg-[#323639] text-white p-[20px] mx-[30px] border border-[rgba(255,255,255,0.2)] rounded-lg max-w-full sm:hidden relative">
                    <h5 className="font-bold text-2xl mr-[6px] mb-2">How to Prompt our Chatbot Effectively</h5>
                    <p className="text-sm">We’ve designed our chatbot to provide accurate, relevant AI tool recommendations. <Link href='/about' className="text-[#BF96E4]"> Learn more</Link></p>
                    {/* Question mark icon for opening modal */}
                    <div
                        className="absolute top-4 right-4 text-white rounded-full p-1"
                    >
                        <svg width="15" height="16" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.875 6.5C10.875 4.76562 9.9375 3.17188 8.4375 2.28125C6.91406 1.41406 5.0625 1.41406 3.5625 2.28125C2.03906 3.17188 1.125 4.76562 1.125 6.5C1.125 8.25781 2.03906 9.85156 3.5625 10.7422C5.0625 11.6094 6.91406 11.6094 8.4375 10.7422C9.9375 9.85156 10.875 8.25781 10.875 6.5ZM0 6.5C0 4.36719 1.125 2.39844 3 1.32031C4.85156 0.242188 7.125 0.242188 9 1.32031C10.8516 2.39844 12 4.36719 12 6.5C12 8.65625 10.8516 10.625 9 11.7031C7.125 12.7812 4.85156 12.7812 3 11.7031C1.125 10.625 0 8.65625 0 6.5ZM3.9375 4.8125C3.9375 4.10938 4.52344 3.5 5.25 3.5H6.5625C7.38281 3.5 8.0625 4.17969 8.0625 5C8.0625 5.51562 7.75781 6.00781 7.3125 6.26562L6.5625 6.71094V6.875V7.4375H5.4375V6.875V6.38281V6.05469L5.71875 5.89062L6.75 5.30469C6.86719 5.23438 6.9375 5.11719 6.9375 5C6.9375 4.78906 6.77344 4.64844 6.5625 4.64844H5.25C5.13281 4.64844 5.0625 4.71875 5.0625 4.83594V4.97656H3.9375V4.8125ZM5.4375 8.375H6.5625V9.5H5.4375V8.375Z" fill="white" />
                        </svg>

                    </div>
                </div>

                {/* Modal that opens on click */}
                <CustomModel isOpen={isOpen} onClose={closeModal} className="relative z-50">
                    <div className="grid grid-cols-1 rounded-[5px] bg-[#323639] p-[20px_10px_20px_10px] border-bottom-except-last">
                        <div className="px-[10px] py-[25px]">
                            <h5 className="font-bold text-2xl mr-[6px] mb-2">How to Prompt our Chatbot Effectively</h5>
                            <p className="text-sm">We’ve designed our chatbot to provide accurate, relevant AI tool recommendations. <Link href='/about' className="text-[#BF96E4]"> Learn more</Link></p>
                        </div>
                        <div className="px-[10px] py-[25px] flex justify-between">
                            <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">1</div>
                            <div className="max-w-[80%]">
                                <h6 className="font-semibold text-lg mb-2">INTRODUCTION / OVERVIEW</h6>
                                <p className="text-sm">Briefly describe your business or task.</p>
                            </div>
                        </div>
                        <div className="px-[10px] py-[25px] flex justify-between">
                            <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">2</div>
                            <div className="max-w-[80%]">
                                <h6 className="font-semibold text-lg mb-2">SPECIFIC USE CASE/TASK</h6>
                                <p className="text-sm">Clearly state the specific need or task for which you are seeking AI assistance. </p>
                            </div>
                        </div>
                        <div className="px-[10px] py-[25px] flex justify-between">
                            <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">3</div>
                            <div className="max-w-[80%]">
                                <h6 className="font-semibold text-lg mb-2">DESIRED OUTCOME/GOALS</h6>
                                <p className="text-sm">Mention what you aim to achieve with the AI tool.</p>
                            </div>
                        </div>
                        <div className="px-[10px] py-[25px] flex justify-between">
                            <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">4</div>
                            <div className="max-w-[80%]">
                                <h6 className="font-semibold text-lg mb-2">ADDITIONAL DETAILS</h6>
                                <p className="text-sm">Include any additional relevant information such as industry specifics, current challenges, or technical requirements.</p>
                            </div>
                        </div>
                    </div>
                </CustomModel>

                {/* Desktop version: Full content */}
                <div className="hidden sm:grid sm:grid-cols-5 mx-[30px] tracking-wide sm:mx-[135px] rounded-[5px] bg-[#323639] border border-[rgba(255,255,255,0.2)] p-[20px_10px_20px_10px] border-right-except-last overflow-hidden">
                    <div className="p-4 sm:col-span-1">
                        <h5 className="font-semibold text-2xl mr-[6px] mb-2">How to Prompt our Chatbot Effectively</h5>
                        <p className="text-sm">We’ve designed our chatbot to provide accurate, relevant AI tool recommendations. <Link href='/about' className="text-[#BF96E4]"> Learn more</Link></p>
                    </div>
                    <div className="p-4 sm:col-span-1">
                        <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">1</div>
                        <h6 className="font-semibold text-lg mb-2">INTRODUCTION / OVERVIEW</h6>
                        <p className="text-sm">Briefly describe your business or task.</p>
                    </div>
                    <div className="p-4 sm:col-span-1">
                        <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">2</div>
                        <h6 className="font-semibold text-lg mb-2">SPECIFIC USE CASE/TASK</h6>
                        <p className="text-sm">Clearly state the specific need or task for which you are seeking AI assistance. </p>
                    </div>
                    <div className="p-4 sm:col-span-1">
                        <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">3</div>
                        <h6 className="font-semibold text-lg mb-2">DESIRED OUTCOME/GOALS</h6>
                        <p className="text-sm">Mention what you aim to achieve with the AI tool.</p>
                    </div>
                    <div className="p-4 sm:col-span-1">
                        <div className="text-white inline-flex items-center justify-center border border-white rounded-full w-10 h-10 mb-2">4</div>
                        <h6 className="font-semibold text-lg mb-2">ADDITIONAL DETAILS</h6>
                        <p className="text-sm">Include any additional relevant information such as industry specifics, current challenges, or technical requirements.</p>
                    </div>
                </div>

                <p className="text-center text-sm sm:text-lg mt-4 sm:mt-8 mx-[30px] sm:w-[55%] block tracking-wider font-semibold">We only include high-quality, business-grade AI tools & software in our directory. <Link href='/about' className="text-[#BF96E4]"> Learn more</Link> about our rigorous approval and verification process</p>
            </div>
            <div className="px-[30px] sm:px-[135px]">
                <FeatureSection />
                <BlogSection />
                {/* <SubScriptionSection /> */}
            </div>
        </section>
    );
};

export default MainSection;
