import React from "react";
import {
  ArrowLongUpIcon,
  ArrowLongDownIcon,
  MinusIcon,
} from "@heroicons/react/24/outline";

function InfoTiles({ title, data, accent }) {
  const isPositiveChange = (data.percentageChange ?? 0) > 0;
  const isNoChange = data.percentageChange === 0 || !data.percentageChange;
  const textColorClass = isPositiveChange
    ? "text-emerald-500"
    : isNoChange
    ? "text-gray-500"
    : "text-red-500";

  return (
    <div className="bg-white dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 relative p-5 h-full">
      <div className="flex flex-col isolate relative">
        <p className="flex items-baseline gap-x-2 -ms-0.5 -mt-1">
          <span className="text-2xl font-bold tracking-tight text-blue-500">
            {data.totalUsersThisMonth}
          </span>
          <span
            className={`inline-flex items-center font-medium text-xs ${textColorClass}`}
          >
            {isPositiveChange ? (
              <ArrowLongUpIcon className="h-3 me-0.5" />
            ) : isNoChange ? (
              <MinusIcon className="h-3 me-0.5" />
            ) : (
              <ArrowLongDownIcon className="h-3 me-0.5" />
            )}
            {Math.floor(data.percentageChange) ?? 0} %
          </span>
        </p>
        <h6 className="text-md font-bold text-slate-600 dark:text-white mt-1">
          {title}
        </h6>
        <div className="flex mt-2 -mx-3">
          <div className="flex flex-col w-1/2 px-3">
            <span className="text-xs text-slate-500 dark:text-slate-300 mb-1">
              Last Month
            </span>
            <span className="text-sm font-bold text-slate-600 dark:text-white">
              {data.totalUsersLastMonth}
            </span>
          </div>
          <div className="flex flex-col w-1/2 px-3">
            <span className="text-xs text-slate-500 dark:text-slate-300 mb-1">
              This Year
            </span>
            <span className="text-sm font-bold text-slate-600 dark:text-white">
              {data.totalUsersThisYear}
            </span>
          </div>
          <div className="flex flex-col w-1/2 px-3">
            <span className="text-xs text-slate-500 dark:text-slate-300 mb-1">
              Total Users
            </span>
            <span className="text-sm font-bold text-slate-600 dark:text-white">
              {data.totalUsers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoTiles;
