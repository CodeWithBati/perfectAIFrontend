"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ButtonIcon from "@/app/src/ui/ButtonIcon";
import DataTable from "@/app/src/components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { createColumnHelper } from "@tanstack/react-table";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from "next/image";
import moment from "moment";
import { debounce } from "lodash";

const columnHelper = createColumnHelper();

const UsersLists = () => {
  const { token } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const debouncedSearchRef = useRef(null);

  const fetchData = useCallback(
    async (page, searchQuery = "", limit=10) => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/users?page=${page}&limit=${limit}`;
      url = searchQuery.length === 0 ? url : url + `&search=${searchQuery}`;

      setSpinner(true);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSpinner(false);
        if (response.data.results) {
          setUsers(response.data.results);
          setPagination(response.data.pagination);
        } else {
          console.log(response);
        }
      } catch (error) {
        setSpinner(false);
        console.log(error);
      }
    },
    [token]
  );

  useEffect(() => {
    fetchData(currentPage, "", limit);
  }, [currentPage, fetchData, limit]);

  useEffect(() => {
    debouncedSearchRef.current = debounce((searchValue) => {
      fetchData(1, searchValue, limit);
    }, 500);

    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, [fetchData, limit]); 

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  const columns = [
    columnHelper.accessor("name", {
      header: (info) => "Name",
      cell: ({ row }) => {
        const { firstName, lastName, email, profile } = row.original;

        return (
          <div className="flex items-center">
            <span className="flex-shrink-0 h-10 w-10">
              {profile ? (
                <Image
                  className="rounded-full h-full w-full object-cover"
                  src={profile}
                  width={100}
                  height={100}
                  alt={name}
                />
              ) : (
                <Image
                  src="/images/avatar.svg"
                  alt="No Profile Image Avatar"
                  width={100}
                  height={100}
                />
              )}
            </span>
            <div className="ms-3">
              <span className="block text-slate-600 dark:text-white font-bold text-xs">
                {firstName} {lastName}
              </span>
              <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium">
                {email}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("createdAt", {
      header: (info) => "Joined At",
      cell: ({ row }) => {
        const { createdAt: joined } = row.original;
        return (
          <>
            <span className="block text-slate-600 dark:text-white text-xs font-bold whitespace-nowrap">
              {moment(joined).format("ll")}
            </span>
            <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap">
              {moment(joined).format("LT")}
            </span>
          </>
        );
      },
    }),
    columnHelper.accessor("role", {
      header: (info) => "Role",
      cell: ({ row }) => {
        const { role, status } = row.original;
        return (
          <>
            <span
              className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                status == "active"
                  ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-500"
                  : status == "suspended"
                  ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                  : "text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-900"
              }`}
            >
              {role}
            </span>
          </>
        );
      },
    }),
    columnHelper.accessor("isVerified", {
      header: (info) => "Verified",
      cell: ({ row }) => {
        const { plan, isVerified } = row.original;
        return (
          <>
            <span
              className={`block w-max text-xs font-bold ${
                plan === "Strater"
                  ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                  : "text-slate-600 dark:text-white"
              }`}
            >
              {isVerified ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : (
                <FontAwesomeIcon icon={faTimes} color="red" />
              )}
            </span>
          </>
        );
      },
    }),
    columnHelper.accessor("isVerified", {
      header: (info) => "Plan",
      cell: ({ row }) => {
        const { plan } = row.original;
        return (
          <>
            <span
              className={`block w-max text-xs font-bold ${
                plan === "Strater"
                  ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                  : "text-slate-600 dark:text-white"
              }`}
            >
              {plan}
            </span>
          </>
        );
      },
    }),
  ];

  return (
    <>
      <>
        <DataTable
          columns={columns}
          tableData={users}
          onPageChange={setCurrentPage}
          pagination={pagination}
          currentPage={currentPage}
          handleSearch={handleSearch}
          search={search}
          spinner={spinner}
          setLimit={setLimit}
          limit={limit}
        />
      </>
    </>
  );
};

export default UsersLists;
