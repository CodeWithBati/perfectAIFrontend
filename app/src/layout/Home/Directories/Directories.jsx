import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Spinner from "@/app/src/ui/Spinner";
import DirectoresCard from "./DirectoresCard";
import Label from "@/app/src/components/form/Label";
import Select from "@/app/src/components/global/Select";
import Input from "@/app/src/components/form/Input";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  directoryType,
  directoryCategory,
  directoryFilterSortBy,
} from "@/lib/form";
import Switch from "@/app/src/ui/Switch";
import MultipleSelect from "@/app/src/components/global/MultipleSelect";

const defaultFilters = {
  type: "",
  sortBy: "",
  categories: [],
  isVerified: false,
  search: "",
};

const Directories = () => {
  const [directories, setDirectories] = useState([]);
  const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef(null);
  const loadingRef = useRef(false);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const { token } = useSelector((state) => state.auth);

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
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=15`;
    const finalUrl = filterQueryString
      ? `${apiUrl}&${filterQueryString}`
      : apiUrl;

    return finalUrl;
  }, [filters, page]);

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
        console.error("error-->", response);
      }
    } catch (error) {
      loadingRef.current = false;
      console.error(error);
    } finally {
      setExtractMoreSpinner(false);
      loadingRef.current = false;
    }
  }, [page, totalPages, generateFilterUrl, token]);

  const handleScroll = useCallback(() => {
    if (listRef.current && !loadingRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listRef.current;
      if (scrollHeight - scrollTop <= clientHeight + 100) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, []);

  // useEffect(() => {
  //   if (localStorage.getItem("directories")) {
  //     setDirectories(JSON.parse(localStorage.getItem("directories")));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("directories", JSON.stringify(directories));
  // }, [directories]);

  useEffect(() => {
    fetchSites();
  }, [page, fetchSites, filters.search]);

  const applyFilter = (key, value) => {
    const updatedFilters = {
      ...filters,
      [key]: value,
    };
    setPage(1);
    setFilters(updatedFilters);
  };

  const setCategoiesFilter = (newCategories) => {
    console.log(newCategories);
    const categories = newCategories.map((cat) => cat.name);
    setCategories((prevState) => {
      const updatedState = categories;
      setPage(1);
      setFilters({
        ...filters,
        categories: categories,
      });
      return updatedState;
    });
  };

  const clearFilter = () => {
    setPage(1);
    setTotalPages(1);
    setCategories([]);
    setFilters(defaultFilters);
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="grid lg:grid-cols-4 md:grid-cols-3 gap-3 h-screen overflow-y-scroll"
    >
      <div className=" col-span-1">
        <div className=" sticky top-0">
          <div className="p-4 border dark:bg-slate-950 rounded-lg  border-gray-100 dark:border-slate-600 py-4 flex flex-col items-start justify-between gap-4 shadow-lg">
            <div className=" w-full">
              <Label htmlFor="type" className="mb-2">
                Price
              </Label>
              <Select
                options={directoryType}
                id="directoryType"
                onChange={(e) => applyFilter("type", e.name)}
                selected={{ name: filters.type }}
                className="w-full"
              />
            </div>
            <div className=" w-full">
              <Label htmlFor="type" className="mb-2">
                Use Case
              </Label>
              <MultipleSelect
                options={directoryCategory}
                selected={filters.categories.map((name) => ({ name }))}
                onChange={(e) => setCategoiesFilter(e)}
                id="categories"
              />
              {categories.map((rec, index) => {
                return (
                  <p
                    key={index}
                    className="inline-block text-white bg-blue-400 dark:text-white dark:bg-slate-600 m-2 rounded-lg px-2 py-0.5"
                  >
                    {rec}
                  </p>
                );
              })}
            </div>
            <div className=" w-full">
              <Label htmlFor="type" className="mb-2">
                Sort By
              </Label>
              <Select
                options={directoryFilterSortBy}
                id="directoryFilterSortBy"
                onChange={(e) => applyFilter("sortBy", e.name)}
                selected={{ name: filters.sortBy }}
              />
            </div>
            <div className=" w-full">
              <Label htmlFor="type" className="mb-2">
                Search
              </Label>
              <Input
                options={directoryFilterSortBy}
                id="searchDirectory"
                placeholder="Search Directory..."
                onChange={(e) => applyFilter("search", e.target.value)}
                value={filters.search}
              />
            </div>
            <div className="py-2">
              <Switch
                label="Verified"
                size="sm"
                checked={filters.isVerified}
                onChange={(e) => applyFilter("isVerified", !filters.isVerified)}
              />
            </div>
            <div>
              <button
                onClick={clearFilter}
                className=" bg-red-500 hover:bg-red-800 text-white px-3 py-1 rounded-lg"
              >
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" lg:col-span-3 md:col-span-2 col-span-1">
        <div className=" grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-3">
          {directories?.map((dir) => (
            <DirectoresCard key={dir.id} dir={dir} />
          ))}
          {extractMoreSpinner && (
            <div className="flex justify-center items-center py-4 w-full my-4 lg:col-span-3 md:col-span-2 col-span-1">
              <Spinner />
            </div>
          )}
          {directories?.length === 0 && !extractMoreSpinner && (
            <p className="flex justify-center items-center py-4 w-full my-4 lg:col-span-3 md:col-span-2 col-span-1 dark:text-custom-blue-dark text-custom-blue-light text-xl md:text-3xl">
              No Directories found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directories;
