import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import DirectoresCard from "../../layout/Home/Directories/DirectoresCard";
import Spinner from "../../ui/Spinner";

const AlternativeDirectories = ({ category, currentDirectory }) => {
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
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=6&categories=${category}`
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
    <div
      ref={listRef}
      onScroll={handleScroll}
      className="h-[900px] overflow-y-scroll p-2"
    >
      <h3 className="text-2xl text-center sm:text-[2.5rem] leading-tight font-bold text-slate-700 dark:text-white mb-8">
        {currentDirectory.name} Alternatives
      </h3>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {directories.map((dir, index) => (
          <DirectoresCard dir={dir} key={index} />
        ))}
      </div>
      {extractMoreSpinner && (
        <div className="flex items-center justify-center my-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AlternativeDirectories;
