import React, { useEffect } from "react";
import Button from "../global/Button";
import moment from "moment";
import classNames from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useTheme, useThemeUpdate } from "../../layout/provider";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import Link from 'next/link'


const NewUsers = ({ users }) => {
  const theme = useTheme();
  const themeUpdate = useThemeUpdate();
  
  return (
    <div className=' bg-white rounded-md border border-slate-200 dark:border-slate-800 flex flex-col isolate relative dark:bg-slate-950'>
      <div className="p-5 flex justify-between items-center gap-x-4">
        <h6 className={ `text-md font-bold text-slate-700 dark:text-white ${theme.mode === 'dark' ? 'text-white': ''}`}>
          Users
        </h6>
        <Link href={'/dashboard/users'} className="text-slate-900 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-600 transition-all font-bold text-sm">View All</Link>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-track-slate-200 scrollbar-thumb-slate-600 lg:scrollbar-none">
        <table className="table-auto w-full text-sm border-t border-slate-200 dark:border-slate-800 border-collapse">
          <thead className="text-slate-600 dark:text-white">
            <tr>
              <th className="text-start px-5 py-2">Info</th>
              <th className="text-start px-5 py-2">Joined At</th>
              <th className="text-start px-5 py-2">Role</th>
              <th className="text-start px-5 py-2">Verified</th>
              <th className="text-start px-5 py-2">Plan</th>
              <th className="sticky end-0 bg-white dark:bg-slate-950"></th>
            </tr>
          </thead>
          <tbody>
            {users.length ? (
              users.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                      <div className="flex items-center">
                        <span className="flex-shrink-0 h-10 w-10">
                          {item.profile ? (
                            <Image
                              className="rounded-full h-full w-full object-cover"
                              src={item.profile}
                              width={100}
                              height={100}
                              alt={item.name}
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
                            {item.firstName} {item.lastName}
                          </span>
                          <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium">
                            {item.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                      <span className="block text-slate-600 dark:text-white text-xs font-bold whitespace-nowrap">
                        {moment(item.createdAt).format("ll")}
                      </span>
                      <span className="block text-slate-500 dark:text-slate-300 text-[11px] font-medium whitespace-nowrap">
                        {moment(item.createdAt).format("LT")}
                      </span>
                    </td>
                    <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                      <span
                        className={`inline-flex px-2 rounded-full text-[11px] font-bold capitalize ${
                          item.status == "active"
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-500"
                            : item.status == "suspended"
                            ? "bg-rose-100 dark:bg-rose-950 text-rose-500"
                            : "text-slate-500 dark:text-slate-300 bg-slate-100 dark:bg-slate-900"
                        }`}
                      >
                        {item.role}
                      </span>
                    </td>
                    <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                      <span
                        className={`block w-max text-xs font-bold ${
                          item.plan === "Strater"
                            ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                            : "text-slate-600 dark:text-white"
                        }`}
                      >
                        {item.isVerified ? (
                          <FontAwesomeIcon icon={faCheck} color="green" />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} color="red" />
                        )}
                      </span>
                    </td>
                    <td className="px-5 py-3 border-t border-slate-200 dark:border-slate-800">
                      <span
                        className={`block w-max text-xs font-bold ${
                          item.plan === "Strater"
                            ? "bg-gradient-to-r from-blue-600 to-pink-500 text-transparent bg-clip-text"
                            : "text-slate-600 dark:text-white"
                        }`}
                      >
                        {item.plan}
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="px-5 py-8 border-t text-center" colSpan={4}>
                  <span className="block text-slate-500 dark:text-slate-300 mb-3">
                    There is no document to show
                  </span>
                  <Button
                    as="Link"
                    to="/templates"
                    className="bg-blue-600 text-white hover:bg-blue-800"
                  >
                    Create New
                  </Button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewUsers;
