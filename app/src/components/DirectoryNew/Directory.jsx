'use client'
import React, { useState, useEffect } from 'react'
import Header from '../../layout/Header/HeaderNew'
import Image from 'next/image'
import feat2 from '../../../../public/images/feat2.jpeg'
import Cards from './Cards'
import Slider from './Slider'
import Features from './keyFeature/Features'
import Footer from '../../layout/FooterNew'
import FeatureCard from '../../layout/HomeNew/FeatureSection/FeatureCard'
import UseCases from './keyFeature/UseCases'
import Pricing from './keyFeature/Pricing'
import Reviews from './keyFeature/Reviews'
import ProsCons from './keyFeature/ProsCons'
import Summary from './keyFeature/Summery'
import PersonReviews from './keyFeature/PersonReviews'
import About from './keyFeature/About'

function Directory() {
  const [activeTab, setActiveTab] = useState('Key Features');

  const tabs = ['Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary'];
  const mobTabs = ['About', 'Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary'];

  // Scroll event listener to highlight tab based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      tabs.forEach((tab) => {
        const section = document.getElementById(tab.toLowerCase().replace(/\s+/g, '-'));
        if (section) {
          const bounding = section.getBoundingClientRect();
          if (bounding.top >= 0 && bounding.top <= window.innerHeight / 2) {
            setActiveTab(tab);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const section = document.getElementById(tab.toLowerCase().replace(/\s+/g, '-'));
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = () => (
    <>
      <section id="about" className="mt-4 lg:mt-0 lg:p-4 lg:hidden">
        <About />
      </section>
      <section id="key-features" className="mt-4 lg:mt-0 lg:p-4">
        <Features />
      </section>
      <section id="use-cases" className="mt-4 lg:mt-0 lg:p-4">
        <UseCases />
      </section>
      <section id="pricing-information" className="mt-4 lg:mt-0 lg:p-4">
        <Pricing />
      </section>
      <section id="reviews" className="mt-4 lg:mt-0 lg:p-4">
        <Reviews />
      </section>
      <section id="pros-cons-comparison" className="mt-4 lg:mt-0 lg:p-4">
        <ProsCons />
      </section>
      <section id="summary" className="mt-4 lg:mt-0 lg:p-4">
        <Summary />
      </section>
    </>
  );

  const aiToolsData = [
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
  ];
  
  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen sm:pt-32 pt-20 pb-8 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">

      <div className="min-h-screen text-white w-full">
        <h1 className='text-wrap lg:max-w-4xl text-base lg:text-2xl mx-[30px] lg:mx-auto mb-8 lg:font-bold text-center tracking-wider'>We only include high-quality, business-grade AI tools & software in our directory.Learn about our rigorous approval and verification process.</h1>

        <div className="px-[30px] lg:px-[135px]">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row ">
            {/* Left Side Text Section */}
            <div className="flex w-full lg:w-3/4 lg:mr-8 space-y-4">
              <div className="overflow-hidden">
                <div className="btn flex lg:flex-row flex-col justify-between lg:items-center gap-4 lg:gap-0 mb-6 lg:mb-0">
                  <div className="feat2 flex gap-4">
                    <Image className='rounded-xl' src={feat2} alt='' />
                    <div className="genie">
                      <h2 className="text-2xl font-bold tracking-wider">GetGenie</h2>
                      <div className='flex gap-1'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B60B2" className="w-5 h-5">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B60B2" className="w-5 h-5">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B60B2" className="w-5 h-5">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B60B2" className="w-5 h-5">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8B60B2" className="w-5 h-5">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        <p>(100)</p>
                      </div>
                      <div className='flex gap-3'>
                        <div className="relative inline-block">
                          {/* Featured Text with Icon */}
                          <svg width="89" height="30" viewBox="0 0 89 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H88.5V26H0L7 13L0 0Z" fill="#8B60B2" />
                          </svg>


                          <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full ml-1">
                            <svg width="16" height="14" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 0L22.375 10.25L33.8125 12.25L25.75 20.5625L27.375 32L17 26.9375L6.5625 32L8.25 20.5625L0.125 12.25L11.5625 10.25L17 0Z" fill="white" />
                            </svg>

                            <span className="text-white text-xs font-semibold ml-1">Featured</span>
                          </div>
                        </div>
                        <button className='flex gap-1 p-1 items-center bg-[#4B4B4B] text-xs rounded-sm'>Freemium</button>
                      </div>

                    </div>
                  </div>
                  <div className="save flex gap-4 w-full">
                    <button className='flex items-center justify-center w-full lg:w-auto p-2 h-[41px] text-white font-bold rounded-[5px] bg-[#323639]'>
                      <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                        <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                      </svg>

                      Save (128)
                    </button>
                    <button className='flex w-full lg:w-auto items-center justify-center p-2 h-[41px] bg-[#8B60B2] font-bold rounded-[5px]'>
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                        <path d="M9 0.5H13H14V1.5V5.5V6.5H12V5.5V3.9375L6.6875 9.21875L6 9.9375L4.5625 8.5L5.28125 7.8125L10.5625 2.5H9H8V0.5H9ZM1 1.5H5H6V3.5H5H2V12.5H11V9.5V8.5H13V9.5V13.5V14.5H12H1H0V13.5V2.5V1.5H1Z" fill="white" />
                      </svg>

                      Visit website
                    </button>
                  </div>
                </div>

                <h2 className='text-lg font-bold tracking-wider text-left mb-4 lg:hidden block'>App Feature</h2>

                <div className="hidden lg:hidden flex-col lg:w-1/4 px-8">
                  {aiToolsData?.map((tool, i) => (
                    <FeatureCard feature={tool} key={i} />
                  ))}
                  <Cards />
                </div>
                
                <div className='hidden lg:block'>
                  <About />
                </div>
                
                <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">
                  {/* Sidebar */}
                  <div className="w-full lg:w-1/4 bg-[#1e1e1e] lg:bg-[#323639] border border-[rgba(255,255,255,0.2)] p-4 lg:rounded-lg lg:max-h-[312px] sticky top-8 lg:top-4 z-50">
                    <ul className="lg:space-y-2 hidden lg:block ">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            className={`lg:w-full text-left py-2 px-4 rounded-lg ${activeTab === tab && 'bg-[#8B60B2] text-white'}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="lg:hidden flex space-x-2 overflow-x-auto no-scrollbar">
                      {mobTabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            className={`lg:w-full text-left py-2 px-4 rounded-lg ${activeTab === tab && 'bg-[#8B60B2] text-white'}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                  </div>

                  {/* Main Content */}
                  <div className="w-full lg:w-3/4 lg:px-4">
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Cards Section */}
            <div className="hidden lg:flex flex-col lg:w-1/4 px-8">
              {aiToolsData?.map((tool, i) => (
                <FeatureCard feature={tool} key={i} />
              ))}
              <Cards />
            </div>


          </div>
          <PersonReviews />

        </div>
      </div>
    </section>
  )
}

export default Directory
