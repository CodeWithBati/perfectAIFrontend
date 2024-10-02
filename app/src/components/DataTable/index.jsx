"use client";
import React, { useEffect, useState } from "react";
import Input from "../form/Input";
import Select from "../global/Select";
import Pagination from "./Pagination";
import Spinner from "../../ui/Spinner";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import PageStatus from "./PageStatus";
import Card from "../../ui/Card";

function DataTable({
  columns,
  tableData,
  onPageChange,
  pagination,
  currentPage,
  handleSearch,
  search,
  spinner,
  setLimit,
  limit,
  noDataMessage = "No Record Found",
}) {
  const [data, setData] = useState(() => [...tableData]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    setData([...tableData]); // Update the data state when tableData prop changes
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex: pagination.page - 1,
        pageSize: pagination.limit,
      },
      globalFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    manualPagination: true,
    pageCount: pagination.totalPages,
    onPageChange: (newPageIndex) => onPageChange(newPageIndex + 1),
  });

  useEffect(() => {
    console.log(table);
  }, [table]);

  const pageSizeSelect = [
    { name: 10 },
    { name: 20 },
    { name: 30 },
    { name: 40 },
  ];
  const [selected, setSelected] = useState(pageSizeSelect[0]);

  useEffect(() => {
    const currentTablePageIndex = table.getState().pagination.pageIndex;
    if (currentPage - 1 !== currentTablePageIndex) {
      table.setPageIndex(currentPage - 1);
    }
  }, [currentPage, table]);

  return (
    <>
      <Card>
        <div className="px-5 py-5 flex gap-3 items-center justify-between">
          <div className="w-full xs:w-64">
            <Input
              value={search}
              onChange={(e) => handleSearch(e)}
              placeholder="Search all columns..."
            />
          </div>
          <div className="flex items-center gap-x-3">
            <div className="text-slate-500 dark:text-slate-300 text-sm hidden xs:block">
              Show
            </div>
            <div className="w-16 xs:w-20">
              <Select
                selected={pageSizeSelect.find((rec) => rec.name === limit)}
                options={pageSizeSelect}
                onChange={(value) => {
                  setLimit(value.name);
                  table.setPageSize(Number(value.name));
                }}
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-800 scrollbar-thumb-slate-600">
          {spinner ? (
            <div className=" w-full flex justify-center items-center py-5">
              <Spinner />
            </div>
          ) : (
            <table className="table-auto w-full text-sm border-t border-b border-slate-200 dark:border-slate-800 border-collapse">
              <thead className="text-slate-600 dark:text-slate-200">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="text-start ps-5 pe-5 py-2 last:ps-2 last:sticky last:end-0 last:bg-white last:dark:bg-slate-950"
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              {data.length === 0 ? (
                <tbody>
                  <tr className=" text-center">
                    <td
                      colSpan={6}
                      className="text-center text-lg font-semibold py-3 dark:text-white"
                    >
                      {noDataMessage}
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.original.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          className="ps-5 pe-5 py-3 border-t border-slate-200 dark:border-slate-800 last:ps-2 last:sticky last:end-0 last:bg-white last:dark:bg-slate-950"
                          key={cell.column.columnDef.cell}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          )}
        </div>
        <div
          className={`px-5 py-5 flex sm:items-center justify-between flex-col sm:flex-row gap-4`}
        >
          <PageStatus table={table} />
          <Pagination table={table} onPageChange={onPageChange} />
        </div>
      </Card>
    </>
  );
}

export default DataTable;
