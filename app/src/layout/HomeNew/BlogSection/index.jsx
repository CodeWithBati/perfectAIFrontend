'use client';
import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import BlogCard from "./BlogCard";
import Spinner from "@/app/src/ui/Spinner";
import axios from "axios";

const BlogSection = () => {
  const [loadingAllBlogs, setLoadingAllBlogs] = useState(true);
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      setLoadingAllBlogs(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`
      );
			console.log(response)
      setBlogs(response.data.results);
    } catch (e) {
      console.log("Error fetching the blogs", e);
    } finally {
      setLoadingAllBlogs(false);
    }
  };

	useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    blogs.length > 0 && <section className="py-8 sm:py-16">
      <h2 className="text-[32px] sm:text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8 text-center tracking-wide">
        AI Insights
      </h2>

      <div className="relative">
        {loadingAllBlogs ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Swiper
            spaceBetween={50}
            slidesPerView={3} // Default for desktop
            modules={[Navigation]}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            breakpoints={{
              // When window width is >= 640px (mobile screen)
              200: {
                slidesPerView: 1.5, // Show 1.5 slides on mobile
                spaceBetween: 20, // Adjust space between slides for mobile
              },
              // When window width is >= 1024px (tablet and up)
              1024: {
                slidesPerView: 3, // Default 3 slides for larger screens
                spaceBetween: 50, // Larger space between slides for desktop
              },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index}>
                <BlogCard blog={blog} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Previous Button */}
        <div className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
          <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.953205 8.83069L0.289143 8.16663L0.953205 7.50256L6.92977 1.526L7.59383 0.861938L8.92196 2.19006L8.25789 2.85413L3.88289 7.22913H16.8126H17.7501V9.10413H16.8126H3.88289L8.25789 13.5182L8.92196 14.1823L7.59383 15.5104L6.92977 14.8463L0.953205 8.83069Z"
                fill="white"
              />
            </svg>
          </button>
        </div>

        {/* Next Button */}
        <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10 lg:block hidden">
          <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
            <svg
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0078 8.83069L11.0313 14.8463L10.3672 15.5104L9.03908 14.1823L9.70314 13.5182L14.0781 9.10413H1.18752H0.250019V7.22913H1.18752H14.0781L9.70314 2.85413L9.03908 2.19006L10.3672 0.861938L11.0313 1.526L17.0078 7.50256L17.6719 8.16663L17.0078 8.83069Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* View More Button */}
      <div className="sm:flex sm:justify-center mt-8 w-full sm:w-auto">
        <Link
          href="/blogs"
          className="px-[20px] py-[10px] bg-none text-white text-sm font-semibold rounded-[5px] border border-[rgba(255,255,255,0.2)] w-full sm:w-auto bg-[#1e1e1e] tracking-wider"
        >
          View More
        </Link>
      </div>
    </section>
  );
};

export default BlogSection;
