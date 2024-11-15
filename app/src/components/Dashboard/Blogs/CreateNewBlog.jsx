"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import Input from "@/app/src/components/form/Input";
import Button from "@/app/src/components/global/Button";
import Label from "@/app/src/components/form/Label";
import Card from "@/app/src/ui/Card";
import Section from "@/app/src/components/global/Section";
import Container from "@/app/src/components/global/Container";
import Spinner from "@/app/src/ui/Spinner";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { reactQuillFormatSettings, reactQuillModuleSettings } from "@/lib/form";

// Dynamically import ReactQuill to handle SSR
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CreateNewBlog() {
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    cover: "",
  });

  const [spinner, setSpinner] = useState(false);
  const [coverSpinner, setCoverSpinner] = useState(false);
  const [coverImage, setCoverImage] = useState(null);

  const removeCoverImage = () => {
    setCoverImage(null);
    handleInputChange("cover", "");
  };

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const handleCoverUpload = async (selectedImage) => {
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      setCoverSpinner(true);
      const url = `${process.env.NEXT_PUBLIC_API_URL}/blogs/cover`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        handleInputChange("cover", response.data.cover);
        setCoverImage(response.data.cover);
      } else {
        toast.error("Issue while uploading the cover image");
      }
    } catch (error) {
      console.error("Error uploading the cover image:", error);
    } finally {
      setCoverSpinner(false);
    }
  };

  const handleSubmit = async () => {
    if (
      formData.title === "" ||
      formData.content === "" ||
      formData.cover === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      setSpinner(true);
      const cleanedFormData = {
        title: formData.title,
        content: formData.content,
        cover: formData.cover,
      };

      // You can add validation here as needed

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/blogs`,
        cleanedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success("Blog created successfully");
        setFormData({ title: "", content: "", cover: "" });
        setCoverImage(null);
        router.push("/dashboard/blogs");
      } else {
        toast.error("Error creating the blog");
      }
    } catch (error) {
      console.log("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Section className="px-3 py-6">
      <Container>
        {spinner ? (
          <div className="w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Card>
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white ">
                Create New Blog
              </h2>
            </div>
            <div className="px-6 pt-5 pb-6">
              <div className="flex flex-wrap -mx-3 -my-2">
                {/* Title Field */}
                <div className="w-full px-3">
                  <div className="py-2">
                    <Label htmlFor="blogTitle" className="mb-2">
                      Blog Title
                    </Label>
                    <Input
                      placeholder="Enter blog title"
                      id="blogTitle"
                      onChange={(e) =>
                        handleInputChange("title", e.target.value)
                      }
                      value={formData.title}
                    />
                  </div>
                </div>

                {/* Content Field */}
                <div className="w-full px-3">
                  <div className="py-2 min-h-60">
                    <Label htmlFor="content" className="mb-2">
                      Content
                    </Label>
                    <ReactQuill
                      theme="snow"
                      modules={reactQuillModuleSettings}
                      formats={reactQuillFormatSettings}
                      placeholder="Write your blog content here..."
                      onChange={(content) =>
                        handleInputChange("content", content)
                      }
                      value={formData.content}
                      className=" dark:text-slate-200 text-black min-h-60 flex flex-col h-full"
                    />
                  </div>
                </div>

                {/* Cover Image Upload */}
                <div className="w-full px-3">
                  <div className="py-2 flex flex-row gap-3 items-end">
                    <div>
                      <Label htmlFor="coverImage" className="mb-2">
                        Cover Image
                      </Label>
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
                          <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
                            Upload a cover image for your blog
                          </p>
                          {coverSpinner ? (
                            <Spinner />
                          ) : (
                            <label
                              className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white flex-row gap-2 items-center"
                              onChange={(e) =>
                                handleCoverUpload(e.target.files[0])
                              }
                              htmlFor="coverImageUpload"
                            >
                              <input
                                name=""
                                type="file"
                                accept="image/*"
                                id="coverImageUpload"
                                hidden
                              />
                              Choose Cover Image
                              <FontAwesomeIcon icon={faFolderOpen} />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                    {coverImage && (
                      <div className="shadow-md flex justify-between gap-2 items-start dark:bg-slate-950 dark:text-white rounded-sm">
                        <Image
                          className=" w-36 h-28 rounded-sm object-cover"
                          src={coverImage}
                          width={100}
                          height={100}
                          alt="Cover Image"
                        />
                        <div
                          className="cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                          onClick={removeCoverImage}
                        >
                          <FontAwesomeIcon icon={faTrash} color="red" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="w-full px-3 pb-2 pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white hover:bg-blue-800"
                  >
                    Create Blog
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}

export default CreateNewBlog;
