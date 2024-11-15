"use client";
import React from "react";
import Container from "@/app/src/components/global/Container";
import Section from "@/app/src/components/global/Section";
import { useSelector } from "react-redux";
import Button from "../../global/Button";
import Link from "next/link";
import BlogTable from "./BlogTable";

function MainBlogView() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Section className="px-3 py-6 mt-20">
      {user?.role === "admin" && (
        <Container>
          <div className="mb-7 flex justify-between items-center -mx-3">
            <div className="px-3 w-full flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                Blogs
              </h2>
              <div className=" px-3 pb-2 pt-4">
                <Link href='/dashboard/blogs/create'>
                  <Button className="bg-blue-600 text-white hover:bg-blue-800">
                    Create New Blog
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <BlogTable />
        </Container>
      )}
    </Section>
  );
}

export default MainBlogView;
