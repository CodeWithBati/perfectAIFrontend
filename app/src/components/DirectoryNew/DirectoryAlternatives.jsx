import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


import Image from "next/image";
import FeatureCard from "@/app/src/layout/HomeNew/FeatureSection/FeatureCard";
import Feedback from './keyFeature/Feedback';

const DirectoryAlternatives = ({ category, currentDirectory }) => {

  const [directories, setDirectories] = useState([]);
  const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchSites = useCallback(async () => {
    if (page > totalPages || loadingRef.current) return;

    setExtractMoreSpinner(true);
    loadingRef.current = true;
    console.log(`Fetching sites with category: ${category}`);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories?categories=${category}`
      );
      if (response.status === 200) {
        response.data.results = response.data.results.filter(rec => rec.id !== currentDirectory.id)
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
  }, [page, totalPages, category, currentDirectory.id]);

  const handleScroll = useCallback(() => {
    if (listRef.current && !loadingRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, []);

  useEffect(() => {
    fetchSites();
  }, [page, fetchSites]);

  return (
    <section className="py-8 lg:py-12">
      <h2 className="text-center text-2xl lg:text-4xl font-bold mb-8 border-t pt-8 lg:pt-16 border-t-[rgba(255,255,255,0.2)]">{currentDirectory.name} Alternatives</h2>
      <div className="w-full mx-auto grid grid-cols-1 ">
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
            {directories.map((alt, index) => (

              <SwiperSlide key={index}>
                <FeatureCard directory={alt} key={index} />
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
    </section>
  );
}


export default DirectoryAlternatives;