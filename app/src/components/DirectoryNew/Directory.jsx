'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
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

function Directory() {

  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState(isMobile ? 'About' : 'Key Features');
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // Adjust breakpoint as needed
    };
    handleResize(); // Set initial value
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update the tabs to match your headings
  const tabs = isMobile
    ? ['About', 'Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary']
    : ['Key Features', 'Use Cases', 'Pricing Information', 'Reviews', 'Pros/Cons Comparison', 'Summary'];


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll-to-top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const threshold = 200;
    if (window.scrollY > threshold) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

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
        if (error.response.status === 404) {
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
          const items = Array.from(node.querySelectorAll('li')).map((li) => li.innerHTML);
          sections[currentSection] = sections[currentSection].concat(items);
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

  useEffect(() => {
    const handleScroll = () => {
      tabs.forEach((tab) => {
        const sectionId = tab.toLowerCase().replace(/\s+/g, '-').replace('/', '').replace('comparison', 'comparison');
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const sectionId = tab.toLowerCase().replace(/\s+/g, '-').replace('/', '').replace('comparison', 'comparison');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const renderContent = () => (
    <>
      {tabs.map((tab) => (
        <section
          id={tab.toLowerCase().replace(/\s+/g, '-').replace('/', '').replace('comparison', 'comparison')}
          className="mt-4 lg:mt-0 lg:p-4"
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
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen sm:pt-32 pt-20 pb-8 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
      <div className="min-h-screen text-white w-full">
        <h1 className='text-wrap lg:max-w-[59%] text-base lg:text-2xl mx-[30px] lg:mx-auto mb-8 lg:font-bold text-center tracking-wider'>We only include high-quality, business-grade AI tools & software in our directory.<span className="text-main-purple"> Learn about</span> our rigorous approval and verification process.</h1>
        <div className={`${isFixed ? 'bg-[#181C1F] h-[200px] w-full fixed lg:hidden top-[70px] z-20' : 'hidden'}`} style={{
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
                      {(directory && directory?.icon) ?
                        <Image className='rounded-xl w-[90px] h-[90px] md:w-[105px] md:h-[105px]' width={100} height={100} src={directory?.icon} alt='' quality={100} />
                        :
                        <Image className='rounded-xl w-[90px] h-[90px] md:w-[105px] md:h-[105px]' width={100} height={100} src={feat2} alt='' quality={100} />
                      }
                      {directory?.isVerified &&
                        <div className="absolute top-[-5px] right-[-5px]">
                          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <mask id="path-1-outside-1_135_150" maskUnits="userSpaceOnUse" x="-2" y="-2" width="24" height="25" fill="black">
                              <rect fill="white" x="-2" y="-2" width="24" height="25" />
                              <path d="M10 0.5C11.4062 0.5 12.6562 1.32031 13.2812 2.53125C14.5703 2.10156 16.0547 2.41406 17.0703 3.42969C18.0859 4.44531 18.3984 5.92969 17.9688 7.21875C19.1797 7.84375 20 9.09375 20 10.5C20 11.9453 19.1797 13.1953 17.9688 13.8203C18.3984 15.1094 18.0859 16.5547 17.0703 17.5703C16.0547 18.5859 14.5703 18.8984 13.2812 18.5078C12.6562 19.7188 11.4062 20.5 10 20.5C8.55469 20.5 7.30469 19.7188 6.67969 18.5078C5.39062 18.8984 3.94531 18.5859 2.92969 17.5703C1.91406 16.5547 1.60156 15.1094 1.99219 13.8203C0.78125 13.1953 0 11.9453 0 10.5C0 9.09375 0.78125 7.84375 1.99219 7.21875C1.60156 5.92969 1.91406 4.44531 2.92969 3.42969C3.94531 2.41406 5.39062 2.10156 6.67969 2.53125C7.30469 1.32031 8.55469 0.5 10 0.5ZM13.7891 9.28906L14.4531 8.625L13.125 7.33594L12.4609 8L8.75 11.7109L7.22656 10.1875L6.5625 9.52344L5.23438 10.8125L5.89844 11.4766L8.08594 13.6641L8.75 14.3281L9.41406 13.6641L13.7891 9.28906Z" />
                            </mask>
                            <path d="M10 0.5C11.4062 0.5 12.6562 1.32031 13.2812 2.53125C14.5703 2.10156 16.0547 2.41406 17.0703 3.42969C18.0859 4.44531 18.3984 5.92969 17.9688 7.21875C19.1797 7.84375 20 9.09375 20 10.5C20 11.9453 19.1797 13.1953 17.9688 13.8203C18.3984 15.1094 18.0859 16.5547 17.0703 17.5703C16.0547 18.5859 14.5703 18.8984 13.2812 18.5078C12.6562 19.7188 11.4062 20.5 10 20.5C8.55469 20.5 7.30469 19.7188 6.67969 18.5078C5.39062 18.8984 3.94531 18.5859 2.92969 17.5703C1.91406 16.5547 1.60156 15.1094 1.99219 13.8203C0.78125 13.1953 0 11.9453 0 10.5C0 9.09375 0.78125 7.84375 1.99219 7.21875C1.60156 5.92969 1.91406 4.44531 2.92969 3.42969C3.94531 2.41406 5.39062 2.10156 6.67969 2.53125C7.30469 1.32031 8.55469 0.5 10 0.5ZM13.7891 9.28906L14.4531 8.625L13.125 7.33594L12.4609 8L8.75 11.7109L7.22656 10.1875L6.5625 9.52344L5.23438 10.8125L5.89844 11.4766L8.08594 13.6641L8.75 14.3281L9.41406 13.6641L13.7891 9.28906Z" fill="white" />
                            <path d="M13.2812 2.53125L11.504 3.44854L12.2893 4.97008L13.9137 4.42862L13.2812 2.53125ZM17.9688 7.21875L16.0714 6.58629L15.5299 8.21068L17.0515 8.99599L17.9688 7.21875ZM17.9688 13.8203L17.0515 12.0431L15.5299 12.8284L16.0714 14.4528L17.9688 13.8203ZM13.2812 18.5078L13.8613 16.5938L12.2677 16.1109L11.504 17.5905L13.2812 18.5078ZM6.67969 18.5078L8.45693 17.5905L7.69323 16.1109L6.09967 16.5938L6.67969 18.5078ZM1.99219 13.8203L3.90624 14.4003L4.38913 12.8068L2.90947 12.0431L1.99219 13.8203ZM1.99219 7.21875L2.90947 8.99599L4.38913 8.2323L3.90624 6.63874L1.99219 7.21875ZM6.67969 2.53125L6.04723 4.42862L7.67162 4.97008L8.45693 3.44854L6.67969 2.53125ZM14.4531 8.625L15.8673 10.0392L17.3028 8.60373L15.8461 7.18984L14.4531 8.625ZM13.125 7.33594L14.518 5.90078L13.104 4.52846L11.7108 5.92172L13.125 7.33594ZM8.75 11.7109L7.33579 13.1252L8.75 14.5394L10.1642 13.1252L8.75 11.7109ZM6.5625 9.52344L7.97671 8.10922L6.58345 6.71596L5.16955 8.08828L6.5625 9.52344ZM5.23438 10.8125L3.84142 9.37734L2.38468 10.7912L3.82016 12.2267L5.23438 10.8125ZM8.75 14.3281L7.33579 15.7423L8.75 17.1566L10.1642 15.7423L8.75 14.3281ZM10 2.5C10.6131 2.5 11.2012 2.86178 11.504 3.44854L15.0585 1.61396C14.1113 -0.22115 12.1994 -1.5 10 -1.5V2.5ZM13.9137 4.42862C14.5024 4.2324 15.1896 4.37741 15.6561 4.8439L18.4845 2.01547C16.9198 0.450714 14.6383 -0.0292765 12.6488 0.633883L13.9137 4.42862ZM15.6561 4.8439C16.1226 5.31039 16.2676 5.99765 16.0714 6.58629L19.8661 7.85121C20.5293 5.86173 20.0493 3.58023 18.4845 2.01547L15.6561 4.8439ZM17.0515 8.99599C17.6382 9.29884 18 9.88689 18 10.5H22C22 8.30061 20.7212 6.38866 18.886 5.44151L17.0515 8.99599ZM18 10.5C18 11.164 17.6273 11.7459 17.0515 12.0431L18.886 15.5976C20.7321 14.6448 22 12.7266 22 10.5H18ZM16.0714 14.4528C16.2643 15.0316 16.1298 15.6824 15.6561 16.1561L18.4845 18.9845C20.0421 17.427 20.5325 15.1872 19.8661 13.1879L16.0714 14.4528ZM15.6561 16.1561C15.1901 16.6221 14.4829 16.7821 13.8613 16.5938L12.7012 20.4219C14.6577 21.0147 16.9193 20.5497 18.4845 18.9845L15.6561 16.1561ZM11.504 17.5905C11.2192 18.1423 10.6514 18.5 10 18.5V22.5C12.1611 22.5 14.0933 21.2952 15.0585 19.4251L11.504 17.5905ZM10 18.5C9.29759 18.5 8.73624 18.1317 8.45693 17.5905L4.90245 19.4251C5.87313 21.3058 7.81179 22.5 10 22.5V18.5ZM6.09967 16.5938C5.48827 16.779 4.8172 16.6294 4.3439 16.1561L1.51547 18.9845C3.07342 20.5425 5.29298 21.0178 7.2597 20.4219L6.09967 16.5938ZM4.3439 16.1561C3.8706 15.6828 3.72096 15.0117 3.90624 14.4003L0.0781387 13.2403C-0.517838 15.207 -0.0424729 17.4266 1.51547 18.9845L4.3439 16.1561ZM2.90947 12.0431C2.36831 11.7638 2 11.2024 2 10.5H-2C-2 12.6882 -0.805805 14.6269 1.0749 15.5976L2.90947 12.0431ZM2 10.5C2 9.84856 2.35772 9.28077 2.90947 8.99599L1.0749 5.44151C-0.795218 6.40673 -2 8.33894 -2 10.5H2ZM3.90624 6.63874C3.71787 6.01712 3.87787 5.30993 4.3439 4.8439L1.51547 2.01547C-0.0497471 3.58069 -0.514742 5.84226 0.0781387 7.79876L3.90624 6.63874ZM4.3439 4.8439C4.8176 4.3702 5.4684 4.23567 6.04723 4.42862L7.31214 0.633883C5.31285 -0.0325491 3.07302 0.457926 1.51547 2.01547L4.3439 4.8439ZM8.45693 3.44854C8.75413 2.87271 9.33602 2.5 10 2.5V-1.5C7.77336 -1.5 5.85525 -0.232088 4.90245 1.61396L8.45693 3.44854ZM15.2033 10.7033L15.8673 10.0392L13.0389 7.21079L12.3748 7.87485L15.2033 10.7033ZM15.8461 7.18984L14.518 5.90078L11.732 8.7711L13.0602 10.0602L15.8461 7.18984ZM11.7108 5.92172L11.0467 6.58579L13.8752 9.41421L14.5392 8.75015L11.7108 5.92172ZM11.0467 6.58579L7.33579 10.2967L10.1642 13.1252L13.8752 9.41421L11.0467 6.58579ZM10.1642 10.2967L8.64078 8.77329L5.81235 11.6017L7.33579 13.1252L10.1642 10.2967ZM8.64078 8.77329L7.97671 8.10922L5.14829 10.9377L5.81235 11.6017L8.64078 8.77329ZM5.16955 8.08828L3.84142 9.37734L6.62733 12.2477L7.95545 10.9586L5.16955 8.08828ZM3.82016 12.2267L4.48422 12.8908L7.31265 10.0623L6.64859 9.39829L3.82016 12.2267ZM4.48422 12.8908L6.67172 15.0783L9.50015 12.2498L7.31265 10.0623L4.48422 12.8908ZM6.67172 15.0783L7.33579 15.7423L10.1642 12.9139L9.50015 12.2498L6.67172 15.0783ZM10.1642 15.7423L10.8283 15.0783L7.99985 12.2498L7.33579 12.9139L10.1642 15.7423ZM10.8283 15.0783L15.2033 10.7033L12.3748 7.87485L7.99985 12.2498L10.8283 15.0783Z" fill="white" mask="url(#path-1-outside-1_135_150)" />
                            <path d="M10 0.5C11.4062 0.5 12.6562 1.32031 13.2812 2.53125C14.5703 2.10156 16.0547 2.41406 17.0703 3.42969C18.0859 4.44531 18.3984 5.92969 17.9688 7.21875C19.1797 7.84375 20 9.09375 20 10.5C20 11.9453 19.1797 13.1953 17.9688 13.8203C18.3984 15.1094 18.0859 16.5547 17.0703 17.5703C16.0547 18.5859 14.5703 18.8984 13.2812 18.5078C12.6562 19.7188 11.4062 20.5 10 20.5C8.55469 20.5 7.30469 19.7188 6.67969 18.5078C5.39062 18.8984 3.94531 18.5859 2.92969 17.5703C1.91406 16.5547 1.60156 15.1094 1.99219 13.8203C0.78125 13.1953 0 11.9453 0 10.5C0 9.09375 0.78125 7.84375 1.99219 7.21875C1.60156 5.92969 1.91406 4.44531 2.92969 3.42969C3.94531 2.41406 5.39062 2.10156 6.67969 2.53125C7.30469 1.32031 8.55469 0.5 10 0.5ZM13.7891 9.28906L14.4531 8.625L13.125 7.33594L12.4609 8L8.75 11.7109L7.22656 10.1875L6.5625 9.52344L5.23438 10.8125L5.89844 11.4766L8.08594 13.6641L8.75 14.3281L9.41406 13.6641L13.7891 9.28906Z" fill="#8B60B2" />
                          </svg>
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

                            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full ml-1">
                              <svg width="16" height="14" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 0L22.375 10.25L33.8125 12.25L25.75 20.5625L27.375 32L17 26.9375L6.5625 32L8.25 20.5625L0.125 12.25L11.5625 10.25L17 0Z" fill="white" />
                              </svg>

                              <span className="text-white text-xs font-semibold ml-1">Featured</span>
                            </div>
                          </div>
                        }
                        <button className='flex gap-1 py-1 px-2 items-center bg-[#4B4B4B] text-xs rounded-sm'>{directory?.type}</button>
                      </div>

                    </div>
                  </div>
                  <div className="save flex lg:justify-end gap-4 w-full">
                    <button className='flex items-center justify-center w-full lg:w-auto py-2 px-6 h-[41px] tracking-wider border border-[rgba(255,255,255,0.2)] text-white font-bold rounded-[5px] bg-[#323639]' onClick={handleToggleSaved}>
                      {directorySaveStatus ?
                        <FillBookMarkIcon width={18} height={20} className='mr-2' />
                        :
                        <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                          <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                        </svg>}

                      Save ({directorySaves || 0})
                    </button>
                    <button onClick={() => window.open(directory?.website, '_blank')} className='flex w-full tracking-wider lg:w-auto items-center justify-center py-2 px-6 h-[41px] bg-[#8B60B2] font-bold rounded-[5px]'>
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

                <div className="flex flex-col lg:flex-row relative">
                  {/* Sidebar */}
                  <div className={`${isFixed ? 'fixed lg:hidden top-[100px] z-20 flex justify-between w-[85%]' : 'hidden'}`}>
                    <div className='flex gap-4'>
                      {directory && directory?.icon ?
                        <Image className='rounded-xl w-[50px] h-[50px] md:w-[105px] md:h-[105px]' width={100} height={100} src={directory?.icon} alt='' quality={100} />
                        :
                        <Image className='rounded-xl w-[50px] h-[50px] md:w-[105px] md:h-[105px]' width={100} height={100} src={feat2} alt='' quality={100} />
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
                    className={`w-full lg:w-1/4 bg-[#1e1e1e] lg:bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-[6px] py-4 px-2 lg:rounded-lg ${isMobile && isFixed ? 'fixed top-[190px] z-20' : ''
                      } lg:sticky lg:top-10 lg:h-[280px]`}
                  >
                    <ul className="lg:space-y-2 hidden lg:block ">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            className={`lg:w-full text-left py-2 px-4 text-xs rounded-lg ${activeTab === tab && 'bg-[#8B60B2] text-white'}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <ul className="lg:hidden flex space-x-2 overflow-x-auto no-scrollbar">
                      {tabs.map((tab) => (
                        <li key={tab} className="flex-shrink-0">
                          <button
                            ref={(el) => { tabRefs.current[tab] = el; }}
                            className={`lg:w-full text-left py-2 px-4 text-xs rounded-lg ${activeTab === tab && 'bg-[#8B60B2] text-white'}`}
                            onClick={() => handleTabClick(tab)}
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Main Content */}
                  <div className="w-full lg:w-3/4 lg:ml-8 sticky">
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
