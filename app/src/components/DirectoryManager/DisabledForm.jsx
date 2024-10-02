"use client";
import Input from "@/app/src/components/form/Input";
import Label from "@/app/src/components/form/Label";
import dynamic from "next/dynamic";
import Button from "@/app/src/components/global/Button";
import Section from "@/app/src/components/global/Section";
import Card from "@/app/src/ui/Card";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Spinner from "@/app/src/ui/Spinner";
import Container from "@/app/src/components/global/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import {
  reactQuillModuleSettings,
  reactQuillFormatSettings,
  truncateWithEllipsis,
  directoryCategory,
} from "@/lib/form";
import Switch from "@/app/src/ui/Switch";
import "quill/dist/quill.snow.css";
import Textarea from "../form/Textarea";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { toast } from "react-hot-toast";
import MultipleSelect from "../global/MultipleSelect";
import { text, toastText } from "@/constants/text-constants";

const pricingSchema = Yup.object({
  duration: Yup.string().required("Pricing duration is required"),
  price: Yup.string(),
  name: Yup.string().required("Pricing name is required"),
});

const validationSchema = Yup.object({
  icon: Yup.string().required("Icon is required"),
  name: Yup.string().required("Name is required"),
  type: Yup.string(),
  categories: Yup.array()
    .min(1, "At least one category is required")
    .required("Category is required"),
  website: Yup.string().required("Website is required"),
  isVerified: Yup.boolean(),
  isFeatured: Yup.boolean(),
  description: Yup.string().required("Description is required"),
  images: Yup.array(),
  pricings: Yup.array().of(pricingSchema),
});

const defaultState = {
  id: "",
  name: "",
  type: "",
  images: [],
  videos: [],
  categories: [],
  website: "",
  isVerified: false,
  isFeatured: false,
  extraInformation: "",
  description: "",
  icon: "",
  pricings: [
    { name: "Monthly", price: "", duration: "month" },
    { name: "Yearly", price: "", duration: "year" },
  ],
};

function DisabledForm({
  direcotorySlug,
  type,
  url,
  title,
  setIsNew,
  setUserDirectory,
}) {
  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const [imagesLink, setImagesLink] = useState([]);
  const [videosLink, setVideosLink] = useState([]);
  const [docsLink, setDocsLink] = useState([]);

  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState(defaultState);

  const handlePricings = (apiPricings) => {
    if (!apiPricings || apiPricings.length === 0) {
      return defaultState.pricings;
    }

    if (apiPricings.length === 1) {
      const [apiPricing] = apiPricings;
      const updatedPricings = defaultState.pricings.map((defaultPricing) =>
        defaultPricing.name === apiPricing.name ? apiPricing : defaultPricing
      );
      return updatedPricings;
    }

    return apiPricings;
  };

  useEffect(() => {
    const fetchData = async () => {
      // direcotorySlug
      let urlSlug = "";

      if (user.role === "admin") {
        const parts = window.location.pathname.split("/");
        urlSlug = parts[parts.length - 2];
      } else if (user.role === "creator") {
        urlSlug = direcotorySlug;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedPricings = handlePricings(response.data.pricings);
        response.data.pricings = updatedPricings;
        console.log(response.data);
        setImagesLink(response.data.images);
        setVideosLink(response.data.videos);
        setDocsLink(response.data.docs);
        setFormData(response.data); // Set the existing data to the form state
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [setFormData, user?.role, router, direcotorySlug, token]);

  const deleteDirectoryRequest = async (id) => {
    setSpinner(true);
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/directories/${id}/request`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(toastText.success.directoryDelete);
        setIsNew(true);
        setUserDirectory({});
      } else {
        toast.error(toastText.error.directoryNotDeleted);
      }
    } catch (error) {
      console.log("error->", error);
      if (error.response.status === 403) {
        toast.error(toastText.error.dircetoryCannotDelete);
        return;
      }
      toast.error(toastText.error.directoryNotDeleted);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Section className="px-3 py-6">
      <Container>
        {spinner ? (
          <div className=" w-full h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <Card>
            <div className="px-6 py-4 border-b border-slate-200 flex flex-row justify-between items-center">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white ">
                {title}
              </h2>
              <div>
                <Button
                  onClick={() => deleteDirectoryRequest(formData.id)}
                  className="bg-red-600 text-white hover:bg-red-800"
                >
                  Delete Directory
                </Button>
              </div>
            </div>
            <div className="px-6 pt-5 pb-6">
              <div className="flex flex-wrap -mx-3 -my-2">
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2 flex gap-1 flex-col">
                    <Label htmlFor="directoryTags" className="mb-2">
                      Upload Icon
                    </Label>
                    <div className=" flex flex-row gap-2 items-center">
                      <label
                        className=" cursor-not-allowed bg-gray-400 text-white border border-gray-400 hover:bg-gray-400 text-sm rounded-md px-3 py-1 h-fit"
                        onChange={(e) => handleIconUpload(e.target.files[0])}
                        htmlFor="formId"
                      >
                        <input
                          name=""
                          type="file"
                          accept="image/*"
                          id="formId"
                          hidden
                          disabled
                        />
                        Choose Icon
                      </label>
                      {formData.icon.length !== 0 && (
                        <Image
                          width={48}
                          height={48}
                          className=" w-12 h-12 rounded-full"
                          src={formData.icon}
                          alt="Directory Icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  {type !== "directoryRequest" && (
                    <div className="py-2 flex gap-1 flex-col items-start h-full">
                      <Label htmlFor="directoryTags" className="mb-2">
                        Directory Status
                      </Label>
                      <div className=" flex flex-row gap-4">
                        <div className="py-2">
                          <Switch
                            label="Verified"
                            size="sm"
                            checked={formData.isVerified}
                            className="cursor-not-allowed"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2">
                    <Label htmlFor="directoryName" className="mb-2">
                    {text.directoryForm.name.label}
                    </Label>
                    <Input
                      placeholder={text.directoryForm.name.placeholder}
                      id="directoryName"
                      disabled
                      className="dark:!bg-slate-800 dark:!text-slate-400"
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2">
                    <Label htmlFor="type" className="mb-2">
                    {text.directoryForm.type.label} 
                    </Label>
                    <Input
                      placeholder="Type"
                      disabled
                      value={formData.type}
                      className="dark:!bg-slate-800 dark:!text-slate-400"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2">
                    <Label htmlFor="category" className="mb-2">
                    {text.directoryForm.category.label} 
                    </Label>
                    <Input
                      id="category"
                      placeholder="Type"
                      disabled
                      value={formData.categories.join(", ")}
                      className="dark:!bg-slate-800 dark:!text-slate-400"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2">
                    <Label htmlFor="website" className="mb-2">
                    {text.directoryForm.website.label} 
                    </Label>
                    <Input
                      placeholder={text.directoryForm.website.placeholder}
                      id="website"
                      disabled
                      value={formData.website}
                      className="dark:!bg-slate-800 dark:!text-slate-400"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  {formData.type === "Paid" && (
                    <div className="py-2">
                      <div className=" grid grid-cols-2 gap-3">
                        <div>
                          <Label htmlFor="website" className="mb-2">
                            Monthly Price
                          </Label>
                          <Input
                            placeholder="0"
                            id="price"
                            type="number"
                            min="0"
                            disabled
                            className="dark:!bg-slate-800 dark:!text-slate-400"
                            value={
                              formData.pricings.length === 0
                                ? 0
                                : formData.pricings.find(
                                    (rec) => rec.name === "Monthly"
                                  )?.price
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor="website" className="mb-2">
                            Yearly Price
                          </Label>
                          <Input
                            placeholder="0"
                            id="price"
                            type="number"
                            min="0"
                            disabled
                            className="dark:!bg-slate-800 dark:!text-slate-400"
                            value={
                              formData.pricings.length === 0
                                ? 0
                                : formData.pricings.find(
                                    (rec) => rec.name === "Yearly"
                                  )?.price
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full px-3">
                  <div className="py-2 min-h-60">
                    <Label htmlFor="description" className="mb-2">
                      Description
                    </Label>
                    <ReactQuill
                      theme="snow"
                      modules={reactQuillModuleSettings}
                      formats={reactQuillFormatSettings}
                      placeholder="Add the simple directory description"
                      value={formData.description}
                      className=" dark:text-slate-200 text-black min-h-60 flex flex-col h-full "
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full px-3">
                  <div className="py-2 min-h-60 relative">
                    <Label htmlFor="summary" className="mb-2">
                    {text.directoryForm.summary.label}
                    </Label>
                    <Textarea
                      placeholder={text.directoryForm.summary.placeholder}
                      id="summary"
                      rows={8}
                      maxLength={200}
                      disabled={true}
                      value={formData?.summary}
                    />
                    <span className="absolute top-2 right-3 text-sm text-gray-500">
                      {formData.summary?.length}/200
                    </span>
                  </div>
                </div>

                <div className="w-full px-3">
                  <div className="py-2 min-h-60 relative">
                    <Label htmlFor="extraInformation" className="mb-2">
                    {text.directoryForm.extraInformation.label}
                    </Label>
                    <Textarea
                      placeholder={text.directoryForm.extraInformation.placeholder}
                      id="extraInformation"
                      rows={8}
                      disabled={true}
                      value={formData?.extraInformation}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2 flex gap-1 flex-col items-start">
                    <div className="w-full">
                      <div className="py-2">
                        <Label htmlFor="siteLogoLightTheme" className="mb-2">
                        {text.directoryForm.images.label}
                        </Label>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
                            {text.directoryForm.images.fileUploadLabel}
                            </p>
                            <label
                              className="cursor-not-allowed bg-gray-400 text-white border border-gray-400 hover:bg-gray-400 text-sm rounded-md px-3 py-1 h-fit flex items-center gap-2"
                              onChange={(e) => handleImagesChange(e)}
                              htmlFor="imageUpload"
                            >
                              <input
                                name=""
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                multiple
                                hidden
                                disabled
                              />
                              {text.directoryForm.images.fileUploadButtonText}
                              <FontAwesomeIcon icon={faFolderOpen} />
                            </label>
                          </div>
                        </div>
                        {imagesLink.map((imageLink, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>
                                {truncateWithEllipsis(
                                  imageLink.split("/").pop(),
                                  45
                                )}
                              </p>
                              <div className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md">
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2 flex gap-1 flex-col items-start">
                    <div className="w-full">
                      <div className="py-2">
                        <Label htmlFor="videoUpload" className="mb-2">
                        {text.directoryForm.videos.label}
                        </Label>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
                            {text.directoryForm.videos.fileUploadLabel}
                            </p>
                            <label
                              className="cursor-not-allowed bg-gray-400 text-white border border-gray-400 hover:bg-gray-400 text-sm rounded-md px-3 py-1 h-fit flex items-center gap-2"
                              onChange={(e) => handleVideoChange(e)}
                              htmlFor="videoUpload"
                            >
                              <input
                                name=""
                                type="file"
                                accept="video/*"
                                id="videoUpload"
                                multiple
                                hidden
                                disabled
                              />
                              {text.directoryForm.videos.fileUploadButtonText}
                              <FontAwesomeIcon icon={faFolderOpen} />
                            </label>
                          </div>
                        </div>
                        {videosLink.map((videoLink, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>
                                {truncateWithEllipsis(
                                  videoLink.split("/").pop(),
                                  45
                                )}
                              </p>
                              <div className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md">
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 px-3">
                  <div className="py-2 flex gap-1 flex-col items-start">
                    <div className="w-full">
                      <div className="py-2">
                        <Label htmlFor="documentUpload" className="mb-2">
                        {text.directoryForm.documents.label}
                        </Label>
                        <div className="flex flex-col gap-3">
                          <div className="flex flex-col items-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-md px-4 py-6">
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-300 text-center mb-3">
                            {text.directoryForm.documents.fileUploadLabel}
                            </p>
                            <label
                              className="cursor-not-allowed bg-gray-400 text-white border border-gray-400 hover:bg-gray-400 text-sm rounded-md px-3 py-1 h-fit flex items-center gap-2"
                              htmlFor="documentUpload"
                            >
                              <input
                                name=""
                                type="file"
                                accept=".pdf, .doc, .docx, .odt"
                                id="documentUpload"
                                multiple
                                hidden
                                disabled
                              />
                              {text.directoryForm.documents.fileUploadButtonText}
                              <FontAwesomeIcon icon={faFolderOpen} />
                            </label>
                          </div>
                        </div>
                        {docsLink?.map((docLink, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>
                                {truncateWithEllipsis(
                                  docLink.split("/").pop(),
                                  45
                                )}
                              </p>
                              <div className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md">
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
      </Container>
    </Section>
  );
}

export default DisabledForm;
