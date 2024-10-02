import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import classNames from "classnames";
// import { NavLink } from "react-router-dom";
import Link from "next/link";
import slideUp from "@/app/src/utilities/slideUp";
import slideDown from "@/app/src/utilities/slideDown";
import getParents from "@/app/src/utilities/getParents";
import { useTheme } from "../../provider";
import { Dashboard, Layers, Person, Ticket } from "../../../components/icons";


const menuData = [
  {
    icon: <Dashboard />,
    text: "Dashboard",
    routeComparison: '/dashboard',
    link: "/dashboard",
  },
  {
    icon: <Person />,
    text: "Users",
    routeComparison: '/dashboard/users',
    link: "/dashboard/users",
  },
  {
    icon: <Layers />,
    text: "Directory Manager",
    link: "/dashboard/directories",
  },
  {
    icon: <Ticket />,
    text: "Directory Requests",
    link: "/dashboard/requests",
  },
];
function Menu({ setVisibility }) {
  // const theme = useTheme();

  let currentLink = function (selector) {
    let elm = document.querySelectorAll(selector);
    elm.forEach(function (item) {
      var activeRouterLink = item.classList.contains("is-active");
      if (activeRouterLink) {
        let parents = getParents(item, `.menu-base`, "menu-item");
        parents.forEach((parentElemets) => {
          parentElemets.classList.add("is-active", "current");
          let subItem = parentElemets.querySelector(`.sub-menu`);
          subItem !== null && (subItem.style.display = "block");
        });
      } else {
        item.parentElement.classList.remove("is-active", "current");
      }
    });
  };

  // dropdown toggle
  let dropdownToggle = function (elm) {
    let parent = elm.parentElement;
    let nextelm = elm.nextElementSibling;
    let speed =
      nextelm.children.length > 5 ? 400 + nextelm.children.length * 10 : 400;
    if (!parent.classList.contains("is-active")) {
      parent.classList.add("is-active");
      slideDown(nextelm, speed);
    } else {
      parent.classList.remove("is-active");
      slideUp(nextelm, speed);
    }
  };

  // dropdown close siblings
  let closeSiblings = function (elm) {
    let parent = elm.parentElement;
    let siblings = parent.parentElement.children;
    Array.from(siblings).forEach((item) => {
      if (item !== parent) {
        item.classList.remove("is-active");
        if (item.classList.contains("has-sub")) {
          let subitem = item.querySelectorAll(`.sub-menu`);
          subitem.forEach((child) => {
            child.parentElement.classList.remove("is-active");
            slideUp(child, 400);
          });
        }
      }
    });
  };

  let menuToggle = function (e) {
    e.preventDefault();
    let item = e.target.closest(`.has-toggle`);
    dropdownToggle(item);
    closeSiblings(item);
  };

  const handleSidebarClosed = (e) => {
    setVisibility(false);
    const links = document.querySelectorAll(".menu-link");
    links.forEach((link) => {
      link.parentElement.classList.remove("is-active");
    });
    // debugger

    e.target.closest('li').classList.add("is-active");
  };

  useEffect(() => {
    currentLink(`.menu-link`);
    // eslint-disable-next-line
  }, [null]);

  return (
    <>
      <ul className="py-3 menu-base">
        {menuData.map((item, index) => (
          <React.Fragment key={index}>
            {item.heading && (
              <h6 className="px-6 pt-5 pb-2 text-xs uppercase text-slate-500 dark:text-slate-200">
                {item.heading}
              </h6>
            )}
            {!item.heading && (
              <MenuItem
                icon={item.icon}
                text={item.text}
                link={item.link}
                sub={item.sub}
                onClick={menuToggle}
                handleSidebarClosed={handleSidebarClosed}
              />
            )}
          </React.Fragment>
        ))}
      </ul>
    </>
  );
}

function MenuItem({
  className,
  icon,
  text,
  link,
  sub,
  dropdown,
  onClick,
  handleSidebarClosed,
  ...props
}) {
  const router = useRouter();
  const compClass = classNames({
    ["relative py-0.5 menu-item group"]: true,
    ["has-sub"]: sub,
    ["px-3"]: !dropdown,
    [`${className}`]: className,
  });
  const linkClass = classNames({
    "rounded-md flex items-center gap-x-3 transition-all text-slate-500 dark:text-slate-300 group-[.is-active>]:text-blue-600 hover:text-blue-600 menu-link": true,
    [`px-3 py-2 hover:bg-blue-100 hover:dark:bg-blue-950 group-[.is-active>]:bg-blue-100 group-[.is-active>]:dark:bg-blue-950 group-[.is-active>]:dark:bg-opacity-80`]:
      !dropdown,
    [`px-3 py-1`]: dropdown,
    [`has-toggle`]: sub,
    [`${className}`]: className,
  });
  const dropdownClass = classNames({
    ["ps-9 hidden sub-menu"]: true,
    [`${className}`]: className,
  });

  return (
    <li className={`${compClass} `}>
      {sub ? (
        <>
          <Link
            href={link}
            // name="text"
            className={linkClass}
            onClick={onClick}
          >
            {icon && (
              <div className="h-6 w-6 flex-shrink-0 grayscale-[50%] dark:grayscale-[25%] group-[.is-active]:grayscale-0">
                {icon}
              </div>
            )}
            <span
              className={`pe-2 text-sm font-medium ${
                dropdown ? "text-xs" : "text-sm"
              }`}
            >
              {text}
            </span>
            <span className="ms-auto me-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="h-2 group-[.is-active]:fill-blue-600 group-[.is-active]:rotate-180 fill-slate-500 dark:fill-slate-300"
              >
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
              </svg>
            </span>
          </Link>
          <div className={dropdownClass}>
            <MenuSub sub={sub} handleSidebarClosed={handleSidebarClosed} />
          </div>
        </>
      ) : (
        <Link
          href={link}
          className={`${linkClass} ${
            window.location.pathname === link ? "is-active" : ""
          }`}
          onClick={handleSidebarClosed}
        >
          {icon && (
            <div className="h-6 w-6 flex-shrink-0 grayscale-[50%] dark:grayscale-[25%] group-[.is-active]:grayscale-0">
              {icon}
            </div>
          )}
          <span
            className={`pe-2 text-sm font-medium ${
              dropdown ? "text-xs" : "text-sm"
            }`}
          >
            {text}
          </span>
        </Link>
      )}
    </li>
  );
}

function MenuSub({ className, sub, handleSidebarClosed }) {
  const compClass = classNames({
    ["relative pt-3 pb-1"]: true,
    [`${className}`]: className,
  });
  return (
    <ul className={compClass}>
      {sub.map((item, index) => (
        <MenuItem
          text={item.text}
          sub={item.sub}
          link={item.link}
          key={index}
          dropdown={true}
          handleSidebarClosed={handleSidebarClosed}
        />
      ))}
    </ul>
  );
}

export default Menu;
