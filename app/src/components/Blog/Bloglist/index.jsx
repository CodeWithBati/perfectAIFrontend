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


const BlogList = () => {

    const blogData = [
        {
            id: 1,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 2,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 3,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 4,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 5,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 6,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 7,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        },
        {
            id: 8,
            title: "Introducing MyPerfectAI: Your Unbiased Guide to Finding the Right AI Tools for Every Task",
            description: "Finding the right AI tool shouldn’t be a struggle. Introducing MyPerfectAI—a platform delivering fast, personalized AI recommendations for professionals and SMEs...",
            date: "8 Nov 2024",
            author: "Joshua Grant",
            imageUrl: "/images/blogimagetemp.png"
        }
    ];

    return (
        <section className="relative flex flex-col items-center justify-center min-w-screen min-h-[screen] pt-32 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover  bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')] tracking-wide">
            <div className="px-[30px] lg:px-[135px] min-h-[100%] pb-16"
                style={{
                    backgroundImage:
                        'linear-gradient(to bottom, transparent 0px, transparent 700px, #181C1F 500px, #181C1F 100%)',
                }}>
                {/* Header Section */}
                <div className="text-center mb-4 lg:mb-16 flex flex-col justify-center items-center tracking-wide">
                    <h1 className="text-[32px] lg:text-5xl font-bold">AI Insights</h1>
                    <p className="text-base lg:text-2xl mt-4 lg:max-w-[900px] text-center">
                        We provide expert analysis and practical guidance for professionals
                        and SMEs on selecting and utilizing AI tools effectively. Explore
                        curated articles that give insights into AI developments and offer
                        strategies to help you make informed decisions in a fast-evolving AI
                        landscape.
                    </p>
                </div>

                {/* Blog Grid */}
                <div>
                    <div className="hidden md:grid grid-cols-1 md:grid-cols-[65%_35%] gap-[30px] lg:mt-[40px] h-500">
                        <Link href={`/blog-detail/${blogData[0]?.id}`} className="flex justify-between gap-4 w-[100%] h-500">
                            <Image
                                src={blogData[0]?.imageUrl}
                                className="rounded-lg w-full h-full"
                                alt="Blog Post"
                                height={500}
                                width={370}
                            />
                            <div className="flex flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold text-lg text-white mb-2">{blogData[0]?.title}</h3>
                                    <p className="text-sm lg:text-base text-white mb-8 lg:mb-4 line-clamp-2">{blogData[0]?.description}</p>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-white">{blogData[0]?.date}</p>
                                        <div className="ml-4 flex items-center">
                                            <Image
                                                src="/images/avatar.svg"
                                                className="rounded-full mr-2"
                                                alt="No Profile Image Avatar"
                                                width={30}
                                                height={30}
                                            />
                                            <p className="text-sm text-white">{blogData[0]?.author}</p>
                                        </div>
                                    </div>
                                    <hr className="mt-4 border-[rgba(255,255,255,0.2)]" />
                                    <Link href="#" className="flex justify-start items-center text-white mt-4 inline-block text-xs font-semibold">
                                        Read more
                                        <svg width="11" height="9" className="ml-2" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0547 4.89844L6.46875 8.50781L6.07031 8.90625L5.27344 8.10938L5.67188 7.71094L8.29688 5.0625H0.5625H0V3.9375H0.5625H8.29688L5.67188 1.3125L5.27344 0.914062L6.07031 0.117188L6.46875 0.515625L10.0547 4.10156L10.4531 4.5L10.0547 4.89844Z" fill="white" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                        <div className="hidden lg:flex flex-col justify-start gap-8">
                            <Link href={`/blog-detail/${blogData[1]?.id}`}>
                                <div className="rounded-lg flex flex-row gap-[20px]">
                                    <Image
                                        src={blogData[1]?.imageUrl}
                                        className="rounded-lg"
                                        alt="Blog Post"
                                        height={100}
                                        width={100}
                                    />
                                    <div>
                                        <h2 className="text-lg font-bold">{blogData[1]?.title}</h2>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-white">{blogData[1]?.date}</p>
                                            <div className="ml-4 flex items-center">
                                                <Image
                                                    src="/images/avatar.svg"
                                                    className="rounded-full mr-2"
                                                    alt="No Profile Image Avatar"
                                                    width={30}
                                                    height={30}
                                                />
                                                <p className="text-sm text-white">{blogData[1]?.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <Link href={`/blog-detail/${blogData[2]?.id}`}>
                                <div className="rounded-lg flex flex-row gap-[20px] w-[100%]">
                                    <Image
                                        src={blogData[2]?.imageUrl}
                                        className="rounded-lg"
                                        alt="Blog Post"
                                        height={100}
                                        width={100}
                                    />
                                    <div className="w-[100%]">
                                        <h2 className="text-lg font-bold">{blogData[2]?.title}</h2>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm text-white">{blogData[2]?.date}</p>
                                            <div className="ml-4 flex items-center">
                                                <Image
                                                    src="/images/avatar.svg"
                                                    className="rounded-full mr-2"
                                                    alt="No Profile Image Avatar"
                                                    width={30}
                                                    height={30}
                                                />
                                                <p className="text-sm text-white">{blogData[2]?.author}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>


                    {/* Smaller cards as in the existing design */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[20px] lg:mt-[80px]">
                        {blogData.slice(3).map((blog, index) => (
                            <BlogCard blog={blog} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>

    );
};

export default BlogList;
