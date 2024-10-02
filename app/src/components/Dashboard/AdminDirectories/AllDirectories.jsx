"use client";
import React from "react";
import Container from "@/app/src/components/global/Container";
import Section from "@/app/src/components/global/Section";
import TemplateTable from "@/app/(dashboard)/dashboard/directories/TemplatesTable";
import { useSelector } from "react-redux";
import Button from "../../global/Button";
import Link from "next/link";

function AllDirectories() {
  const user = useSelector((state) => state.auth.user);

  return (
    <Section className="px-3 py-6 mt-20">
      {user?.role === "admin" && (
        <Container>
          <div className="mb-7 flex justify-between items-center -mx-3">
            <div className="px-3 w-full flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                All Directories
              </h2>
              <div className=" px-3 pb-2 pt-4">
                <Link href='/dashboard/directories/create'>
                  <Button className="bg-blue-600 text-white hover:bg-blue-800">
                    Add New Directory
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <TemplateTable />
        </Container>
      )}
    </Section>
  );
}

export default AllDirectories;
