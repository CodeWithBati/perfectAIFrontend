import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


import BlogCard from "./BlogCard";


const BlogSection = () => {

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
        <section className="py-8 sm:py-16">
            <h2 className="text-[32px] sm:text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8 text-center">Blogs</h2>

            <div className="relative">
                <Swiper
                    spaceBetween={50}
                    slidesPerView={3} // Default for desktop
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    breakpoints={{
                        // When window width is >= 640px (mobile screen)
                        200: {
                            slidesPerView: 1.5, // Show 1.5 slides on mobile
                            spaceBetween: 20,   // Adjust space between slides for mobile
                        },
                        // When window width is >= 1024px (tablet and up)
                        1024: {
                            slidesPerView: 3,   // Default 3 slides for larger screens
                            spaceBetween: 50,   // Larger space between slides for desktop
                        },
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {blogData.map((blog, index) => (
                        <SwiperSlide key={index}>
                            <BlogCard blog={blog} />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Previous Button */}
                <div className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                    <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.953205 8.83069L0.289143 8.16663L0.953205 7.50256L6.92977 1.526L7.59383 0.861938L8.92196 2.19006L8.25789 2.85413L3.88289 7.22913H16.8126H17.7501V9.10413H16.8126H3.88289L8.25789 13.5182L8.92196 14.1823L7.59383 15.5104L6.92977 14.8463L0.953205 8.83069Z" fill="white" />
                        </svg>
                    </button>
                </div>

                {/* Next Button */}
                <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
                    <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0078 8.83069L11.0313 14.8463L10.3672 15.5104L9.03908 14.1823L9.70314 13.5182L14.0781 9.10413H1.18752H0.250019V7.22913H1.18752H14.0781L9.70314 2.85413L9.03908 2.19006L10.3672 0.861938L11.0313 1.526L17.0078 7.50256L17.6719 8.16663L17.0078 8.83069Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>


            {/* View More Button */}
            <div className="sm:flex sm:justify-center mt-8 w-full sm:w-auto">
                <button className="px-[20px] py-[10px] bg-none text-white rounded-[5px] border border-[rgba(255,255,255,0.2)] w-full sm:w-auto bg-[#1e1e1e]">View More</button>
            </div>
        </section >
    );
};

export default BlogSection;
