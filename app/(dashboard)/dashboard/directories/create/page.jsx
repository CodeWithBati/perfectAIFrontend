import React from "react";
import CreateDirectoryForm from "@/app/src/components/Dashboard/AdminDirectories/CreateDirectoryForm";

export const metadata = {
  title: "New Directory",
};

const CreateDirectoryPage = () => (
  <div className=" mt-20">
    <CreateDirectoryForm title="Create New Directory" url='/directories' type='newDirectory' />
  </div>
);
export default CreateDirectoryPage;
