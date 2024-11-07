"use client";
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import Image from "next/image";
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import BlogCard from "@/app/src/layout/HomeNew/BlogSection/BlogCard";
import Header from "@/app/src/layout/Header/HeaderNew";
import Footer from "@/app/src/layout/FooterNew";


const BlogDetail = () => {

    const blogData = [
        {
            id: 1,
            title: "Best AI Art Generators In 2024",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog1.jpeg"
        },
        {
            id: 2,
            title: "Revolutionize Your Marketing Strategy with AI",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog2.jpeg"
        },
        {
            id: 3,
            title: "Role of AI In Fashion Industry",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog3.jpeg"
        },
        {
            id: 4,
            title: "Role of AI In Fashion Industry",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog3.jpeg"
        }
    ];

    return (
        <>
            <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-20 lg:pt-32 pb-16 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
                <div className="container max-w-4xl mx-auto px-8 md:px-16 text-center lg:text-left">
                    {/* Blog Title Section */}

                    <p className="text-sm mb-4">29 Jul 2024</p>
                    <h1 className="text-[32px] md:text-5xl font-bold mb-4">Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task</h1>
                    <p className="text-base">Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs. Our mission: to empower users with unbiased, high-quality insights and connect them to the best AI solutions effortlessly.</p>
                    {/* Date and Author */}
                    <div className="flex items-center justify-center mt-4 mb-8">
                        <div className="flex items-center">
                            <Image
                                src="/images/avatar.svg"
                                className="rounded-full mr-2"
                                alt="Profile Image"
                                width={50}
                                height={50}
                            />
                            <p className="text-white text-lg font-bold">Joshua Grant</p>
                        </div>
                    </div>

                    {/* Blog Main Image */}
                    <div className="rounded-lg overflow-hidden mb-8">
                        <Image
                            src="/images/blog1.jpeg"
                            alt="Blog Main"
                            width={900}
                            height={500}
                            className="w-full h-full"
                        />
                    </div>

                    {/* Blog Content */}
                    <div className="text-sx text-left leading-relaxed">
                        <h2 className="text-2xl font-semibold mb-4">Introducing MyPerfectAI: Your Trusted Guide in the World of AI Tools</h2>
                        <p className="mb-8">
                            The AI landscape is rapidly expanding, and navigating it effectively has become a daunting task for many professionals and small to medium-sized enterprises (SMEs). With countless AI tools hitting the market daily, finding the right solution for a specific task often requires combing through directories, vetting recommendations, or relying on sponsored content. For Fortune 500 companies, the answer to this complexity is simple: they have teams of consultants dedicated to selecting and implementing the best AI solutions. But what about everyone else? 
                            This is where MyPerfectAI comes in.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">What is Visual Search?</h2>
                        <p className="mb-8">
                            Visual search is a modern method of retrieving data from search engines and other databases. In this method, netizens use a digital image instead of text-based keywords as a search query.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">Impact of Visual Search on Online Shopping</h2>
                        <p>
                            Visual search has significantly improved online shoppers&apos; shopping experience. From finding the right products to comparing prices and reading reviews, it offers many benefits. Let&apos;s have a look at a few of them.
                        </p>
                    </div>
                </div>
            </section>
            <div className="px-[30px] lg:px-[135px] bg-[#181C1F]">
                <section className="py-16 border-t border-[rgba(255,255,255,0.2)]">
                    <h2 className="hidden lg:block text-5xl text-white font-bold mb-8 text-center">Related Insights</h2>

                    <div className="relative">
                        <Swiper
                            spaceBetween={50}
                            slidesPerView={3}
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                            breakpoints={{
                                200: {
                                    slidesPerView: 1.2,
                                    spaceBetween: 20,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 50,
                                },
                            }}
                        >
                            {blogData.map((blog, index) => (
                                <SwiperSlide key={index}>
                                    <BlogCard blog={blog} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                            <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.953205 8.83069L0.289143 8.16663L0.953205 7.50256L6.92977 1.526L7.59383 0.861938L8.92196 2.19006L8.25789 2.85413L3.88289 7.22913H16.8126H17.7501V9.10413H16.8126H3.88289L8.25789 13.5182L8.92196 14.1823L7.59383 15.5104L6.92977 14.8463L0.953205 8.83069Z" fill="white" />
                                </svg>
                            </button>
                        </div>

                        <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                            <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.0078 8.83069L11.0313 14.8463L10.3672 15.5104L9.03908 14.1823L9.70314 13.5182L14.0781 9.10413H1.18752H0.250019V7.22913H1.18752H14.0781L9.70314 2.85413L9.03908 2.19006L10.3672 0.861938L11.0313 1.526L17.0078 7.50256L17.6719 8.16663L17.0078 8.83069Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* View More Button */}
                    <div className="hidden lg:flex justify-center mt-8">
                        <button className="px-[20px] py-[10px] bg-none text-white rounded-[5px] border border-gray-500 ">View More</button>
                    </div>
                </section >
            </div >
        </>

    );
};

export default BlogDetail;
