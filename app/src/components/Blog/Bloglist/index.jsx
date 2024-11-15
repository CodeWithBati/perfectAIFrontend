"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import BlogCard from "@/app/src/layout/HomeNew/BlogSection/BlogCard";
import Header from "@/app/src/layout/Header/HeaderNew";
import Spinner from "@/app/src/ui/Spinner";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Fetch blogs from the API
  const fetchBlogs = useCallback(async (currentPage) => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
        {
          params: { page: currentPage, limit: 50 },
        }
      );
      const { results } = response.data;
      setBlogs(results);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial blogs
  useEffect(() => {
    fetchBlogs(page);
  }, [fetchBlogs, page]);

  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-[screen] pt-32 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')] tracking-wide">
      <div
        className="px-[30px] lg:px-[135px] min-h-[100%] pb-16"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, transparent 0px, transparent 700px, #181C1F 500px, #181C1F 100%)",
        }}
      >
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
        {blogs.length > 0 && (
          <div>
            {/* Display the first blog in the large format */}
            {/* <div className="hidden md:grid grid-cols-3 gap-5 lg:mt-[40px] h-500">
              <div className="md:col-span-2">
                <Link
                  href={`/blog-details/${blogs[0]?.id}`}
                  className=" grid grid-cols-2 "
                >
                  <Image
                    src={blogs[0]?.cover}
                    className="rounded-lg w-full h-full"
                    alt="Blog Post"
                    height={100}
                    width={100}
                    unoptimized
                  />
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-2">
                        {blogs[0]?.title}
                      </h3>
                      <p
                        className="text-sm lg:text-base text-white mb-8 lg:mb-4"
                        dangerouslySetInnerHTML={{
                          __html:
                            blogs[0]?.content.length > 1000
                              ? blogs[0]?.content.substring(0, 1000) + "..."
                              : blogs[0]?.content,
                        }}
                      ></p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-white">
                          {new Date(blogs[0]?.updatedAt).toLocaleDateString()}
                        </p>
                        <div className="ml-4 flex items-center">
                          <Image
                            src={
                              blogs[0]?.user?.profile || "/images/avatar.svg"
                            }
                            className="rounded-full mr-2"
                            alt="Author Profile"
                            width={30}
                            height={30}
                          />
                          <p className="text-sm text-white">
                            {`${blogs[0]?.user?.firstName} ${blogs[0]?.user?.lastName}`}
                          </p>
                        </div>
                      </div>
                      <hr className="mt-4 border-[rgba(255,255,255,0.2)]" />
                      <Link
                        href={`/blog-details/${blogs[0]?.id}`}
                        className="flex justify-start items-center text-white mt-4 inline-block text-xs font-semibold"
                      >
                        Read more
                        <svg
                          width="11"
                          height="9"
                          className="ml-2"
                          viewBox="0 0 11 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0547 4.89844L6.46875 8.50781L6.07031 8.90625L5.27344 8.10938L5.67188 7.71094L8.29688 5.0625H0.5625H0V3.9375H0.5625H8.29688L5.67188 1.3125L5.27344 0.914062L6.07031 0.117188L6.46875 0.515625L10.0547 4.10156L10.4531 4.5L10.0547 4.89844Z"
                            fill="white"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="hidden col-span-1 lg:flex flex-col justify-start gap-16 ">
                {blogs.slice(1, 3).map((blog) => (
                  <Link
                    className="block"
                    key={blog.id}
                    href={`/blog-details/${blog.id}`}
                  >
                    <div className="rounded-lg flex flex-row gap-3 h-24 w-22">
                      <Image
                        src={blog.cover}
                        className="rounded-lg"
                        alt="Blog Post"
                        height={100}
                        width={100}
                      />
                      <div>
                        <h2 className="text-lg font-bold">{blog.title}</h2>
                        <p
                          className="text-sm lg:text-base text-white mb-8 lg:mb-4"
                          dangerouslySetInnerHTML={{
                            __html:
                              blogs[0]?.content.length > 150
                                ? blogs[0]?.content.substring(0, 150) + "..."
                                : blogs[0]?.content,
                          }}
                        ></p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-white">
                            {new Date(blog.updatedAt).toLocaleDateString()}
                          </p>
                          <div className="ml-4 flex items-center">
                            <Image
                              src={blog.user?.profile || "/images/avatar.svg"}
                              className="rounded-full mr-2"
                              alt="Author Profile"
                              width={30}
                              height={30}
                            />
                            <p className="text-sm text-white">
                              {`${blog.user?.firstName} ${blog.user?.lastName}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div> */}

            {/* Remaining blogs in a grid format */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px] mt-[20px] lg:mt-[80px]">
              {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog.id} />
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
