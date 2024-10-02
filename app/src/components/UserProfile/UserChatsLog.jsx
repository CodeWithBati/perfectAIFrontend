import React, { useCallback, useEffect, useRef, useState } from "react";
import Spinner from "../../ui/Spinner";
import ChatLog from "./ChatLog";
import { useSelector } from "react-redux";
import axios from "axios";

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

  return (
    <div className="w-full p-6">
      {chatHistoryLog.length && !extractMoreSpinner === 0 ? (
        <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-5">
          No Chat History
        </h2>
      ) : (
        <>
          <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-5">
            Chat Histories ({chatHistoryLog.length})
          </h2>
          <div
            ref={listRef}
            onScroll={handleScroll}
            className="max-h-[500px] w-full overflow-y-scroll"
          >
            <div className=" flex flex-col gap-3">
              {chatHistoryLog.map((historyLog, index) => (
                <ChatLog key={index} historyLog={historyLog} />
              ))}
            </div>
            {extractMoreSpinner && (
              <div className="flex items-center justify-center my-5">
                <Spinner />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserChatsLog;
