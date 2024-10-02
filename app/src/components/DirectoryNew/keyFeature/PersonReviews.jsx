import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


import Image from "next/image";
import FeatureCard from "@/app/src/layout/HomeNew/FeatureSection/FeatureCard";
export default function PersonReviews() {
  const reviews = [
    {
      name: "Theresa Webb",
      rating: 5,
      comment:
        "In my opinion, GetGenie AI has the ability to completely revolutionize the WordPress community...",
      avatar: "/path/to/avatar.jpg", // placeholder for avatar
    },
    {
      name: "Theresa Webb",
      rating: 5,
      comment:
        "In my opinion, GetGenie AI has the ability to completely revolutionize the WordPress community...",
      avatar: "/path/to/avatar.jpg", // placeholder for avatar
    },
    {
      name: "Theresa Webb",
      rating: 5,
      comment:
        "In my opinion, GetGenie AI has the ability to completely revolutionize the WordPress community...",
      // avatar: "../../../../../public/images/feat2.jpeg", // placeholder for avatar
    },
  ];

  const alternatives = [
    {
      id: 1,
      title: "GetGenie",
      description: "GetGenie is an AI-powered tool for content creation and SEO, offering over 30 templates for various use cases.",
      pricing: "Freemium",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: true,
      badge: "Featured",
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 2,
      title: "Devin AI",
      description: "Devin AI, developed by Cognition Labs, is an advanced AI model that autonomously handles software engineering tasks.",
      pricing: "Free",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: false,
      badge: "Featured",
      imageUrl: "/images/feat2.jpeg"
    },
    {
      id: 3,
      title: "Taranis",
      description: "Taranis is an AI-powered crop intelligence platform that provides high-resolution aerial imagery and data-driven insights to support precision farming.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 4,
      title: "Agremo",
      description: "Agremo is an AI-powered crop analysis platform designed to provide detailed insights into crop health and yield prediction.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 5,
      title: "Agremo",
      description: "Agremo is an AI-powered crop analysis platform designed to provide detailed insights into crop health and yield prediction.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 6,
      title: "Agremo",
      description: "Agremo is an AI-powered crop analysis platform designed to provide detailed insights into crop health and yield prediction.",
      pricing: "Paid",
      rating: 5,
      reviews: 100,
      featured: false,
      verified: false,
      imageUrl: "/images/feat1.jpeg"
    },
  ];

  return (
    <div className="min-h-screen border-t mt-8 border-t-[rgba(255,255,255,0.2)]">
      {/* Review Section */}
      <section className="text-white py-12 flex flex-col items-center justify-center">
        {/* Search Bar */}
        <div className="flex items-center justify-center bg-[#323639] p-2 rounded-lg max-w-[770px] mb-16 border border-[rgba(255,255,255,0.2)]">
          {/* User avatar */}
          <img
            className="w-10 h-10 rounded-[5px] mr-2"
            src="https://via.placeholder.com/40" // Replace with actual image URL
            alt="User Avatar"
          />

          {/* Input field */}
          <div className="relative w-[570px]">
            <input
              type="text"
              id="comment"
              placeholder=" "
              className="block px-[15px] pb-[8px] w-full h-[40px] text-sm text-white bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[5px] appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 peer"
            />
            <label
              htmlFor="comment"
              className="absolute text-sm text-[rgba(255,255,255,0.5)] duration-300 scale-100 left-[15px] origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-[10px] peer-placeholder-shown:scale-100 peer-focus:top-[8px] peer-focus:text-xs peer-focus:text-[rgba(255,255,255,0.5)] peer-focus:scale-90"
            >
              WHAT DO YOU THINK...
            </label>
          </div>

            {/* Review button */}
            <button className="ml-3 bg-[#8B60B2] text-white px-4 py-2 rounded-lg font-semibold">
              Review
            </button>
          </div>



          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div className="p-6 bg-[#323639] rounded-lg border border-[rgba(255,255,255,0.2)] text-white">
                {/* Star rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-[#8B60B2]"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.601 1.796 8.213L12 18.896l-7.732 4.224 1.796-8.213L.004 9.306l8.332-1.151z" />
                    </svg>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-sm mb-2">Huge potential</h3>

                {/* Description */}
                <p className="text-white text-sm mb-4 line-clamp-5">
                  In my opinion, GetGenie AI has the ability to completely revolutionize the WordPress community. I'm hoping for them to release Boss Mode and give GetGenie a unique selling point since I believe it's a big deal.
                </p>

                {/* Author section */}
                <div className="flex items-center mt-4">
                  <img
                    className="w-[40px] h-[40px] rounded-[6.56px] mr-4"
                    src="https://via.placeholder.com/40" // Replace with actual image URL
                    alt="Theresa Webb"
                  />
                  <div className="text-base font-semibold">Theresa Webb</div>
                </div>
              </div>

            ))}
          </div>
      </section>
      <div className="flex items-center justify-center">
        <span className="bg-[#323639] py-[10px] px-[20px] text-white font-bold rounded-[5px]">Load more review (100)</span>
      </div>
      {/* Alternatives Section */}
      <section className="py-12">
        <h2 className="text-center text-4xl font-bold mb-8 border-t pt-16 border-t-[rgba(255,255,255,0.2)]">GetGenie Alternatives</h2>
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
              onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {alternatives.map((alt, index) => (

                <SwiperSlide key={index}>
                  <FeatureCard feature={alt} key={index} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="absolute left-[-80px] top-1/2 transform -translate-y-1/2 z-10">
              <button className="swiper-button-prev-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-[rgba(255,255,255,0.2)] focus:outline-none">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.953205 8.83069L0.289143 8.16663L0.953205 7.50256L6.92977 1.526L7.59383 0.861938L8.92196 2.19006L8.25789 2.85413L3.88289 7.22913H16.8126H17.7501V9.10413H16.8126H3.88289L8.25789 13.5182L8.92196 14.1823L7.59383 15.5104L6.92977 14.8463L0.953205 8.83069Z" fill="white" />
                </svg>
              </button>
            </div>

            <div className="absolute right-[-80px] top-1/2 transform -translate-y-1/2 z-10">
              <button className="swiper-button-next-custom bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] text-white p-4 rounded-[6.56px] shadow-md hover:bg-[rgba(255,255,255,0.2)] focus:outline-none">
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.0078 8.83069L11.0313 14.8463L10.3672 15.5104L9.03908 14.1823L9.70314 13.5182L14.0781 9.10413H1.18752H0.250019V7.22913H1.18752H14.0781L9.70314 2.85413L9.03908 2.19006L10.3672 0.861938L11.0313 1.526L17.0078 7.50256L17.6719 8.16663L17.0078 8.83069Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
