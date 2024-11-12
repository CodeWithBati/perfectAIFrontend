'use client'
import { useEffect, useState, useRef, useCallback } from "react";
import Section from "@/app/src/components/global/Section";

import VerticalStepper from "@/app/src/components/ChatBot/VerticalStepper";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/src/components/global/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedSideBar from "@/app/src/components/Directories/FeaturedSideBar/FeaturedSideBar";
import withDynamicFavicon from "@/app/src/hoc/withDynamicFavicon";
import { useTheme } from "@/app/src/layout/provider";
import Spinner from "@/app/src/ui/Spinner";
import Head from "next/head";
import { toastText } from "@/constants/text-constants";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Link from 'next/link';
import Image from "next/image"
import feat2 from '../../../../public/images/feat2.jpeg'
import FeatureCard from "../../layout/HomeNew/FeatureSection/FeatureCard"

import Cards from "./Cards"
import clsx from 'clsx';
import StarRating from "../StarRating";
import AlternativeFeatureCard from "./AlternativeFeatureCard";
import MobileFeature from "../DirectoryNew/keyFeature/MobileFeature";


function ChatBotResult({ ChatKey }) {
  const theme = useTheme();

  const [chatData, setChatData] = useState([]);
  const [input, setInput] = useState("");
  const [shareableLink, setShareableLink] = useState("");
  const [directories, setDirectories] = useState([]);
  const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const { user, token } = useSelector((state) => state.auth);
  const [isExpanded, setIsExpanded] = useState(false);


  const textRef = useRef(null);
  const router = useRouter();
  const loadingRef = useRef(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const fetchSites = useCallback(async () => {
    if (page > totalPages || loadingRef.current) return;

    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    setExtractMoreSpinner(true);
    loadingRef.current = true;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=10&isFeatured=true`,
        config
      );
      if (response.status === 200) {
        setDirectories((prevSites) =>
          page === 1
            ? response.data.results
            : [...prevSites, ...response.data.results]
        );
        setTotalPages(response.data.pagination.totalPages);
      } else {
        console.error("error-->", response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setExtractMoreSpinner(false);
      loadingRef.current = false;
    }
  }, [page, totalPages, token]);

  const handleScroll = () => {
    const threshold = 110;
    if (window.scrollY > threshold) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  useEffect(() => {
    fetchSites();
  }, [page, fetchSites]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast.error(toastText.error.loginFirst);
    }
  }, [user, router]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/${ChatKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setChatData(response.data.outputs);
          setInput(response.data.input);
          setShareableLink(response.data.shareableLink);
        } else {
          console.log("error fetching the record");
        }
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 400) {
          router.push("/chatNotFound");
        }
        console.log("error->", error);
      }
    })();
  }, [ChatKey, token, router]);

  const copyTextToClipboard = async (textToCopy) => {
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success(toastText.success.linkCopied);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      console.error("Clipboard API not available.");
    }
  };


  return chatData.length === 0 ? (
    <div className="mt-20 md:mt-40 flex justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <section className={`
    relative flex flex-col items-center justify-center min-w-screen min-h-screen 
    sm:pt-32 pt-20 pb-8 text-white bg-no-repeat bg-[#181C1F] 
    lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]
    ${isFixed ? 'pt-[300px]' : 'pt-20'}
  `}>
      <div className={`${isFixed ? 'fixed z-10 top-[70px] lg:hidden w-[85%] bg-[#323639] border border-[rgba(255,255,255,0.2)] px-[30px] rounded-lg' : 'hidden'}`} >
        <div className='flex items-center justify-between mt-4'>
          <Link href='/' className="mb-4 py-[10px] text-sm font-bold text-white hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5" />
            </svg>
          </Link>
          <Link href='/' className='mb-4 bg-[#8B60B2] p-[10px] rounded-[5px] text-sm font-bold text-white hover:text-white'>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0.5V11.5H5V0.5H16ZM2 5.5H4V7.5H2V14.5H9V12.5H11V14.5V16.5H9H2H0V14.5V7.5V5.5H2Z" fill="white" />
            </svg>
          </Link>
        </div>

        <div className="bg-[#323639] rounded-lg mb-4">
          {/* Recommendations */}
          <div className="mt-0">
            <h3 className="font-semibold text-lg mb-2 font-bold text-white">AI tool recommendations:</h3>
            <div className="flex space-x-2 text-sm overflow-x-auto no-scrollbar">
              {chatData.map((rec, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedTaskIndex(index)}
                  className={clsx(
                    "flex-shrink-0 w-1/2 text-center bg-[#8B60B2] font-bold text-xs py-2 px-4 rounded-[5px] text-white transition-colors duration-200",
                    selectedTaskIndex === index ? "bg-[#8B60B2]" : "bg-[#323639]"
                  )}
                >
                  {rec?.taskTitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen text-white w-full"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 0px, transparent 1000px, #181C1F 500px, #181C1F 100%)',
        }}>
        <h4 className="text-wrap lg:max-w-4xl text-base lg:text-2xl mx-[30px] lg:mx-auto tracking-wider text-center lg:font-bold">We’ve designed our AI system to provide accurate, relevant AI tool recommendations.<Link href='/about' className="text-[#BF96E4] font-bold"> Learn more</Link> </h4>
        <div className="px-[30px] lg:px-[135px] w-full mt-8 rounded-lg text-white">

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 ">
            <div className="hidden lg:sticky lg:h-[100%] lg:top-10 lg:block lg:w-1/4 px-6 rounded-lg">
              <Link href='/' className="flex items-center bg-[#323639] border border-[rgba(255,255,255,0.2)] px-[20px] py-[10px] rounded-[5px] mb-4 text-sm font-bold text-white hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5" />
                </svg>
                Back for another search
              </Link>
              <div className="bg-[#323639] p-6 rounded-lg">
                {input &&
                  <div className="mb-4">
                    <p className={`text-white text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {input}
                    </p>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[#BF96E4] text-sm font-bold focus:outline-none"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                }

                {/* Share link button */}
                <button onClick={() => copyTextToClipboard(shareableLink)} className="flex items-center py-2 px-4 bg-[#8B60B2] text-base text-white rounded-[5px] font-semibold mb-6 gap-2">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.5V11.5H5V0.5H16ZM2 5.5H4V7.5H2V14.5H9V12.5H11V14.5V16.5H9H2H0V14.5V7.5V5.5H2Z" fill="white" />
                  </svg>

                  Share link
                </button>

                {/* Recommendations */}
                <div className="mt-4 border-t border-t-[rgba(255,255,255,0.2)]">
                  <h3 className="text-sm font-semibold text-lg mb-2 mt-4 font-bold text-white">AI tool recommendations:</h3>
                  <div className="space-y-4 text-sm">
                    {chatData.map((rec, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTaskIndex(index)}
                        className={clsx(
                          "w-full text-left py-2 px-4 rounded-[5px] text-white flex items-center gap-2 justify-between transition-colors duration-200",
                          selectedTaskIndex === index ? "bg-[#8B60B2]" : "bg-[#1e1e1e]"
                        )}
                      >
                        {rec?.taskTitle}
                        <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0 }}>
                          <path d="M8.40625 7L7.6875 7.71875L2.6875 12.7188L2 13.4375L0.5625 12L1.28125 11.3125L5.5625 7L1.28125 2.71875L0.5625 2L2 0.59375L2.6875 1.3125L7.6875 6.3125L8.40625 7Z" fill="white" />
                        </svg>
                      </button>
                    ))}
                  </div>

                </div>
              </div>
            </div>
            <div className={`${isFixed ? 'hidden w-full bg-[#323639] border border-[rgba(255,255,255,0.2)] px-[30px] rounded-lg' : 'block lg:hidden w-full bg-[#323639] border border-[rgba(255,255,255,0.2)] px-[30px] rounded-lg'}`}>
              <div className='flex items-center justify-between mt-4'>
                <Link href='/' className="mb-4 py-[10px] text-sm font-bold text-white hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5" />
                  </svg>
                </Link>
                <Link href='/' className='mb-4 bg-[#8B60B2] p-[10px] rounded-[5px] text-sm font-bold text-white hover:text-white'>
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.5V11.5H5V0.5H16ZM2 5.5H4V7.5H2V14.5H9V12.5H11V14.5V16.5H9H2H0V14.5V7.5V5.5H2Z" fill="white" />
                  </svg>
                </Link>
              </div>

              <div className="bg-[#323639] rounded-lg mb-4">
                {input &&
                  <div className="mb-4">
                    <p className={`text-white text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {input}
                    </p>
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-[#BF96E4] text-sm font-bold focus:outline-none"
                    >
                      {isExpanded ? 'Show less' : 'Show more'}
                    </button>
                  </div>
                }

                {/* Recommendations */}
                <div className="mt-4 border-t border-t-[rgba(255,255,255,0.2)]">
                  <h3 className="text-sm font-semibold text-lg mb-2 mt-4 font-bold text-white">AI tool recommendations:</h3>
                  <div className="flex space-x-2 text-sm overflow-x-auto no-scrollbar">
                    {chatData.map((rec, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedTaskIndex(index)}
                        className={clsx(
                          "flex-shrink-0 w-1/2 text-center bg-[#8B60B2] font-bold text-xs py-2 px-4 rounded-[5px] text-white transition-colors duration-200",
                          selectedTaskIndex === index ? "bg-[#8B60B2]" : "bg-[#323639]"
                        )}
                      >
                        {rec?.taskTitle}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {chatData.length > 0 &&
              <div className="w-full lg:w-2/4">
                <p className="text-base lg:text-lg mb-4 lg:font-bold">{chatData[selectedTaskIndex]?.taskTitle}</p>
                <div className="flex items-center space-x-4 mb-4">
                  <Image alt="Writesonic" src={chatData[selectedTaskIndex]?.recommended?.directory?.icon} width={100} height={100} quality={100} className="object-cover w-16 h-16 rounded-lg" />
                  <div>
                    <h2 className="text-lg lg:text-2xl font-semibold">{chatData[selectedTaskIndex]?.recommended?.directory?.name}</h2>
                    <div className="flex items-center text-2xl space-x-1 text-[#8B60B2]">
                      {/* <StarRating rating={chatData[selectedTaskIndex]?.recommended?.directory?.rating} /> */}
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="save w-full flex gap-4 mb-4">
                  <button className='flex items-center w-full lg:w-auto p-2 h-[41px] justify-center text-white font-bold rounded-[5px] bg-[#323639]'>
                    <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                      <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                    </svg>

                    Save
                  </button>
                  <button onClick={() => window.open(chatData[selectedTaskIndex]?.recommended?.directory?.website, '_blank')} className='flex w-full lg:w-auto items-center justify-center p-2 h-[41px] bg-[#8B60B2] font-bold rounded-[5px]'>
                    <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                      <path d="M9 0.5H13H14V1.5V5.5V6.5H12V5.5V3.9375L6.6875 9.21875L6 9.9375L4.5625 8.5L5.28125 7.8125L10.5625 2.5H9H8V0.5H9ZM1 1.5H5H6V3.5H5H2V12.5H11V9.5V8.5H13V9.5V13.5V14.5H12H1H0V13.5V2.5V1.5H1Z" fill="white" />
                    </svg>

                    Visit website
                  </button>
                </div>

                <h2 className='text-lg font-bold tracking-wider text-left mb-4 lg:hidden block'>App Feature</h2>
                <div className="relative w-full lg:hidden ">
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1.7}
                    modules={[Navigation]}
                    loop={false}
                    navigation={{
                      nextEl: '.swiper-button-next-custom',
                      prevEl: '.swiper-button-prev-custom',
                    }}
                    breakpoints={{
                      // When window width is >= 640px (mobile screen)
                      200: {
                        slidesPerView: 1.7,
                        spaceBetween: 30,
                      },
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {directories?.map((tool, i) => (
                      <SwiperSlide className='rounded-lg shadow-lg' key={i}>
                        <MobileFeature directory={tool} />
                      </SwiperSlide>

                    ))}
                  </Swiper>
                </div>

                {/* Why it's perfect */}
                <div className="relative p-4 rounded-[5px] mb-6 overflow-hidden lg:min-h-[175px]"
                  style={{
                    background: `
                    radial-gradient(44.73% 130.73% at 104% 7.76%, rgb(147, 95, 175) 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%) center center / cover no-repeat, radial-gradient(73.73% 157.73% at 13% 28.76%, rgb(53, 60, 131) 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%) no-repeat, no-repeat rgb(30, 30, 30)
                    `,
                    backgroundBlendMode: 'lighten, lighten, normal',
                    backgroundRepeat: 'no-repeat, no-repeat, no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="relative z-5">
                    <div className="flex items-center gap-4 mb-2">
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 16.5C3.5625 16.5 0 12.9375 0 8.5C0 4.09375 3.5625 0.5 8 0.5C12.4062 0.5 16 4.09375 16 8.5C16 12.9375 12.4062 16.5 8 16.5ZM9.46875 6.5L8 3.5L6.53125 6.5L3.21875 6.96875L5.625 9.28125L5.0625 12.5625L8 11L10.9375 12.5625L10.375 9.28125L12.75 6.96875L9.46875 6.5Z" fill="white" />
                      </svg>
                      <h3 className="text-lg lg:text-2xl font-semibold">Why it&apos;s Perfect for your task</h3>
                    </div>
                    <ul className="list-disc space-y-4 text-sm ml-6">
                      {chatData[selectedTaskIndex]?.why?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tool description */}
                <p className="text-white text-sm mb-8">
                  {chatData[selectedTaskIndex]?.recommended?.description}
                </p>

                {/* Pricing information */}
                <h3 className="text-2xl font-semibold mb-2">Pricing information</h3>
                <p className="text-white text-sm mb-8">
                  {chatData[selectedTaskIndex]?.pricing}
                </p>

                {/* Alternatives */}
                <h3 className="text-2xl font-semibold mb-2">Alternatives</h3>
                <div className="hidden lg:flex items-center gap-4 mb-4">
                  {chatData[selectedTaskIndex]?.alternatives?.map((tool, i) => (
                    <AlternativeFeatureCard data={tool} key={i} />
                  ))}
                </div>
                <div className="w-full lg:hidden mx-auto grid grid-cols-1 ">
                  <div className="relative w-full">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView={4}
                      modules={[Navigation]}
                      navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                      }}
                      breakpoints={{
                        // When window width is >= 640px (mobile screen)
                        200: {
                          slidesPerView: 1.3,
                          spaceBetween: 20,
                        },
                        // When window width is >= 1024px (tablet and up)
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 50,
                        },
                      }}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {chatData[selectedTaskIndex]?.alternatives?.map((alt, index) => (

                        <SwiperSlide key={index}>
                          <AlternativeFeatureCard data={alt} key={index} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    <div className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                      <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-[rgba(255,255,255,0.2)] focus:outline-none">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.953205 8.83069L0.289143 8.16663L0.953205 7.50256L6.92977 1.526L7.59383 0.861938L8.92196 2.19006L8.25789 2.85413L3.88289 7.22913H16.8126H17.7501V9.10413H16.8126H3.88289L8.25789 13.5182L8.92196 14.1823L7.59383 15.5104L6.92977 14.8463L0.953205 8.83069Z" fill="white" />
                        </svg>
                      </button>
                    </div>

                    <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                      <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-[rgba(255,255,255,0.2)] focus:outline-none">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.0078 8.83069L11.0313 14.8463L10.3672 15.5104L9.03908 14.1823L9.70314 13.5182L14.0781 9.10413H1.18752H0.250019V7.22913H1.18752H14.0781L9.70314 2.85413L9.03908 2.19006L10.3672 0.861938L11.0313 1.526L17.0078 7.50256L17.6719 8.16663L17.0078 8.83069Z" fill="white" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            }


            <div className="hidden lg:sticky lg:max-h-[75vh] lg:top-10 lg:flex flex-col w-1/4 gap-4">
              <div
                className="hidden lg:flex flex-col lg:w-[100%] max-h-[500px] overflow-y-auto no-scrollbar"
              >
                {directories?.map((tool, i) => (
                  <FeatureCard directory={tool} key={i} />
                ))}
              </div>
              <Cards />
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ChatBotResult