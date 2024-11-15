"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import BlogCard from "@/app/src/layout/HomeNew/BlogSection/BlogCard";
import Header from "@/app/src/layout/Header/HeaderNew";
import Footer from "@/app/src/layout/FooterNew";
import axios from "axios";
import { useParams } from "next/navigation";
import moment from "moment";
import Spinner from "@/app/src/ui/Spinner";
import DOMPurify from "dompurify";
import "./BlogDetail.module.css";

const BlogDetail = () => {
  const [blogs, setBlogs] = useState();
  const [blogData, setBlogData] = useState();
  const { id } = useParams();
  const [loadingAllBlogs, setLoadingAllBlogs] = useState(true);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const fetchBlogs = async () => {
    try {
      setLoadingAllBlogs(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`
      );
      setBlogs(response.data.results);
    } catch (e) {
      console.log("Error fetching the blogs", e);
    } finally {
      setLoadingAllBlogs(false);
    }
  };

  const fetchBlogById = useCallback(async () => {
    try {
      setLoadingBlog(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`
      );
      setBlogData(response.data);
    } catch (e) {
      console.log("Error fetching the blog by id", e);
    } finally {
      setLoadingBlog(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    fetchBlogById();
  }, [fetchBlogById]);

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-20 lg:pt-32 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
        <div
          className="px-[30px] lg:px-[135px] w-[100vw] min-h-[100%] pb-16"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, transparent 0px, transparent 700px, #181C1F 500px, #181C1F 100%)",
          }}
        >
          <div className="container max-w-4xl mx-auto px-8 md:px-16 text-center lg:text-left">
            {/* Blog Title Section */}

            {loadingBlog ? (
              <div className=" flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <>
                <div className=" flex flex-row justify-between items-center mb-4">
                  <p className="text-sm mb-4">
                    {moment(blogData?.updatedAt).format("ll")}
                  </p>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center">
                      <div className=" w-10 h-10 mr-2">
                        <Image
                          src={blogData.user.profile}
                          className="rounded-full mr-2"
                          alt="Profile Image"
                          width={100}
                          height={100}
                        />
                      </div>
                      <p className="text-white text-lg font-bold">
                        {blogData.user.firstName + " " + blogData.user.lastName}
                      </p>
                    </div>
                  </div>
                </div>
                <h1 className="text-[32px] md:text-5xl font-bold mb-4">
                  {blogData?.title}
                </h1>

                <div className="rounded-lg overflow-hidden mb-8 h-[500px]">
                  <Image
                    src={blogData.cover}
                    unoptimized
                    alt="Blog Main"
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Blog Content */}
                <div className="ql-snow">
                  <div
                    className={`ql-editor mt-6 dark:prose-white inline`}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(blogData.content),
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <div className="px-[30px] lg:px-[135px] bg-[#181C1F]">
        <section className="py-16 border-t border-[rgba(255,255,255,0.2)]">
          <h2 className="hidden lg:block text-5xl text-white font-bold mb-8 text-center">
            Related Insights
          </h2>

          <div className="relative">
            {loadingAllBlogs ? (
              <div className=" flex justify-center items-center">
                <Spinner />
              </div>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={3}
                modules={[Navigation]}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                onSlideChange={() => console.log("slide change")}
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
                {blogs?.map((blog, index) => (
                  <SwiperSlide key={index}>
                    <BlogCard blog={blog} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
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
          <div className="hidden lg:flex justify-center mt-8">
            <Link href={'/blogs'}>
              <button className="px-[20px] py-[10px] bg-none text-white rounded-[5px] border border-gray-500 ">
                View More
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogDetail;
