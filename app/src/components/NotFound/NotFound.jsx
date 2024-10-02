"use client";
import React from "react";
import Link from "next/link";
import Section from "@/app/src/components/global/Section";
import Container from "@/app/src/components/global/Container";
import Robot404 from "@/app/src/illustrations/Robot404";
import { useTheme } from "@/app/src/layout/provider";
import DarkRobot404 from "@/app/src/illustrations/DarkRobot404";

function NotFoundPage() {
  const theme = useTheme();
  return (
    <Section className="flex justify-center items-center h-screen">
      <Container>
        <div className="flex flex-wrap items-center justify-center mt-auto">
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-6">
            {theme.mode === "light" ? <Robot404 /> : <DarkRobot404 />}
          </div>
          <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 px-6 lg:text-start text-center">
            <div className="text-7xl font-bold mb-6 text-blue-600 hidden lg:block">
              Oops!
            </div>
            <h3 className="lg:text-3xl 2xl:text-4xl leading-snug font-bold mb-4 text-slate-700 dark:text-white">
              The page you are looking for does not exist.
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-200 mb-5">
              It is possible that the page you are looking for has been removed,
              renamed, or is temporarily unavailable.
            </p>
            <Link
              href={"/"}
              className="inline-flex font-medium text-sm bg-blue-600 text-white hover:bg-blue-800 transition-all px-5 py-2 rounded-full"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default NotFoundPage;
