'use client'
import Sidebar from "../src/layout/dashboard/Sidebar";
import Navigation from "./dashboard/navigation/Navigation";
import React, { useState } from "react";

const SidebarNavigation = () => {
  const [mobile, setMobile] = useState(false);
  const [sidebarVisibility, setSidebarVisibility] = useState(false);
  return (
    <>
      <Sidebar
        mobile={mobile}
        visibility={sidebarVisibility}
        setVisibility={setSidebarVisibility}
      />
      <Navigation
        sidebarVisibility={sidebarVisibility}
        setSidebarVisibility={setSidebarVisibility}
      />
    </>
  );
};

export default SidebarNavigation;
