import { useEffect, useState, useRef } from "react";
import FeatureCard from "./FeatureCard";
import UseCaseMultiSelect from "./UseCaseMultiSelect";


const FeatureSection = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Featured");

    const [isMobile, setIsMobile] = useState(false);

    // Check screen size on load and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleTabClick = (buttonName) => {
        setActiveTab(buttonName);
    };

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
            title: "Comma",
            description: "Comma.ai is an autonomous driving technology company that provides open-source software and hardware for enhancing vehicle automation.",
            pricing: "Paid",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: false,
            imageUrl: "/images/feat1.jpeg"
        },
        {
            id: 6,
            title: "Jupiter AI",
            description: "Jupiter AI is a robust AI platform that provides predictive analytics and risk management solutions to various industries.",
            pricing: "Paid",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: true,
            imageUrl: "/images/feat1.jpeg"
        },
        {
            id: 7,
            title: "ClimateAI",
            description: "ClimateAI is an AI-powered platform that provides climate risk forecasting and adaptation solutions to businesses and governments.",
            pricing: "Paid",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: false,
            imageUrl: "/images/feat2.jpeg"
        },
        {
            id: 8,
            title: "DeepL",
            description: "DeepL is an AI-powered translation tool designed to provide highly accurate and nuanced translation services in various languages.",
            pricing: "Free",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: false,
            imageUrl: "/images/feat2.jpeg"
        },
        {
            id: 9,
            title: "Sift",
            description: "Sift is a digital trust and safety platform that uses machine learning to detect and prevent fraud across the internet.",
            pricing: "Freemium",
            rating: 5,
            reviews: 100,
            featured: true,
            verified: true,
            badge: "Featured",
            imageUrl: "/images/feat1.jpeg"
        },
        {
            id: 10,
            title: "Cylance",
            description: "Cylance is a cybersecurity company that utilizes artificial intelligence to provide advanced threat detection and prevention solutions.",
            pricing: "Paid",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: false,
            imageUrl: "/images/feat2.jpeg"
        },
        {
            id: 11,
            title: "Darktrace",
            description: "Darktrace is a cybersecurity company that uses AI and machine learning to detect and respond to sophisticated cyber threats in real time.",
            pricing: "Paid",
            rating: 5,
            reviews: 100,
            featured: true,
            verified: true,
            badge: "Featured",
            imageUrl: "/images/feat1.jpeg"
        },
        {
            id: 12,
            title: "AssemblyAI",
            description: "AssemblyAI is an AI-powered speech-to-text API that provides highly accurate transcription services and integrates easily into applications.",
            pricing: "Freemium",
            rating: 5,
            reviews: 100,
            featured: false,
            verified: false,
            imageUrl: "/images/feat2.jpeg"
        }
    ];


    // Slice data for mobile view
    const displayedTools = isMobile ? aiToolsData.slice(0, 4) : aiToolsData;

    return (
        <section className="py-8 border-t border-[rgba(255,255,255,0.2)]">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                {/* Tabs */}
                <div className="flex items-center justify-between space-x-[10px] bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] rounded-md py-[5px] px-[10px] sm:py-[10px] sm:px-[15px] w-full sm:w-auto">
                    <button
                        className={`text-xs text-center px-2 sm:px-[10px] py-[5px] rounded-md ${activeTab === "Featured" ? "bg-[#8B60B2] text-white font-bold" : "bg-transparent text-white hover:bg-[#323639]"
                            }`}
                        onClick={() => handleTabClick("Featured")}
                    >
                        Featured
                    </button>
                    <button
                        className={`text-xs text-center px-2 sm:px-[10px] py-[5px] rounded-md ${activeTab === "New" ? "bg-[#8B60B2] text-white font-bold" : "bg-transparent text-white hover:bg-[#323639]"
                            }`}
                        onClick={() => handleTabClick("New")}
                    >
                        New
                    </button>
                    <button
                        className={`text-xs text-center px-2 sm:px-[10px] py-[5px] rounded-md ${activeTab === "Popular" ? "bg-[#8B60B2] text-white font-bold" : "bg-transparent text-white hover:bg-[#323639]"
                            }`}
                        onClick={() => handleTabClick("Popular")}
                    >
                        Popular
                    </button>
                    <button
                        className={`text-xs text-center px-2 sm:px-[10px] py-[5px] rounded-md ${activeTab === "Top rated" ? "bg-[#8B60B2] text-white font-bold" : "bg-transparent text-white hover:bg-[#323639] sm:border-none border-r border-[rgba(255,255,255,0.2)]"
                            }`}
                        onClick={() => handleTabClick("Top rated")}
                    >
                        Top rated
                    </button>

                    <div className="sm:hidden border-l border-[rgba(255,255,255,0.2)] h-full"></div>

                    <button className="sm:hidden ml-4 flex items-center" onClick={toggleFilter}>
                        <svg width="20" height="15" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H28V3H0V0ZM4 10H24V13H4V10ZM18 20V23H10V20H18Z" fill="white" />
                        </svg>
                    </button>
                </div>

                {/* Filter Options */}
                <div className="hidden sm:flex items-center bg-[#323639] border border-[rgba(255,255,255,0.2)] text-white rounded-md py-[10px] px-[20px] mt-4 sm:mt-0">
                    {/* Verified Toggle */}
                    <div className="hidden sm:flex items-center pr-4 border-r border-[rgba(255,255,255,0.2)]">
                        <span className="mr-2 text-xs">Verified</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#8B60B2] dark:peer-focus:ring-[#8B60B2] peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B60B2]"></div>
                        </label>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block border-l border-[rgba(255,255,255,0.2)] h-full"></div>

                    {/* Filter Icon */}
                    <div className="relative">
                        <button className="ml-4 hidden sm:flex items-center" onClick={toggleFilter}>
                            <svg width="20" height="15" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H28V3H0V0ZM4 10H24V13H4V10ZM18 20V23H10V20H18Z" fill="white" />
                            </svg>

                            <span className="ml-2 text-xs">Filter</span>
                        </button>



                        {isFilterOpen && (
                            <div className="fixed sm:absolute inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 sm:bg-trasparent sm:bg-opacity-0" onClick={toggleFilter}>
                                <div className="relative inset-x-0 bottom-0 sm:inset-x-[-30px] sm:bottom-[-300px] sm:absolute sm:mt-2 sm:right-0 bg-[#1E1E1E] p-4 rounded-t-lg sm:rounded-lg shadow-lg z-60 w-full sm:w-64">
                                    <div className="flex justify-between items-center text-white font-semibold text-lg mb-4 border-b border-[rgba(255,255,255,0.2)] pb-2">
                                        <p>Filter</p>
                                        <div className="flex justify-center items-center">
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.32812 3.35156C2.92969 3.77344 2.625 4.24219 2.46094 4.75781L1.03125 4.26562C1.28906 3.53906 1.71094 2.85938 2.27344 2.29688C4.33594 0.257812 7.64062 0.257812 9.70312 2.29688L11.0625 0.9375L11.625 1.5V5.25H7.875L7.3125 4.6875L8.64844 3.35156C7.17188 1.89844 4.80469 1.89844 3.32812 3.35156ZM3.32812 8.67188C4.80469 10.125 7.17188 10.125 8.64844 8.67188C9.04688 8.25 9.35156 7.78125 9.53906 7.26562L10.9453 7.75781C10.6875 8.48438 10.2891 9.14062 9.70312 9.72656C7.66406 11.7656 4.33594 11.7656 2.27344 9.72656L0.9375 11.0625L0.375 10.5V6.75H4.125L4.6875 7.3125L3.32812 8.67188Z" fill="white" />
                                            </svg>
                                            <p className="text-xs ml-[5px]">Remove filter</p>
                                        </div>
                                    </div>

                                    {/* Price Filter */}
                                    <div className="mb-4 bg-[#323639] rounded-md border border-[rgba(255,255,255,0.2)] p-2">
                                        <label className="block text-[rgba(255,255,255,0.5)] text-xs mb-1">PRICE</label>
                                        <select className="w-full p-0 bg-[#323639] border-none text-white rounded-md">
                                            <option value="">All pricing</option>
                                            <option value="free">Free</option>
                                            <option value="paid">Paid</option>
                                            <option value="freemium">Freemium</option>
                                        </select>
                                    </div>

                                    {/* Use Case Filter */}
                                    <UseCaseMultiSelect />

                                    {/* Apply Filter Button */}
                                    <button className="w-full py-2 mt-4 text-white bg-[#8B60B2] rounded-md font-bold">Apply filter</button>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {isFilterOpen && (
                    <>
                        <div className="fixed sm:hidden inset-0 z-40 flex items-end justify-center bg-black bg-opacity-50" onClick={toggleFilter} />
                        <div className="fixed inset-x-0 bottom-0 sm:inset-x-[-30px] sm:bottom-[-300px] sm:hidden sm:mt-2 sm:right-0 bg-[#1E1E1E] p-4 rounded-t-lg sm:rounded-lg shadow-lg z-50 w-full sm:w-64">
                            <div className="flex justify-between items-center text-white font-semibold text-lg border-b border-[rgba(255,255,255,0.2)] pb-2">
                                <p>Filter</p>
                                <div className="flex justify-center items-center">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.32812 3.35156C2.92969 3.77344 2.625 4.24219 2.46094 4.75781L1.03125 4.26562C1.28906 3.53906 1.71094 2.85938 2.27344 2.29688C4.33594 0.257812 7.64062 0.257812 9.70312 2.29688L11.0625 0.9375L11.625 1.5V5.25H7.875L7.3125 4.6875L8.64844 3.35156C7.17188 1.89844 4.80469 1.89844 3.32812 3.35156ZM3.32812 8.67188C4.80469 10.125 7.17188 10.125 8.64844 8.67188C9.04688 8.25 9.35156 7.78125 9.53906 7.26562L10.9453 7.75781C10.6875 8.48438 10.2891 9.14062 9.70312 9.72656C7.66406 11.7656 4.33594 11.7656 2.27344 9.72656L0.9375 11.0625L0.375 10.5V6.75H4.125L4.6875 7.3125L3.32812 8.67188Z" fill="white" />
                                    </svg>
                                    <p className="text-xs ml-[5px]">Remove filter</p>
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="flex items-center py-[20px] border-r border-[rgba(255,255,255,0.2)]">
                                <span className="mr-2 text-base">Verified</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#8B60B2] dark:peer-focus:ring-[#8B60B2] peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B60B2]"></div>
                                </label>
                            </div>
                            <div className="mb-4 bg-[#323639] rounded-md border border-[rgba(255,255,255,0.2)] p-2">
                                <label className="block text-[rgba(255,255,255,0.5)] text-xs mb-1">PRICE</label>
                                <select className="w-full p-0 bg-[#323639] border-none text-white rounded-md">
                                    <option value="">All pricing</option>
                                    <option value="free">Free</option>
                                    <option value="paid">Paid</option>
                                    <option value="freemium">Freemium</option>
                                </select>
                            </div>

                            {/* Use Case Filter */}
                            <UseCaseMultiSelect />

                            {/* Apply Filter Button */}
                            <button className="w-full py-2 mt-4 text-white bg-[#8B60B2] rounded-md font-bold">Apply filter</button>
                        </div>
                    </>
                )}
            </div>

            {/* AI Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {displayedTools.map((tool) => (
                    <FeatureCard feature={tool} key={tool.id} />
                ))}
            </div>

            {/* View More Button */}
            <div className="sm:flex sm:justify-center mt-8 w-full sm:w-auto">
                <button className="px-[20px] py-[10px] bg-none text-white rounded-[5px] border border-[rgba(255,255,255,0.2)] w-full sm:w-auto bg-[#1e1e1e]">View More</button>
            </div>
        </section>
    );
};

export default FeatureSection;


