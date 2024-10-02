"use client";
import Input from "@/app/src/components/form/Input";
import dynamic from "next/dynamic";
import Label from "@/app/src/components/form/Label";
import Button from "@/app/src/components/global/Button";
import Section from "@/app/src/components/global/Section";
import Card from "@/app/src/ui/Card";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/app/src/ui/Spinner";
import * as Yup from "yup";
import Select from "@/app/src/components/global/Select";
import axios from "axios";
import { useRouter } from "next/navigation";
import Container from "@/app/src/components/global/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import {
  directoryType,
  directoryCategory,
  cleanObject,
  truncateWithEllipsis,
  reactQuillModuleSettings,
  reactQuillFormatSettings,
} from "@/lib/form";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Switch from "@/app/src/ui/Switch";
import "quill/dist/quill.snow.css";
import Textarea from "../../form/Textarea";
import MultipleSelect from "../../global/MultipleSelect";
import { text, toastText } from "@/constants/text-constants";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const pricingSchema = Yup.object({
  duration: Yup.string().required("Pricing duration is required"),
  price: Yup.string(),
  name: Yup.string().required("Pricing name is required"),
});

const validationSchema = Yup.object({
  icon: Yup.string().required("Icon is required"),
  name: Yup.string().required("Name is required"),
  type: Yup.string(),
  summary: Yup.string()
    .required("Summary is required")
    .max(200, "Summary cannot exceed 200 characters"),
  extraInformation: Yup.string(),
  categories: Yup.array()
    .min(1, "At least one category is required")
    .required("Category is required"),
  website: Yup.string().required("Website is required"),
  isVerified: Yup.boolean(),
  isFeatured: Yup.boolean(),
  description: Yup.string().required("Description is required"),
  images: Yup.array(),
  pricings: Yup.array()
    .of(pricingSchema)
    .when("type", {
      is: "Paid",
      then: (schema) =>
        schema.min(1, "At least one pricing is required for paid types"),
    }),
});

function CreateDirectoryForm({
  title,
  url,
  type,
  setIsNew = () => {},
  setIsActive = () => {},
}) {
  const defaultState = {
    name: "",
    type: "",
    images: [],
    videos: [],
    docs: [],
    categories: [],
    website: "",
    isVerified: type === "directoryRequest" ? true : false,
    isFeatured: false,
    description: "",
    extraInformation: "",
    summary: "",
    icon: "",
    pricings: [
      { name: "Monthly", price: 0, duration: "month" },
      { name: "Yearly", price: 0, duration: "year" },
    ],
  };

  const router = useRouter();
  const { token } = useSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);

  const [imagesSpinner, setImagesSpinner] = useState(false);
  const [videoSpinner, setVideoSpinner] = useState(false);
  const [DocumentSpinner, setDocsSpinner] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [formData, setFormData] = useState(defaultState);
  const { user } = useSelector((state) => state.auth);

  const handleIconUpload = async (selectedImage) => {
    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/directories/icon`;
      const response = await axios.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        handleInputChange("icon", response.data.icon);
      } else {
        toast.error("Issue while uploading the Icon");
      }
    } catch (error) {
      console.error("Error uploading the Icon:", error);
    }
  };

  const handleInputChange = (field, value, index) => {
    setFormData((prevFormData) => {
      if (field === "pricings") {
        const newFormData = { ...prevFormData };
        newFormData.pricings[index]["price"] = value;
        return newFormData;
      }

      if (field === "categories") {
        const newFormData = { ...prevFormData };
        const newCategories = value.map((cat) => cat.name);
        newFormData.categories = newCategories;
        return newFormData;
      }

      if (field === "summary" && value.length > 200) {
        value = value.substring(0, 200);
      }

      return {
        ...prevFormData,
        [field]: value,
      };
    });
  };

  const handleVideoChange = async (event) => {
    setVideos([...videos, ...event.target.files]);
  };

  const handleDocumentChange = async (event) => {
    setDocs([...docs, ...event.target.files]);
  };

  const uploadVideoToServer = async () => {
    const videosData = new FormData();
    videos.map((video) => videosData.append("files", video));

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/directories/videos`;
      const response = await axios.put(url, videosData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        formData.videos = response.data.videos;
      } else {
        toast.error("Issue while uploading the image");
      }
    } catch (error) {
      console.error("Error uploading the images:", error);
    }
  };

  const uploadDocumentsToServer = async () => {
    const documentsData = new FormData();
    docs.map((document) => documentsData.append("files", document));

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/directories/docs`;
      const response = await axios.put(url, documentsData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        formData.docs = response.data.docs;
      } else {
        toast.error("Issue while uploading the documents");
      }
    } catch (error) {
      console.error("Error uploading the documents:", error);
    }
  };

  const removeSelectedVideoFile = (fileToRemove) => {
    setVideos(videos.filter((video) => video !== fileToRemove));
  };

  const handleImagesChange = async (event) => {
    setImages([...images, ...event.target.files]);
  };

  const removeSelectedDocumentFile = (fileToRemove) => {
    setDocs(docs.filter((document) => document !== fileToRemove));
  };

  const uploadImagesToServer = async () => {
    const ImagesData = new FormData();
    images.map((image) => ImagesData.append("files", image));
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/directories/images`;
      const response = await axios.put(url, ImagesData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        formData.images = response.data.images;
      } else {
        toast.error("Issue while uploading the image");
      }
    } catch (error) {
      console.error("Error uploading the images:", error);
    }
  };

  const removeSelectedImageFile = (fileToRemove) => {
    setImages(images.filter((image) => image !== fileToRemove));
  };

  const handleSubmit = async () => {
    if (formData.type !== "Paid") {
      delete formData.pricings;
    }

    setSpinner(true);
    if (images.length !== 0) {
      await uploadImagesToServer();
    }

    if (videos.length !== 0) {
      await uploadVideoToServer();
    }

    if (docs.length !== 0) {
      await uploadDocumentsToServer();
    }

    formData.pricings = formData.pricings?.filter((rec) => rec.price !== "");
    if (formData.pricings?.length === 0 && formData.type === "Paid") {
      setFormData(defaultState);
      toast.error("At Least one pricing is required");
      setSpinner(false);
      return;
    }
    const cleanedFormData = cleanObject(formData);
    try {
      await validationSchema.validate(cleanedFormData);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
        cleanedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 201) {
        toast.success(toastText.success.directoryCreated);
        setIsNew(false);
        setIsActive(false);
        setFormData(defaultState);
        // router.push('/dashboard/directories')
      } else {
        toast.error("Error, creating the record");
      }
    } catch (validationError) {
      console.log(validationError);
      toast.error(validationError.message);
    }

    setSpinner(false);
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
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xl font-bold text-slate-700 dark:text-white ">
                {title}
              </h2>
            </div>
            <div className="px-6 pt-5 pb-6">
              <div className="flex flex-wrap -mx-3 -my-2">
                <div className="w-full lg:w-1/2  px-3">
                  <div className="py-2 flex gap-1 flex-col">
                    <Label htmlFor="uploadIcon" className="mb-2">
                      Upload Icon
                    </Label>
                    <div className=" flex flex-row gap-2 items-center">
                      <label
                        className=" cursor-pointer  hover:bg-blue-800 text-sm text-white duration-200 bg-blue-600 rounded-md px-3 py-1 border border-gray-600 h-fit border-none"
                        onChange={(e) => handleIconUpload(e.target.files[0])}
                        htmlFor="formId"
                      >
                        <input
                          name=""
                          type="file"
                          accept="image/*"
                          id="formId"
                          hidden
                        />
                        Choose Icon
                      </label>
                      {formData.icon.length !== 0 && (
                        <Image
                          className=" w-12 h-12 rounded-full"
                          src={formData.icon}
                          width={100}
                          height={100}
                          alt="Directory Icon"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
                  {type !== "directoryRequest" && (
                    <div className="py-2 flex gap-1 flex-col items-start h-full">
                      <Label htmlFor="directoryStatus" className="mb-2">
                        Directory Status
                      </Label>
                      <div className=" flex flex-row gap-4">
                        <div className="py-2">
                          <Switch
                            label="Verified"
                            size="sm"
                            checked={formData.isVerified}
                            onChange={() =>
                              handleInputChange(
                                "isVerified",
                                !formData.isVerified
                              )
                            }
                          />
                        </div>
                        <div className="py-2">
                          <Switch
                            label="Featured"
                            size="sm"
                            checked={formData.isFeatured}
                            onChange={() =>
                              handleInputChange(
                                "isFeatured",
                                !formData.isFeatured
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-1/2  px-3">
                  <div className="py-2">
                    <Label htmlFor="directoryName" className="mb-2">
                      {text.directoryForm.name.label}
                    </Label>
                    <Input
                      placeholder={text.directoryForm.name.placeholder}
                      id="directoryName"
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      value={formData.name}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
                  <div className="py-2">
                    <Label htmlFor="type" className="mb-2">
                    {text.directoryForm.type.label} 
                    </Label>
                    <Select
                      options={directoryType}
                      selected={{ name: formData.type }}
                      onChange={(e) => handleInputChange("type", e.name)}
                      id="templateStatus"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
                  <div className="py-2">
                    <Label htmlFor="type" className="mb-2">
                    {text.directoryForm.category.label} 
                    </Label>
                    <MultipleSelect
                      options={directoryCategory}
                      selected={formData.categories?.map((name) => ({ name }))}
                      onChange={(e) => handleInputChange("categories", e)}
                      id="categories"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
                  <div className="py-2">
                    <Label htmlFor="website" className="mb-2">
                    {text.directoryForm.website.label} 
                    </Label>
                    <Input
                      placeholder={text.directoryForm.website.placeholder}
                      id="website"
                      onChange={(e) =>
                        handleInputChange("website", e.target.value)
                      }
                      value={formData.website}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
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
                            onChange={(e) => {
                              handleInputChange("pricings", e.target.value, 0);
                            }}
                            value={formData.pricings.price}
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
                            onChange={(e) => {
                              handleInputChange("pricings", e.target.value, 1);
                            }}
                            value={formData.pricings.price}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-full px-3 ">
                  <div className="py-2 min-h-60">
                    <Label htmlFor="description" className="mb-2">
                      Description
                    </Label>
                    <ReactQuill
                      theme="snow"
                      modules={reactQuillModuleSettings}
                      formats={reactQuillFormatSettings}
                      placeholder="Add the simple directory description"
                      onChange={(content) => {
                        handleInputChange("description", content);
                      }}
                      value={formData.description}
                      className=" dark:text-slate-200 text-black min-h-60 flex flex-col h-full"
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
                      onChange={(e) =>
                        handleInputChange("summary", e.target.value)
                      }
                      value={formData.summary}
                    />
                    <span className="absolute top-2 right-3 text-sm text-gray-500">
                      {formData.summary.length}/200
                    </span>
                  </div>
                </div>

                <div className="w-full px-3">
                  <div className="py-2 min-h-60">
                    <Label htmlFor="extraInformation" className="mb-2">
                      {text.directoryForm.extraInformation.label}
                    </Label>
                    <Textarea
                      placeholder={text.directoryForm.extraInformation.placeholder}
                      id="extraInformation"
                      rows={8}
                      onChange={(e) =>
                        handleInputChange("extraInformation", e.target.value)
                      }
                      value={formData.extraInformation}
                    />
                  </div>
                </div>

                <div className="w-full lg:w-1/2  px-3">
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
                            {imagesSpinner ? (
                              <Spinner />
                            ) : (
                              <label
                                className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white flex-row gap-2 items-center"
                                onChange={(event) => handleImagesChange(event)}
                                htmlFor="imageUpload"
                              >
                                <input
                                  name=""
                                  type="file"
                                  accept="image/*"
                                  id="imageUpload"
                                  multiple
                                  hidden
                                />
                                {text.directoryForm.images.fileUploadButtonText}
                                <FontAwesomeIcon icon={faFolderOpen} />
                              </label>
                            )}
                          </div>
                        </div>
                        {images.map((image, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>{truncateWithEllipsis(image.name, 45)}</p>
                              <div
                                className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                                onClick={() => removeSelectedImageFile(image)}
                              >
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
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
                            {videoSpinner ? (
                              <Spinner />
                            ) : (
                              <label
                                className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white flex-row gap-2 items-center"
                                onChange={(event) => handleVideoChange(event)}
                                htmlFor="videoUpload"
                              >
                                <input
                                  name=""
                                  type="file"
                                  accept="video/*"
                                  id="videoUpload"
                                  multiple
                                  hidden
                                />
                                {text.directoryForm.videos.fileUploadButtonText}
                                <FontAwesomeIcon icon={faFolderOpen} />
                              </label>
                            )}
                          </div>
                        </div>
                        {videos.map((video, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>{truncateWithEllipsis(video.name, 45)}</p>
                              <div
                                className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                                onClick={() => removeSelectedVideoFile(video)}
                              >
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2  px-3">
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
                            {DocumentSpinner ? (
                              <Spinner />
                            ) : (
                              <label
                                className="inline-flex px-2 py-1 rounded text-sm font-medium cursor-pointer bg-blue-600 text-white flex-row gap-2 items-center"
                                onChange={(event) =>
                                  handleDocumentChange(event)
                                }
                                htmlFor="documentUpload"
                              >
                                <input
                                  name=""
                                  type="file"
                                  accept=".pdf, .doc, .docx, .odt"
                                  id="documentUpload"
                                  multiple
                                  hidden
                                />
                                {text.directoryForm.documents.fileUploadButtonText}
                                <FontAwesomeIcon icon={faFolderOpen} />
                              </label>
                            )}
                          </div>
                        </div>
                        {docs.map((document, index) => {
                          return (
                            <div
                              key={index}
                              className=" shadow-md p-3 flex justify-between items-center dark:bg-slate-950 dark:text-white rounded-md"
                            >
                              <p>{truncateWithEllipsis(document.name, 45)}</p>
                              <div
                                className=" cursor-pointer bg-red-100 hover:bg-red-200 duration-150 transform px-3 py-1 rounded-md"
                                onClick={() =>
                                  removeSelectedDocumentFile(document)
                                }
                              >
                                <FontAwesomeIcon icon={faTrash} color="red" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full px-3 pb-2 pt-4">
                  <Button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white hover:bg-blue-800"
                  >
                    Create Directory
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

export default CreateDirectoryForm;
