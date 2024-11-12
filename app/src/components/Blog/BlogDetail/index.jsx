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
        }
    ];

    return (
        <>
            <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-20 lg:pt-32 pb-16 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
                <div className="container max-w-4xl mx-auto px-8 md:px-16 text-center lg:text-left">
                    {/* Blog Title Section */}

                    <p className="text-sm mb-4">8 Nov 2024</p>
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
                            src="/images/blogimagetemp.png"
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
                        </p>
                        <p className="mb-8">
                            This is where MyPerfectAI comes in.
                        </p>    

                        <h2 className="text-2xl font-semibold mb-4">Why We Built MyPerfectAI</h2>
                        <p className="mb-8">
                            At MyPerfectAI, we recognized that professionals and SMEs need reliable AI recommendations without spending hours researching or paying for advice. Our mission is to democratize access to high-quality AI insights, giving every user the power to leverage AI as effectively as the industry giants.
                        </p>
                        <p className="mb-8">
                            By simply describing their task or use case, users of MyPerfectAI receive precise, task-specific AI tool recommendations in seconds—completely free of charge.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">How It Works: Your Personal AI Advisor</h2>
                        <p className="mb-8">
                            MyPerfectAI is powered by ChatGPT-4o, trained to understand the diverse needs of professionals across industries. With a brief description of the task at hand, our system sifts through a curated database of high-quality, business-grade AI tools to recommend the most relevant solutions. The goal is simple: to cut through the clutter and help our users make decisions they can trust.
                        </p>
                        <p className="mb-8">
                            Unlike traditional AI directories, we emphasize credibility. Rather than showcasing every tool on the market, we focus on trusted, performance-proven AI tools that meet the standards of businesses and professionals alike.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">A Unique Value Proposition for AI Tool Companies</h2>
                        <p className="mb-8">
                            For AI tool providers, MyPerfectAI isn’t just a listing site—it’s a dedicated sales channel. We connect AI companies directly to potential customers by making tailored recommendations to users already interested in specific solutions. By bridging the gap between tools and users, we offer an efficient route to market that amplifies exposure and engagement.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">Revenue Model: A Partnership-Driven, Non-Partisan Approach</h2>
                        <p className="mb-8">
                            Our initial revenue model is based on affiliate marketing commissions. However, at MyPerfectAI, our priority is always to serve our users with impartial, high-quality recommendations. We are committed to remaining non-partisan; commission incentives will never interfere with our duty to provide unbiased, task-specific AI solutions. By focusing on value and trustworthiness, we aim to build long-lasting relationships with both users and AI tool providers who share our commitment to integrity.
                        </p>

                        <h2 className="text-2xl font-semibold mb-4">The Future of AI is Here—And It’s Big</h2>
                        <p className="mb-8">
                            As AI technology evolves, it’s no longer just about finding tools; it’s about finding the right tools that bring immediate value. MyPerfectAI exists to provide that clarity, empowering professionals, SMEs, and tool providers to capitalize on AI’s potential without getting lost in the noise.
                        </p>
                        <p className="mb-8">
                            Whether you’re an AI tool provider looking for exposure or a professional seeking reliable AI recommendations, MyPerfectAI is here to help you thrive in the AI era. Join us on our journey, and let’s make the future of AI accessible to everyone.
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
