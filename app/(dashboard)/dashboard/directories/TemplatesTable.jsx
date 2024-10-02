"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import ButtonIcon from "@/app/src/ui/ButtonIcon";
import DataTable from "@/app/src/components/DataTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import { createColumnHelper } from "@tanstack/react-table";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { createDirectorySlugName } from "@/lib/form";
import { debounce } from "lodash";
import { toastText } from "@/constants/text-constants";

const columnHelper = createColumnHelper();

const TemplateTable = () => {
  const { token } = useSelector((state) => state.auth);
  const [directories, setDirectories] = useState([]);
  const [spinner, setSpinner] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const debouncedSearchRef = useRef(null);

  const fetchData = useCallback(
    async (page, searchQuery = "", limit = 10) => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/directories?page=${page}&limit=${limit}`;
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
          setDirectories(response.data.results);
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
    const updatedData = directories.filter((row) => row.id !== id);
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/directories/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.statusCode !== 500) {
      setDirectories(updatedData);
      toast.success(toastText.success.recordRemoved);
    } else {
      toast.error(toastText.error.recordNotDeleted);
    }
    setSpinner(false);
  };

  const columns = [
    columnHelper.accessor("name", {
      header: (info) => "Name",
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <span className="h-6 w-6 block rounded-full overflow-hidden">
              <Image
                src={row.original.icon}
                width={100}
                height={100}
                className=" h-full object-cover"
                alt="directory icon"
              />
            </span>
            <div className="ms-3">
              <span className="block text-slate-600 dark:text-slate-200 font-bold text-xs whitespace-nowrap">
                {row.original.name} {/* Fix: Access the 'name' property */}
              </span>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor("website", {
      header: (info) => "Website",
      cell: ({ row }) => {
        return (
          <>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[160px]">
              {row.original.website}
            </span>
          </>
        );
      },
    }),
    columnHelper.accessor("category", {
      header: (info) => "Category",
      cell: ({ row }) => {
        const categories = row.original.categories;
        return (
          <>
            {categories ? (
              <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[90px]">
                {categories.length > 1
                  ? `${categories.length} Categories`
                  : categories[0]}
              </span>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[90px]">
                No Category
              </span>
            )}
          </>
        );
      },
    }),
    columnHelper.accessor("isFeatured", {
      header: (info) => "Featured",
      cell: ({ row }) => {
        return (
          <>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[50px] ml-3">
              {row.original.isFeatured ? (
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
      header: (info) => "Verified",
      cell: ({ row }) => {
        return (
          <>
            <span className="text-xs text-slate-500 dark:text-slate-300 font-medium line-clamp-1 max-w-md min-w-[50px] ml-3">
              {row.original.isVerified ? (
                <FontAwesomeIcon icon={faCheck} color="green" />
              ) : (
                <FontAwesomeIcon icon={faTimes} color="red" />
              )}
            </span>
          </>
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
                  to={`/dashboard/directories/${createDirectorySlugName(
                    info.row.original.name
                  )}/edit`}
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
        tableData={directories}
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

export default TemplateTable;
