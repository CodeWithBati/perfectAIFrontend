"use client";

import Container from "../../global/Container";
import Section from "../../global/Section";
import { useSelector } from "react-redux";
import Button from "../../global/Button";
import Link from "next/link";
import DirectoryRequestsTable from "./DirectoryRequestsTable";

const AllDirectoriesRequest = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Section className="px-3 py-6 mt-20">
      {user?.role === "admin" && (
        <Container>
          <div className="mb-7 flex justify-between items-center -mx-3">
            <div className="px-3 w-full flex flex-row items-center justify-between">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white">
                All Directory Requests
              </h2>
            </div>
          </div>
					<DirectoryRequestsTable />
        </Container>
      )}
    </Section>
  );
};

export default AllDirectoriesRequest;
