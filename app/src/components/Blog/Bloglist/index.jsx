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
            title: "Best AI Art Generators In 2024",
            description: "The te­ch world has been buzzing with Artificial Intellige­nce (AI) for a while now—it's quite e­xciting! AI makes sense of huge­ chunks of data and makes smart choices. This has bee­n a big shift for many fields, SaaS included.",
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
        },
        {
            id: 5,
            title: "Revolutionize Your Marketing Strategy with AI",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog2.jpeg"
        },
        {
            id: 6,
            title: "Role of AI In Fashion Industry",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog3.jpeg"
        },
        {
            id: 7,
            title: "Role of AI In Fashion Industry",
            description: "The technological revolution has made lots of tasks much simpler than ever. In fact, these days, we have tons...",
            date: "29 Jul 2024",
            author: "Darrell Steward",
            imageUrl: "/images/blog3.jpeg"
        }
    ];

    return (
        <>
            <Header />
            <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-32 pb-16 text-white bg-no-repeat bg-cover" style={{
                backgroundImage: `url('/images/allPageBg.png')`
            }}>
                <div className="px-[130px]">
                    {/* Header Section */}
                    <div className="text-center mb-16 flex flex-col justify-center items-center">
                        <h1 className="text-5xl font-bold">Welcome to our blogs</h1>
                        <p className="text-2xl mt-4 max-w-[900px] text-center">
                            Don&apos;t know which AI tool to use for your task? MyPerfectAI recommends the best AI tools for your task,
                            by giving step-by-step, personalized instructions.
                        </p>
                    </div>

                    {/* Blog Grid */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[40px]">
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
                                    <p className="text-base text-white mb-4">{blogData[0]?.description}</p>
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
                                        Read more <svg width="11" height="9" className="ml-2" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.0547 4.89844L6.46875 8.50781L6.07031 8.90625L5.27344 8.10938L5.67188 7.71094L8.29688 5.0625H0.5625H0V3.9375H0.5625H8.29688L5.67188 1.3125L5.27344 0.914062L6.07031 0.117188L6.46875 0.515625L10.0547 4.10156L10.4531 4.5L10.0547 4.89844Z" fill="white" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col justify-start gap-8">
                                <div>
                                    <div className="rounded-lg flex flex-row gap-[20px]">
                                        <Image
                                            src={blogData[0]?.imageUrl}
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
                                </div>
                                <div>
                                    <div className="rounded-lg flex flex-row gap-[20px]">
                                        <Image
                                            src={blogData[0]?.imageUrl}
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
                                </div>
                            </div>
                        </div>

                        {/* Smaller cards as in the existing design */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[80px]">
                            {blogData.slice(3).map((blog, index) => (
                                <BlogCard blog={blog} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>

    );
};

export default BlogList;
