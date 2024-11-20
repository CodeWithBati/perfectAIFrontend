import React, { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../ui/Spinner";
import ChatLog from "./ChatLog";
import { useSelector } from "react-redux";
import axios from "axios";
import ChatShareCard from "../ChatShareCard";

const UserChatsLog = () => {

  const listRef = useRef(null);
  const { token } = useSelector((state) => state.auth);
  const [chatHistoryLog, setChatHistoryLog] = useState([]);
  const [extractMoreSpinner, setExtractMoreSpinner] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const loadingRef = useRef(false);

  const fetchSites = useCallback(async () => {
    if (page > totalPages || loadingRef.current) return;

    setExtractMoreSpinner(true);
    loadingRef.current = true;
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/chat?page=${page}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setChatHistoryLog((prevSites) =>
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


  useEffect(() => {
    fetchSites();
  }, [page, fetchSites]);

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
    <div className="w-full">
      {chatHistoryLog?.length && !extractMoreSpinner === 0 ? (
        <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-5">
          No Chat History
        </h2>
      ) : (
        <div className="flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chatHistoryLog?.map((chat, i) => (
              <ChatShareCard chat={chat} key={i} />
            ))}

          </div>
          {page < totalPages && chatHistoryLog.length > 0 && (
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
        </div>
      )}
    </div>
  );
};

export default UserChatsLog;
