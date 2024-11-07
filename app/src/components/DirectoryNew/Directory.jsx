'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Header from '../../layout/Header/HeaderNew';
import Image from 'next/image';
import feat2 from '../../../../public/images/feat2.jpeg';
import Cards from './Cards';
import DOMPurify from 'dompurify';
import Footer from '../../layout/FooterNew';
import FeatureCard from '../../layout/HomeNew/FeatureSection/FeatureCard';
import { BookmarkIcon as FillBookMarkIcon } from "@heroicons/react/24/solid";
import { toastText } from "@/constants/text-constants";
import { useRouter } from "next/navigation";
import StarRating from '../StarRating';
import DirectoryAlternatives from './DirectoryAlternatives';
import parse from 'html-react-parser';
import PersonReviews from './PersonReviews';
import About from './keyFeature/About';
import MobileFeature from './keyFeature/MobileFeature';
import KeyFeatures from './keyFeature/Features';
import UseCases from './keyFeature/UseCases';
import ProsCons from './keyFeature/ProsCons';
import Pricing from './keyFeature/Pricing';
import Reviews from './keyFeature/Reviews';
import Slider from './Slider';

function Directory() {

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024; // Adjust breakpoint as needed
    }
    return false; // Default to desktop if window is undefined
  });
  const [activeTab, setActiveTab] = useState('Key Features');
  const [featureDirectories, setFeatureDirectories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [directory, setDirectory] = useState({});
  const [directorySaveStatus, setDirectorySaveStatus] = useState(false);
  const [directorySaves, setDirectorySaves] = useState(0);
  const { user, token } = useSelector((state) => state.auth);
  const [isFixed, setIsFixed] = useState(false);
  const [sections, setSections] = useState({});
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const loadingRef = useRef(false);
  const router = useRouter();
  const tabRefs = useRef({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update activeTab when isMobile changes
  useEffect(() => {
    setActiveTab(isMobile ? 'About' : 'Key Features');
  }, [isMobile]);

  // Update the tabs to match your headings
  const tabs = isMobile
    ? ['About', 'Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary']
    : ['Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary'];

  // Scroll to the active tab on mobile
  useEffect(() => {
    if (tabRefs.current[activeTab]) {
      const tabList = tabRefs.current[activeTab].parentNode.parentNode;
      const tabWidth = tabRefs.current[activeTab].offsetWidth;
      const tabOffsetLeft = tabRefs.current[activeTab].offsetLeft;
      const tabListWidth = tabList.offsetWidth;

      const scrollPosition = tabOffsetLeft - (tabListWidth / 2) + (tabWidth / 2);

      tabList.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [activeTab]);

  // Consolidated handleScroll function
  useEffect(() => {
    const handleScroll = () => {
      // Show or hide scroll to top button
      setShowScrollToTop(window.scrollY > 300);

      // Set fixed state for header
      setIsFixed(window.scrollY > 200);

      // Update active tab based on scroll position
      tabs.forEach((tab) => {
        const sectionId = tab.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '').replace('proscons-comparison', 'pros-cons-comparison');
        const section = document.getElementById(sectionId);
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
  }, [tabs]);

  // Apply scroll-margin-top to sections
  useEffect(() => {
    const header = document.querySelector('.header');
    const tabsContainer = document.querySelector('.tabs-container');

    const headerHeight = header ? header.offsetHeight : 0;
    const tabsHeight = isMobile && isFixed && tabsContainer ? tabsContainer.offsetHeight : 0;

    const totalFixedHeight = headerHeight + tabsHeight;

    const style = document.createElement('style');
    style.innerHTML = `
      .scroll-section {
        scroll-margin-top: ${totalFixedHeight}px;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [isFixed, isMobile]);

  // Scroll-to-top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const fetchSites = useCallback(async () => {
    if (page > totalPages || loadingRef.current) return;

    const config = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }

    loadingRef.current = true;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=10&isFeatured=true`,
        config
      );
      if (response.status === 200) {
        setFeatureDirectories((prevSites) =>
          page === 1 ? response.data.results : [...prevSites, ...response.data.results]
        );
        setTotalPages(response.data.pagination.totalPages);
      } else {
        console.error("error-->", response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      loadingRef.current = false;
    }
  }, [page, totalPages, token]);

  useEffect(() => {
    fetchSites();
  }, [page, fetchSites]);

  useEffect(() => {
    const getData = async () => {
      try {
        const parts = window.location.pathname.split("/");
        const directoryName = parts[parts.length - 1];
        let headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/${directoryName}`,
          { headers }
        );

        if (response.status === 200) {
          setDirectory(response.data);
          setDirectorySaves(response.data.saves);
          setDirectorySaveStatus(response.data.hasSaved);
        } else {
          toast.error("Error fetching the record");
        }
      } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 404) {
          router.push("/directoryNotFound");
        }
      }
    };

    getData();
  }, [token, router]);

  useEffect(() => {
    if (directory?.description) {
      const parsedSections = parseDescription(directory.description);
      setSections(parsedSections);
    }
  }, [directory?.description]);

  const parseDescription = (htmlString) => {
    const cleanHTML = DOMPurify.sanitize(htmlString);
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHTML, 'text/html');
    const sections = {};
    let currentSection = 'About'; // Default section
    sections[currentSection] = [];
    let currentSubSection = null;

    const childNodes = Array.from(doc.body.childNodes);

    childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName.match(/^H[1-6]$/i)) {
        const title = node.textContent.trim();
        if (tabs.includes(title) || title === 'About') {
          currentSection = title;
          sections[currentSection] = [];
          currentSubSection = null;
        }
      } else if (currentSection === 'Pros/Cons Comparison') {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P') {
          const strongText = node.querySelector('strong')?.textContent.trim();
          if (strongText === 'Pros:') {
            currentSubSection = 'Pros';
            sections['Pros'] = [];
          } else if (strongText === 'Cons:') {
            currentSubSection = 'Cons';
            sections['Cons'] = [];
          }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
          if (currentSubSection) {
            const items = Array.from(node.querySelectorAll('li')).map((li) => li.innerHTML);
            sections[currentSubSection] = sections[currentSubSection].concat(items);
          }
        }
      } else if (currentSection === 'Key Features') {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
          const listItems = Array.from(node.children);
          listItems.forEach((li) => {
            if (li.tagName === 'LI') {
              if (li.classList.contains('ql-indent-1')) {
                // This is a sub-item
                if (sections[currentSection].length > 0) {
                  // Get the last feature HTML
                  let lastFeatureHTML = sections[currentSection].pop();
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = lastFeatureHTML;

                  // Find or create a nested <ul> for sub-items
                  let nestedUL = tempDiv.querySelector('ul');
                  if (!nestedUL) {
                    nestedUL = document.createElement('ul');
                    nestedUL.className = 'list-disc ml-6 mt-2 space-y-2'; // Add classes here
                    tempDiv.appendChild(nestedUL);
                  }

                  // Append the sub-item <li> to the nested <ul>
                  nestedUL.appendChild(li.cloneNode(true));

                  // Update the feature HTML with the new sub-item
                  lastFeatureHTML = tempDiv.innerHTML;

                  // Push back the updated feature HTML
                  sections[currentSection].push(lastFeatureHTML);
                }
              } else {
                // This is a main feature
                sections[currentSection].push(li.outerHTML);
              }
            }
          });
        }
      } else if (currentSection === 'Use Cases') {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
          const listItems = Array.from(node.children);
          listItems.forEach((li) => {
            if (li.tagName === 'LI') {
              if (li.classList.contains('ql-indent-1')) {
                // This is a sub-item
                if (sections[currentSection].length > 0) {
                  // Get the last feature HTML
                  let lastFeatureHTML = sections[currentSection].pop();
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = lastFeatureHTML;

                  // Find or create a nested <ul> for sub-items
                  let nestedUL = tempDiv.querySelector('ul');
                  if (!nestedUL) {
                    nestedUL = document.createElement('ul');
                    nestedUL.className = 'list-disc ml-6 mt-2 space-y-2'; // Add classes here
                    tempDiv.appendChild(nestedUL);
                  }

                  // Append the sub-item <li> to the nested <ul>
                  nestedUL.appendChild(li.cloneNode(true));

                  // Update the feature HTML with the new sub-item
                  lastFeatureHTML = tempDiv.innerHTML;

                  // Push back the updated feature HTML
                  sections[currentSection].push(lastFeatureHTML);
                }
              } else {
                // This is a main feature
                sections[currentSection].push(li.outerHTML);
              }
            }
          });
        }
      } else if (currentSection === 'Pricing Information') {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
          const items = Array.from(node.querySelectorAll('li')).map((li) => li.innerHTML);
          // Transform HTML strings into structured objects
          sections[currentSection] = items.map((item) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = item;
            const strong = tempDiv.querySelector('strong');
            const span = tempDiv.querySelector('span');
            return {
              name: strong ? strong.innerHTML.replace(':', '').trim() : 'Unnamed Plan',
              description: span ? span.innerHTML.trim() : 'No description available.'
            };
          });
        }
      } else if (currentSection === 'Reviews') {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'UL') {
          const items = [node.outerHTML]; // Assuming each <ul> is a separate string
          sections[currentSection] = items;
        }
      } else if (currentSection) {
        sections[currentSection].push(node.outerHTML || node.textContent);
      }
    });

    return sections;
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const sectionId = tab
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/\//g, '')
      .replace('proscons-comparison', 'pros-cons-comparison');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = () => (
    <>
      {tabs.map((tab) => (
        <section
          id={tab.toLowerCase().replace(/\s+/g, '-').replace(/\//g, '').replace('proscons-comparison', 'pros-cons-comparison')}
          className="mt-4 lg:mt-0 lg:p-4 scroll-section"
          key={tab}
        >
          {tab !== 'About' && <h2 className="text-2xl font-bold mb-4">{tab}</h2>}
          <div>
            {tab === 'About' ? (
              <About aboutContent={sections['About']} directory={directory} />
            ) : tab === 'Key Features' ? (
              <KeyFeatures features={sections['Key Features']} />
            ) : tab === 'Use Cases' ? (
              <UseCases useCases={sections['Use Cases']} />
            ) : tab === 'Pros/Cons Comparison' ? (
              <ProsCons
                pros={sections['Pros'] || []}
                cons={sections['Cons'] || []}
              />
            ) : tab === 'Pricing Information' ? (
              <Pricing pricingData={sections['Pricing Information'] || []} directory={directory} />
            ) : tab === 'Reviews' ? (
              <Reviews reviews={sections['Reviews'] || []} />
            ) : (
              sections[tab] ? parse(sections[tab].join('')) : <p>No content available</p>
            )}
          </div>
        </section>
      ))}
    </>
  );

  const handleToggleSaved = async (event) => {
    event.stopPropagation();
    if (!user) {
      toast.error(toastText.error.savingWithoutLogin);
      router.push("/login");
      return;
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/saves`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.status === 200) {
      setDirectorySaveStatus(!directorySaveStatus);
      setDirectorySaves((prevState) => directorySaveStatus ? prevState - 1 : prevState + 1);
      toast.success(directorySaveStatus ? "Save removed from your list" : "Save added to your list");
    } else {
      toast.error(toastText.error.directoryNotSaved);
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen sm:pt-32 pt-20 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
      <div className="min-h-screen text-white w-full pb-8"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, transparent 0px, transparent 700px, #181C1F 500px, #181C1F 100%)',
        }}>
        <h1 className='text-wrap lg:max-w-[75%] text-base lg:text-2xl mx-[30px] lg:mx-auto mb-8 lg:font-bold text-center tracking-wider'>We only include high-quality, business-grade AI tools & software in our directory.<br className='hidden 2xl:block' /><span className="text-main-purple"> Learn more</span> about our rigorous approval and verification process.</h1>
        <div className={`${isFixed ? 'bg-[#181C1F] h-[200px] w-full fixed lg:hidden top-[70px] z-10' : 'hidden'}`} style={{
          background: 'linear-gradient(to bottom, #1e1e1e, #181C1F)',
        }} />
        <div className="px-[30px] lg:px-[135px]">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row ">
            {/* Left Side Text Section */}
            <div className="flex w-full lg:w-[70%] lg:mr-8 space-y-4">
              <div className="w-full">
                <div className="btn flex lg:flex-row flex-col justify-between lg:items-center gap-4 lg:gap-0 mb-6 lg:mb-0">
                  <div className="feat2 flex gap-4 w-full">
                    <div className="text-white relative">
                      {(directory && directory?.icon) &&
                        <Image className='rounded-xl w-[90px] h-[90px] md:w-[105px] md:h-[105px]' width={100} height={100} src={directory?.icon} alt='' quality={100} />
                      }
                      {directory?.isVerified &&
                        <div className="absolute top-[-5px] right-[-5px]">
                          <Image
                            alt="GetGenie"
                            width={100}
                            height={100}
                            src="/images/verified.png"
                            className="w-[25px] h-[25px]"
                          />
                        </div>
                      }
                    </div>

                    <div className="genie">
                      <h2 className="text-lg md:text-2xl font-bold tracking-wider">{directory?.name}</h2>
                      <div className='flex gap-1 mb-2'>
                        <StarRating rating={directory?.averageRating} size='md' />
                        <p>({directory?.reviews})</p>
                      </div>
                      <div className='flex gap-3'>
                        {directory?.isFeatured &&
                          <div className="relative inline-block">
                            {/* Featured Text with Icon */}
                            <svg width="89" height="26" viewBox="0 0 89 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0H88.5V26H0L7 13L0 0Z" fill="#8B60B2" />
                            </svg>

                            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full ml-1" style={{ fontWeight: '400' }}>
                              <FontAwesomeIcon icon={solidStar} color="white" height={11} width={12} />

                              <span className="text-white text-xs font-semibold ml-1">Featured</span>
                            </div>
                          </div>
                        }
                        <button className='flex gap-1 py-1 px-2 items-center bg-[#4B4B4B] text-xs rounded-sm'>{directory?.type}</button>
                      </div>

                    </div>
                  </div>
                  <div className="save flex lg:justify-end gap-4 w-full">
                    <button className='flex items-center justify-center w-[43%] lg:w-auto py-2 px-4 lg:px-6 h-[41px] tracking-wider border border-[rgba(255,255,255,0.2)] text-white font-bold rounded-[5px] bg-[#323639]' onClick={handleToggleSaved}>
                      {directorySaveStatus ?
                        <FillBookMarkIcon width={18} height={20} className='mr-2' />
                        :
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                          <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                        </svg>}

                      Save ({directorySaves || 0})
                    </button>
                    <button onClick={() => window.open(directory?.website, '_blank')} className='flex w-[57%] tracking-wider lg:w-auto items-center justify-center py-2 px-4 lg:px-6 h-[41px] bg-[#8B60B2] font-bold rounded-[5px]'>
                      <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                        <path d="M9 0.5H13H14V1.5V5.5V6.5H12V5.5V3.9375L6.6875 9.21875L6 9.9375L4.5625 8.5L5.28125 7.8125L10.5625 2.5H9H8V0.5H9ZM1 1.5H5H6V3.5H5H2V12.5H11V9.5V8.5H13V9.5V13.5V14.5H12H1H0V13.5V2.5V1.5H1Z" fill="white" />
                      </svg>

                      Visit website
                    </button>
                  </div>
                </div>

                <h2 className='text-lg font-bold tracking-wider text-left mb-4 lg:hidden block'>App Feature</h2>

                <div className="relative w-full lg:hidden ">

                  <Swiper
                    spaceBetween={30}
                    slidesPerView={1.7}
                    modules={[Navigation]}
                    loop={false}
                    navigation={{
                      nextEl: '.swiper-button-next-custom',
                      prevEl: '.swiper-button-prev-custom',
                    }}
                    breakpoints={{
                      // When window width is >= 640px (mobile screen)
                      200: {
                        slidesPerView: 1.7,
                        spaceBetween: 30,
                      },
                    }}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                  >
                    {featureDirectories?.map((tool, i) => (
                      <SwiperSlide className='rounded-lg shadow-lg' key={i}>
                        <MobileFeature directory={tool} />
                      </SwiperSlide>

                    ))}
                  </Swiper>
                </div>
                <div className='hidden lg:block'>
                  <About aboutContent={sections['About']} directory={directory} />
                </div>


                <Slider className='hidden lg:block' directory={directory} />

                <div className="flex flex-col lg:flex-row relative">
                  {/* Sidebar */}
                  <div className={`${isFixed ? 'fixed lg:hidden top-[100px] z-10 flex justify-between w-[85%]' : 'hidden'}`}>
                    <div className='flex gap-4'>
                      {directory && directory?.icon &&
                        <Image className='rounded-xl w-[50px] h-[50px] md:w-[105px] md:h-[105px]' width={100} height={100} src={directory?.icon} alt='' quality={100} />
                      }
                      <div className="flex flex-col justify-between">
                        <h2 className="text-lg md:text-2xl font-bold tracking-wider">{directory?.name}</h2>
                        <div className='flex justify-between items-center'>
                          <StarRating rating={directory?.averageRating} size='md' />
                          <p>({directory?.reviews})</p>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <button className='flex items-center justify-center h-[50px] p-[15px] text-white font-bold rounded-[5px] bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)]' onClick={handleToggleSaved}>
                        {directorySaveStatus ?
                          <FillBookMarkIcon width={18} height={20} />
                          :
                          <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                          </svg>}
                      </button>
                      <button onClick={() => window.open(directory?.website, '_blank')} className='flex h-[50px] items-center justify-center p-[15px] bg-[#8B60B2] font-bold rounded-[5px]'>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.2502 0.833374H15.2502H16.0002V1.58337V6.58337V7.33337H14.5002V6.58337V3.39587L7.53141 10.3646L7.00016 10.8959L5.93766 9.83337L6.46891 9.30212L13.4377 2.33337H10.2502H9.50016V0.833374H10.2502ZM0.750164 1.83337H6.25016H7.00016V3.33337H6.25016H1.50016V15.3334H13.5002V10.5834V9.83337H15.0002V10.5834V16.0834V16.8334H14.2502H0.750164H0.000164032V16.0834V2.58337V1.83337H0.750164Z" fill="white" />
                        </svg>

                      </button>
                    </div>
                  </div>
                  <div
                    className={`tabs-container w-full lg:w-1/4 bg-[#1e1e1e] lg:bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[6px] py-4 px-2 lg:rounded-lg ${isMobile && isFixed ? 'fixed top-[190px] z-10' : ''
                      } lg:sticky lg:top-10 lg:h-[280px]`}
                  >
                    <ul className="lg:space-y-2 hidden lg:block ">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            className={`text-left py-2 px-4 text-xs rounded-lg ${activeTab === tab && 'bg-[#8B60B2] text-white'}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="lg:hidden flex overflow-x-auto no-scrollbar pr-4">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            ref={(el) => { tabRefs.current[tab] = el; }}
                            className={`text-left py-2 px-4 text-xs rounded-lg ${activeTab === tab ? 'bg-[#8B60B2] text-white' : ''}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main Content */}
                  <div className="w-full lg:w-3/4 lg:ml-8">
                    {renderContent()}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Cards Section */}
            <div className="hidden lg:sticky lg:max-h-[75vh] lg:top-10 lg:flex flex-col lg:w-[30%] px-8 gap-4">
              <div
                className="hidden lg:flex flex-col lg:w-[100%] overflow-y-auto no-scrollbar"
              >
                {featureDirectories?.map((tool, i) => (
                  <FeatureCard directory={tool} key={i} />
                ))}
              </div>
              <Cards directory={directory} />
            </div>

          </div>
          <PersonReviews directory={directory} />
          <DirectoryAlternatives category={directory?.categories?.join(', ')} currentDirectory={directory} />
        </div>
      </div>
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#323639] text-white shadow-lg hover:bg-[#6a4790] focus:outline-none"
        >
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.53125 0.59375L11.3125 5.375L11.8438 5.90625L10.7812 6.96875L10.25 6.4375L6.75 2.9375V13.25V14H5.25V13.25V2.9375L1.71875 6.4375L1.1875 6.96875L0.125 5.90625L0.65625 5.375L5.46875 0.59375L6 0.0625L6.53125 0.59375Z" fill="white" />
          </svg>

        </button>
      )}
    </section>
  );
}

export default Directory;
