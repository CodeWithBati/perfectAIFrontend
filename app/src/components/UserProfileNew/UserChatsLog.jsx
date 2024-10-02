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

  const chatData = [
    {
      id: 1,
      description: "I own a small B2B consulting firm specializing in digital transformation. I need an Al tool to help with lead generation by identifying potential clients in my target industry and automating outreach efforts. My goal is to increase the number of qualified leads and grow my client base.",
      link: "https://www.google.com",
    },
    {
      id: 2,
      description: "I want to a way to create engaging and original content for your website, blog, or social media",
      link: "https://www.google.com",
    },
    {
      id: 3,
      description: "I own a small B2B consulting firm specializing in digital transformation. I need an Al tool to help with lead generation by identifying potential clients in my target industry and automating outreach efforts. My goal is to increase the number of qualified leads and grow my client base.",
      link: "https://www.google.com",
    },
    {
      id: 4,
      description: "I own a small B2B consulting firm specializing in digital transformation. I need an Al tool to help with lead generation by identifying potential clients in my target industry and automating outreach efforts. My goal is to increase the number of qualified leads and grow my client base.",
      link: "https://www.google.com",
    },
    {
      id: 5,
      description: "I own a small B2B consulting firm specializing in digital transformation. I need an Al tool to help with lead generation by identifying potential clients in my target industry and automating outreach efforts. My goal is to increase the number of qualified leads and grow my client base.",
      link: "https://www.google.com",
    }
  ]

  return (
    <div className="w-full">
      {chatHistoryLog?.length && !extractMoreSpinner === 0 ? (
        <h2 className="text-lg font-bold text-slate-700 dark:text-white mb-5">
          No Chat History
        </h2>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chatData.map((chat, i) => (
            <ChatShareCard chat={chat} key={i} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserChatsLog;
