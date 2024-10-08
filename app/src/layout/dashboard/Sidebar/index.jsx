import React from "react";
import classNames from "classnames";
import Link from "next/link";
import Menu from "./Menu";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { useTheme } from "../../provider";
import Image from "next/image";

function Sidebar({ mobile, visibility, setVisibility, className }) {
  const theme = useTheme();
  const compClass = classNames({
    "fixed 2xl:translate-x-0 start-0 top-0 border-e border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-[1020] w-64 min-h-screen flex-shrink-0": true,
    "-translate-x-full": !visibility && theme.direction === "ltr",
    "translate-x-full": !visibility && theme.direction === "rtl",
    "transition-transform": mobile,
    [`${className}`]: className,
    dark: theme.mode === "dark",
  });
  return (
    <>
      <div className={compClass}>
        <div className="flex px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <Link className="flex-shrink-0 text-lg font-bold" href="/">
            <div className="block">
              {theme.mode === "dark" ? (
                <Image
                  alt="website Logo"
                  src={"/images/DarkLogo.png"}
                  width={200}
                  height={200}
                  className="!h-11"
                />
              ) : (
                <Image
                  alt="website Logo"
                  src={"/images/defaulticon4.png"}
                  width={200}
                  height={200}
                  className="!h-11"
                />
              )}
            </div>
          </Link>
        </div>
        <SimpleBar>
          <Menu setVisibility={setVisibility} />
        </SimpleBar>
      </div>
      {visibility && (
        <div
          onClick={() => {
            setVisibility(false);
          }}
          className="fixed inset-0 bg-slate-950 bg-opacity-50 z-[1019]"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
