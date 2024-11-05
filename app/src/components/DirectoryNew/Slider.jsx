// components/Slider.js
'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import EntertainmentModel from '../global/EntertainmentModel';

const Slider = ({ directory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null); // To store the content to display in modal

  const handleOpenModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="w-full grid grid-cols-1 py-4 lg:py-8 lg:mb-8 lg:border-b lg:border-b-[rgba(255,255,255,0.2)]">
      {directory?.images?.length > 0 &&
        <div className="relative w-full">
          <Swiper
            spaceBetween={30}
            slidesPerView={2.3}
            modules={[Navigation]}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              // When window width is >= 200px
              200: {
                slidesPerView: 1.2,
                spaceBetween: 15,
              },
              // When window width is >= 1024px (desktop)
              1024: {
                slidesPerView: 2.3,
                spaceBetween: 30,
              },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {directory?.images?.map((image, i) => 
            <SwiperSlide key={i} className="rounded-lg shadow-lg" style={{ height: '236px' }}>
            <div
              className="cursor-pointer"
              onClick={() =>
                handleOpenModal(
                  <Image
                    src={image}
                    alt="First Slide"
                    className="rounded-lg w-full h-full"
                    width={800}
                    height={500}
                    style={{ objectFit: 'contain' }}
                  />
                )
              }
            >
              <Image
                src={image}
                alt="First Slide"
                className="rounded-lg w-full h-full"
                width={370}
                height={236}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </SwiperSlide>
          )}

            {directory?.videos?.map((video, i) =>
              <SwiperSlide className="rounded-lg shadow-lg" style={{ height: '236px' }} key={i}>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    handleOpenModal(
                      <video
                        src={video}
                        controls
                        className="rounded-lg w-full h-full"
                        style={{ objectFit: 'cover' }} // Ensure the video fits the container
                      />
                    )
                  }
                >
                  <video
                    src={video}
                    className="rounded-lg w-full h-full"
                    muted
                    loop
                    playsInline
                    style={{ objectFit: 'cover' }} // Ensure the video fits the container
                  />
                </div>
              </SwiperSlide>
            )}

          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-20 lg:block hidden">
            <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
              {/* Left Arrow SVG */}
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

          <div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-20 lg:block hidden">
            <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-gray-700 focus:outline-none">
              {/* Right Arrow SVG */}
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

          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-gray-900 to-transparent z-10 opacity-60 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-gray-900 to-transparent z-10 opacity-60 pointer-events-none"></div>
        </div>
      }

      {/* Modal for Enlarged Content */}
      <EntertainmentModel isOpen={isModalOpen} onClose={handleCloseModal}>
        {modalContent}
      </EntertainmentModel>
    </div>
  );
};

export default Slider;
