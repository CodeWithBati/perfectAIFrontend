"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ButtonIcon from "@/app/src/ui/ButtonIcon";
import DataTable from "@/app/src/components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { createColumnHelper } from "@tanstack/react-table";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { debounce } from "lodash";
import { toastText } from "@/constants/text-constants";
import moment from "moment/moment";

const columnHelper = createColumnHelper();

const BlogTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [blogs, setBlogs] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const debouncedSearchRef = useRef(null);

  const fetchData = useCallback(
    async (page, searchQuery = "", limit = 10) => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/blogs?page=${page}&limit=${limit}`;
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
          setBlogs(response.data.results);
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
    debouncedSearchRef.current = debounce((searchValue) => {
      fetchData(1, searchValue, limit);
    }, 500);

    return () => {
      debouncedSearchRef.current.cancel();
    };
  }, [fetchData, limit]);

  useEffect(() => {
    fetchData(currentPage, "", limit);
  }, [currentPage, fetchData, limit]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    debouncedSearchRef.current(e.target.value);
  };

  const handleDelete = async (id) => {
    setSpinner(true);
    const updatedData = blogs.filter((row) => row.id !== id);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.statusCode !== 500) {
      setBlogs(updatedData);
      toast.success(toastText.success.blogRemoved);
    } else {
      toast.error(toastText.error.blogRemoveError);
    }
    setSpinner(false);
  };

  const columns = [
    columnHelper.accessor("title", {
      header: (info) => "Title",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="h-6 w-6 block rounded-full overflow-hidden">
              <Image
                src={row.original.cover}
                width={100}
                height={100}
                className=" h-full object-cover"
                alt="directory icon"
              />
            </span>
            <div className="ms-3">
              <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                {row.original.title} {/* Fix: Access the 'name' property */}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("content", {
      header: (info) => "Content",
      cell: ({ row }) => {
        return (
          <>
            <span
              className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[160px]"
              dangerouslySetInnerHTML={{
                __html:
                  row.original.content.length > 1000
                    ? row.original.content.substring(0, 1000) + "..."
                    : row.original.content,
              }}
            ></span>
          </>
        );
      },
    }),

    columnHelper.accessor("createdBy", {
      header: (info) => "Created By",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="h-6 w-6 block rounded-full overflow-hidden">
              <Image
                src={row.original.user.profile}
                width={100}
                height={100}
                className=" h-full object-cover"
                alt="directory icon"
              />
            </span>
            <div className="ms-3">
              <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                {row.original.user.firstName + " " + row.original.user.lastName}{" "}
                {/* Fix: Access the 'name' property */}
              </span>
            </div>
          </div>
        );
      },
    }),

    columnHelper.accessor("updatedAt", {
      header: (info) => "Last Updated",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <div className="ms-3">
              <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                {moment(row.original.updatedAt).format("ll [at] LT")}
              </span>
            </div>
          </div>
        );
      },
    }),

    columnHelper.display({
      id: "tableAction",
      header: (info) => "",
      cell: (info) => {
        return (
          <>
            <ul className="flex justify-end gap-2">
              <li>
                <ButtonIcon
                  circle
                  as="Link"
                  to={`/dashboard/blogs/${info.row.original.id}/edit`}
                  size="sm"
                  className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-blue-600 hover:text-white hover:dark:bg-blue-600 hover:dark:text-white"
                >
                  <FontAwesomeIcon icon={faPencil} />
                </ButtonIcon>
              </li>
              <li>
                <ButtonIcon
                  circle
                  size="sm"
                  className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-200 hover:bg-rose-600 hover:text-white hover:dark:bg-rose-600 hover:dark:text-white"
                  onClick={() => handleDelete(info.row.original.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </ButtonIcon>
              </li>
            </ul>
          </>
        );
      },
    }),
  ];

  return (
    <>
      <DataTable
        columns={columns}
        tableData={blogs}
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
  );
};

export default BlogTable;
