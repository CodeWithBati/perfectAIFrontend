import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import Spinner from "@/app/src/ui/Spinner";
import DirectoresCard from "@/app/src/layout/Home/Directories/DirectoresCard";
import { useSelector } from "react-redux";

const FeaturedSideBar = () => {
  const { token } = useSelector((state) => state.auth);
  const [directories, setDirectories] = useState([]);
  const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const listRef = useRef(null);
  const loadingRef = useRef(false);

  const fetchSites = useCallback(async () => {
    if (page > totalPages || loadingRef.current) return;

    const config = {};
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    setExtractMoreSpinner(true);
    loadingRef.current = true;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=10&isFeatured=true`,
        config
      );
      if (response.status === 200) {
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
  }, [page, totalPages, token]);

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
    <>
      {directories.length !== 0 && (
        <div
          ref={listRef}
          onScroll={handleScroll}
          className="h-[900px] overflow-y-scroll p-2"
        >
          <h1 className=" text-xl font-semibold mb-2 dark:text-white">
            Featured AI Tools
          </h1>
          <div className="flex flex-col gap-5 pr-2">
            {directories.map((rec) => (
              <DirectoresCard key={rec.id} dir={rec} />
            ))}
            {extractMoreSpinner && (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedSideBar;
