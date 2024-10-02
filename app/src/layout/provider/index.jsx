"use client"
import React, { useState, createContext, useContext, useLayoutEffect, useEffect } from "react";
import classNames from "classnames";

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

const ThemeProvider = ({ children }) => {
  const defaultTheme = {
    mode: "light",
    direction: "ltr",
  };
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      return storedTheme ? JSON.parse(storedTheme) : defaultTheme;
    } else {
      return defaultTheme;
    }
  });

  const themeUpdate = {
    mode: function (value) {
      setTheme((prevTheme) => {
        const updatedTheme = { ...prevTheme, mode: value };
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", JSON.stringify(updatedTheme));
        }
        return updatedTheme;
      });
    },
    direction: function (value) {
      setTheme((prevTheme) => {
        const updatedTheme = { ...prevTheme, direction: value };
        if (typeof window !== "undefined") {
          localStorage.setItem("theme", JSON.stringify(updatedTheme));
        }
        return updatedTheme;
      });
    },
    reset: function () {
      if (typeof window !== "undefined") {
        localStorage.removeItem("theme");
      }
      setTheme(defaultTheme);
    },
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        setTheme(JSON.parse(storedTheme));
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
      };
    }
  }, []);

  const bodyClass = classNames({
    "min-w-[320px] bg-slate-100 dark:bg-slate-900": true,
  });
  const htmlClass = classNames({
    dark: theme.mode === "dark",
  });

  useLayoutEffect(() => {
    document.body.setAttribute("dir", theme.direction);
    document.documentElement.className = htmlClass;
    document.body.className = bodyClass;
  }, [theme, bodyClass, htmlClass]);

  return (
    <ThemeContext.Provider value={theme}>
      <ThemeUpdateContext.Provider value={themeUpdate}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
