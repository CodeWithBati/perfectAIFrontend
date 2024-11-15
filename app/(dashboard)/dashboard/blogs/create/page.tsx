import React from "react";
import CreateNewBlog from "@/app/src/components/Dashboard/Blogs/CreateNewBlog";

export const metadata = {
  title: 'Create Blog'
}

const CreateBlogPage = () => <div className="mt-20">
  <CreateNewBlog />
</div>
export default CreateBlogPage;
