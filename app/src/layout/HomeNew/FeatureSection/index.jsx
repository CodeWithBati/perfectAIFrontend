import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

import Link from "next/link";
import FeatureCard from "./FeatureCard";
import {
    directoryType,
    directoryCategory,
    directoryFilterSortBy,
} from "@/lib/form";
import MultipleSelectNew from "@/app/src/components/global/MultipleSelectNew";
import SelectNew from "@/app/src/components/global/SelectNew";
import Spinner from "@/app/src/ui/Spinner";

const defaultFilters = {
    type: "",
    sortBy: "Featured",
    categories: [],
    isVerified: false,
    search: "",
};

const FeatureSection = () => {
    const [directories, setDirectories] = useState([]);
    const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const loadingRef = useRef(false);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState(defaultFilters);
    const { token } = useSelector((state) => state.auth);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Featured");

    const [isMobile, setIsMobile] = useState(false);

    const dropdownRef = useRef(null);
    const dropdownRef2 = useRef(null);

    // Handle click outside for filter dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (dropdownRef.current && dropdownRef.current.contains(event.target)) ||
                (dropdownRef2.current && dropdownRef2.current.contains(event.target))
            ) {
                // Clicked inside one of the dropdowns; do nothing.
                return;
            }
            // Clicked outside both dropdowns; close the filter.
            setIsFilterOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Check screen size on load and resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint is 768px
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Generate the API URL based on current filters and page
    const generateFilterUrl = useCallback(() => {
        const { type, sortBy, categories, isVerified, search } = filters;
        const filterParams = [];

        if (type) filterParams.push(`type=${type}`);
        if (sortBy) filterParams.push(`sortBy=${sortBy}`);
        if (categories.length > 0) {
            categories.forEach((cat) => filterParams.push(`category=${cat}`));
        }
        if (isVerified !== undefined) filterParams.push(`isVerified=${isVerified}`);
        if (search.length !== 0) filterParams.push(`search=${search}`);

        const filterQueryString = filterParams.join("&");
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=12`;
        const finalUrl = filterQueryString
            ? `${apiUrl}&${filterQueryString}`
            : apiUrl;

        return finalUrl;
    }, [filters, page]);

    // Fetch directories from the API
    const fetchSites = useCallback(async () => {
        if (page > totalPages || loadingRef.current) return;

        setExtractMoreSpinner(true);
        loadingRef.current = true;
        try {
            const url = generateFilterUrl();
            const config = {};
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token}`,
                };
            }

            const response = await axios.get(url, config);
            if (response.status === 200) {
                setDirectories((prevSites) =>
                    page === 1
                        ? response?.data?.results
                        : [...prevSites, ...response.data.results]
                );
                setTotalPages(
                    response?.data?.pagination?.totalPages === 0
                        ? 1
                        : response?.data?.pagination?.totalPages
                );
            } else {
                console.error("Error fetching directories:", response);
            }
        } catch (error) {
            console.error("Error fetching directories:", error);
        } finally {
            setExtractMoreSpinner(false);
            loadingRef.current = false;
        }
    }, [page, totalPages, generateFilterUrl, token]);

    // Initial fetch and refetch on filters or page change
    useEffect(() => {
        fetchSites();
    }, [page, fetchSites]);

    // Apply a single filter
    const applyFilter = (key, value) => {
        const updatedFilters = {
            ...filters,
            [key]: value,
        };
        setPage(1);
        setFilters(updatedFilters);
    };

    // Set categories filter
    const setCategoriesFilter = (newCategories) => {
        const categories = newCategories.map((cat) => cat.name);
        setCategories(categories);
        setPage(1);
        setFilters((prevFilters) => ({
            ...prevFilters,
            categories: categories,
        }));
    };

    // Clear all filters
    const clearFilter = () => {
        setPage(1);
        setTotalPages(1);
        setCategories([]);
        setFilters(defaultFilters);
    };

    // Toggle filter dropdown
    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Slice data for mobile view
    const displayedTools = isMobile ? directories.slice(0, 4) : directories.slice(0, 12);

    return (
        <section className="py-8 border-t border-[rgba(255,255,255,0.2)]">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                {/* Tabs */}
                <div className="flex items-center justify-between space-x-[15px] bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] rounded-md py-[5px] px-[10px] sm:py-[10px] sm:px-[15px] w-full sm:w-auto">
                    {directoryFilterSortBy.map((tab, index) => (
                        <button
                            key={index}
                            className={`text-xs text-center px-2 sm:px-[10px] py-[5px] rounded-md ${
                                filters.sortBy === tab.name
                                    ? "bg-[#8B60B2] text-white font-semibold"
                                    : "bg-transparent text-white hover:bg-[#323639]"
                            }`}
                            onClick={() => applyFilter("sortBy", tab.name)}
                        >
                            {tab.name}
                        </button>
                    ))}

                    <div className="sm:hidden w-[1px] h-[20px] bg-[rgba(255,255,255,0.2)]"></div>

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
                        <span className="mr-2 text-xs tracking-wide">Verified</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={filters.isVerified}
                                onChange={(e) => applyFilter("isVerified", !filters.isVerified)}
                            />
                            <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#8B60B2] dark:peer-focus:ring-[#8B60B2] peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B60B2]"></div>
                        </label>
                    </div>

                    {/* Divider */}
                    <div className="hidden sm:block border-l border-[rgba(255,255,255,0.2)] h-full"></div>

                    {/* Filter Icon */}
                    <div className="relative" ref={dropdownRef}>
                        <button className="ml-4 hidden sm:flex items-center" onClick={toggleFilter}>
                            <svg width="20" height="15" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H28V3H0V0ZM4 10H24V13H4V10ZM18 20V23H10V20H18Z" fill="white" />
                            </svg>

                            <span className="ml-2 text-xs tracking-wide">Filter</span>
                        </button>

                        {isFilterOpen && (
                            <div className="z-50 absolute mt-2 right-[-20px] bg-[#1E1E1E] p-4 rounded-lg w-64">
                                <div className="flex justify-between items-center text-white font-semibold text-lg mb-4 border-b border-[rgba(255,255,255,0.2)] pb-2">
                                    <p>Filter</p>
                                    <div className="flex justify-center items-center cursor-pointer" onClick={clearFilter}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3.32812 3.35156C2.92969 3.77344 2.625 4.24219 2.46094 4.75781L1.03125 4.26562C1.28906 3.53906 1.71094 2.85938 2.27344 2.29688C4.33594 0.257812 7.64062 0.257812 9.70312 2.29688L11.0625 0.9375L11.625 1.5V5.25H7.875L7.3125 4.6875L8.64844 3.35156C7.17188 1.89844 4.80469 1.89844 3.32812 3.35156ZM3.32812 8.67188C4.80469 10.125 7.17188 10.125 8.64844 8.67188C9.04688 8.25 9.35156 7.78125 9.53906 7.26562L10.9453 7.75781C10.6875 8.48438 10.2891 9.14062 9.70312 9.72656C7.66406 11.7656 4.33594 11.7656 2.27344 9.72656L0.9375 11.0625L0.375 10.5V6.75H4.125L4.6875 7.3125L3.32812 8.67188Z" fill="white" />
                                        </svg>
                                        <p className="text-xs ml-[5px]">Remove filter</p>
                                    </div>
                                </div>

                                <SelectNew
                                    options={directoryType}
                                    id="directoryType"
                                    onChange={(e) => applyFilter("type", e.name)}
                                    selected={{ name: filters.type }}
                                    label="PRICE"
                                />
                                <MultipleSelectNew
                                    options={directoryCategory}
                                    selected={filters.categories.map((name) => ({ name }))}
                                    onChange={(e) => setCategoriesFilter(e)}
                                    Name="USE CASE"
                                    id="categories"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {isFilterOpen && (
                    <>
                        <div
                            className="fixed sm:hidden inset-0 z-40 flex items-end justify-center bg-black bg-opacity-50"
                            onClick={toggleFilter}
                        />
                        <div ref={dropdownRef2} className="fixed inset-x-0 bottom-0 sm:inset-x-[-30px] sm:bottom-[-800px] sm:hidden sm:mt-2 sm:right-0 bg-[#1E1E1E] p-4 rounded-t-lg sm:rounded-lg z-50 w-full sm:w-64">
                            <div className="flex justify-between items-center text-white font-semibold text-lg border-b border-[rgba(255,255,255,0.2)] pb-2">
                                <p>Filter</p>
                                <div
                                    className="flex justify-center items-center cursor-pointer"
                                    onClick={clearFilter}
                                >
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.32812 3.35156C2.92969 3.77344 2.625 4.24219 2.46094 4.75781L1.03125 4.26562C1.28906 3.53906 1.71094 2.85938 2.27344 2.29688C4.33594 0.257812 7.64062 0.257812 9.70312 2.29688L11.0625 0.9375L11.625 1.5V5.25H7.875L7.3125 4.6875L8.64844 3.35156C7.17188 1.89844 4.80469 1.89844 3.32812 3.35156ZM3.32812 8.67188C4.80469 10.125 7.17188 10.125 8.64844 8.67188C9.04688 8.25 9.35156 7.78125 9.53906 7.26562L10.9453 7.75781C10.6875 8.48438 10.2891 9.14062 9.70312 9.72656C7.66406 11.7656 4.33594 11.7656 2.27344 9.72656L0.9375 11.0625L0.375 10.5V6.75H4.125L4.6875 7.3125L3.32812 8.67188Z"
                                            fill="white"
                                        />
                                    </svg>
                                    <p className="text-xs ml-[5px]">Remove filter</p>
                                </div>
                            </div>

                            {/* Verified Toggle */}
                            <div className="flex items-center py-[20px] border-b border-[rgba(255,255,255,0.2)] mb-4">
                                <span className="mr-2 text-base tracking-wide">Verified</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={filters.isVerified}
                                        onChange={(e) => applyFilter("isVerified", !filters.isVerified)}
                                    />
                                    <div className="w-10 h-5 bg-gray-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-[#8B60B2] dark:peer-focus:ring-[#8B60B2] peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B60B2]"></div>
                                </label>
                            </div>

                            {/* Select for Price */}
                            <SelectNew
                                options={directoryType}
                                id="directoryType"
                                onChange={(e) => applyFilter("type", e.name)}
                                selected={filters.type ? { name: filters.type } : null}
                                label="PRICE"
                            />

                            {/* Multiple Select for Use Case */}
                            <MultipleSelectNew
                                options={directoryCategory}
                                selected={filters.categories.map((name) => ({ name }))}
                                onChange={(e) => setCategoriesFilter(e)}
                                Name="USE CASE"
                                id="categories"
                            />
                        </div>
                    </>
                )}
            </div>

            {/* AI Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {directories.map((tool) => (
                    <FeatureCard directory={tool} key={tool.id} />
                ))}
            </div>

            {/* Spinner or No Directories Message */}
            {extractMoreSpinner && (
                <div className="flex justify-center items-center py-4 w-full my-4 lg:col-span-3 md:col-span-2 col-span-1">
                    <Spinner />
                </div>
            )}
            {directories?.length === 0 && !extractMoreSpinner && (
                <p className="flex justify-center items-center py-4 w-full my-4 lg:col-span-3 md:col-span-2 col-span-1 text-white text-xl md:text-3xl">
                    No Directories found
                </p>
            )}

            {/* View More Button */}
            {page < totalPages && directories.length > 0 && (
                <div className="sm:flex sm:justify-center mt-8 w-full sm:w-auto">
                    <button
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                        className="px-[20px] py-[10px] bg-none text-white text-sm font-semibold rounded-[5px] border border-[rgba(255,255,255,0.2)] w-full sm:w-auto bg-[#1e1e1e] tracking-wider hover:bg-[#323639]"
                        disabled={extractMoreSpinner}
                    >
                        {extractMoreSpinner ? "Loading..." : "View More"}
                    </button>
                </div>
            )}
        </section>
    );
};

export default FeatureSection;
