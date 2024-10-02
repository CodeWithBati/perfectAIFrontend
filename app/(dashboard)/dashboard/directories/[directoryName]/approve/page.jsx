"use client";
import ApproveDirectoryForm from "@/app/src/components/Dashboard/AdminDirectories/ApproveDirectory";
import React from "react";
import { capitalizeAllWords } from "@/app/src/utilities/helperfunctions";
import { usePathname } from "next/navigation";
import Head from "next/head";

const EditDirectoryPage = () => {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const directoryName = parts[parts.length - 2];

  const title = directoryName || "Directory";
  const fullTitle = `Approve ${capitalizeAllWords(title)} - MyPerfectAI`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
      </Head>
      <div className=" mt-20">
        <ApproveDirectoryForm title="Approve Directory" />
      </div>
    </>
  );
};

export default EditDirectoryPage;
