'use client'

import InputNew from "../form/InputNew";
import Button from "../form/Button";
import dynamic from "next/dynamic";
import Image from "next/image";
import Label from "@/app/src/components/form/Label";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  directoryType,
  directoryCategory,
  cleanObject,
  truncateWithEllipsis,
  reactQuillModuleSettings,
  reactQuillFormatSettings,
} from "@/lib/form";
import { toast } from "react-hot-toast";
import "quill/dist/quill.snow.css";
import { text, toastText } from "@/constants/text-constants";

import * as Yup from "yup";
import SelectNew from "../global/SelectNew";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import MultipleSelectNew from "@/app/src/components/global/MultipleSelectNew";
import TextArea from "../global/TextArea";



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

function EditDirectory({
  directorySlug,
  type,
  url,
  title,
  setIsNew,
  setUserDirectory,
  pricingUrl,
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

  const [spinner, setSpinner] = useState(false);
  const router = useRouter();
  const [imagesLink, setImagesLink] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesList, setImagesList] = useState([]);

  console.log(images, imagesLink)

  const [videosLink, setVideosLink] = useState([]);
  const [docsLink, setDocsLink] = useState([]);
  const [videos, setVideos] = useState([]);
  const [docs, setDocs] = useState([]);

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
      setSpinner(true);
      let urlSlug = "";
      let url = ''

      if (user.role === "admin") {
        const parts = window.location.pathname.split("/");
        urlSlug = parts[parts.length - 2];

      } else if (user.role === "creator") {
        urlSlug = 'me';
      }

      let headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/${urlSlug}`,
          { headers }
        );
        const updatedPricings = handlePricings(response.data.pricings);
        response.data.pricings = updatedPricings;
        setImagesLink(response.data.images);
        setVideosLink(response.data.videos);
        setDocsLink(response.data.docs);
        console.log(response.data);
        setFormData(response.data);
      } catch (error) {
        if (error.response.status === 404) {
          router.push("/directoryNotFound");
        }
        console.error("Error fetching directory data:", error);
      } finally {
        setSpinner(false);
      }
    };

    fetchData();
  }, [setFormData, user?.role, token, router, directorySlug]);

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
        console.log(response);
        toast.error("Issue while uploading the Icon");
      }
    } catch (error) {
      console.error("Error uploading the Icon:", error);
    }
  };

  const handleInputChange = (field, value, pricingDurationType) => {
    setFormData((prevFormData) => {
      if (field === "pricings") {
        const newFormData = { ...prevFormData };
        newFormData.pricings.find((rec) => rec.name === pricingDurationType)[
          "price"
        ] = value;
        return newFormData;
      }

      if (field === "categories") {
        const newFormData = { ...prevFormData };
        const newCategories = value.map((cat) => cat.name);
        newFormData.categories = newCategories;
        return newFormData;
      }

      if (field === "type" && value === "Paid") {
        const newFormData = { ...prevFormData };
        newFormData.pricings = defaultPricingArray;
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
        formData.images = [...imagesLink, ...response.data.images];
      } else {
        toast.error("Issue while uploading the image");
      }
    } catch (error) {
      console.error("Error uploading the images:", error);
    }
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
        formData.videos = [...videosLink, ...response.data.videos];
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
        formData.docs = [...docsLink, ...response.data.docs];
      } else {
        toast.error("Issue while uploading the Document");
      }
    } catch (error) {
      console.error("Error uploading the document:", error);
    }
  };

  const handleImagesChange = async (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleVideoChange = async (event) => {
    setVideos([...videos, ...event.target.files]);
  };

  const handleDocumentChange = async (event) => {
    setDocs([...docs, ...event.target.files]);
  };

  const removeUploadedImage = (imageLink) => {
    setImagesLink(imagesLink.filter((imgLink) => imgLink !== imageLink));
  };

  const removeSelectedImageFile = (fileToRemove) => {
    setImages(images.filter((image) => image !== fileToRemove));
  };

  const removeUploadedVideo = (videoLink) => {
    setVideosLink(videosLink.filter((vidLink) => vidLink !== videoLink));
  };

  const removeSelectedVideoFile = (fileToRemove) => {
    setVideos(videos.filter((video) => video !== fileToRemove));
  };

  const removeUploadedDocument = (documentLink) => {
    setDocsLink(docsLink.filter((docLink) => docLink !== documentLink));
  };

  const removeSelectedDocumentFile = (fileToRemove) => {
    setDocs(docs.filter((document) => document !== fileToRemove));
  };

  const updateDiectoryPricings = () => {
    formData.pricings.forEach(async (rec) => {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/directories/${formData.id}/pricings`;
      let method;
      let data = {
        price: Number(rec.price),
      };

      if (rec.id) {
        url += `/${rec.id}`;
        if (type === "directoryRequest") {
          url += "/request";
        }
        method = "patch";
      } else {
        if (type === "directoryRequest") {
          url += "/request";
        }
        method = "post";
        data = { ...rec, price: Number(rec.price) };
      }

      try {
        const response = await axios({
          method: method,
          url: url,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const handleSubmit = async () => {
    setSpinner(true);
    if (formData.type !== "Paid") {
      delete formData.pricings;
    }

    if (images.length !== 0) {
      await uploadImagesToServer();
    } else if (imagesLink.length !== 0) {
      formData.images = imagesLink;
    } else {
      formData.images = [];
    }

    if (videos.length !== 0) {
      await uploadVideoToServer();
    } else if (videosLink.length !== 0) {
      formData.videos = videosLink;
    } else {
      formData.videos = [];
    }

    if (docs.length !== 0) {
      await uploadDocumentsToServer();
    } else if (docsLink.length !== 0) {
      formData.docs = docsLink;
    } else {
      formData.docs = [];
    }

    formData.pricings = formData.pricings?.filter((rec) => rec.price !== "");
    if (formData.type === "Paid") {
      console.log("Update");
      updateDiectoryPricings();
    }

    const cleanedFormData = cleanObject(formData);

    try {
      await validationSchema.validate(cleanedFormData);
      const editDirecUrl = url || `/directories/${formData.id}`;

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}${editDirecUrl}`,
        cleanedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(toastText.success.directoryUpdated);
      } else {
        console.log(response);
      }
    } catch (validationError) {
      console.log(validationError);
      toast.error(validationError.message);
    }
    setSpinner(false);
  };

  const deleteDirectoryRequest = async (id) => {
    setSpinner(true);
    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/directories/${id}`;
      if (type === "directoryRequest") {
        url += "/request";
      }
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success(toastText.success.directoryDelete);
        if (type === "directoryRequest") {
          setIsNew(true);
          setUserDirectory({});
        } else {
          router.push(`/dashboard/directories`);
        }
      } else {
        toast.error(toastText.error.directoryNotDeleted);
      }
    } catch (error) {
      console.log(error);
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
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-32 pb-16 text-white">


      <div className="lg:w-[770px] w-full px-[30px] lg:px-0">
        <h1 className="text-[32px] lg:text-5xl font-bold text-white mb-4 text-center">
          {title}
        </h1>
        <p className="text-base lg:text-lg font-bold text-center">We recommend uploading as much specific, detailed information as possible about your AI tool. This will increase the quality of your leads, as the chatbot will recommend AI tools more precisely and accurately to users.</p>
      </div>
      <div className="w-full lg:max-w-[570px] flex flex-col items-center justify-center px-[30px] lg:px-4 py-8">
        {/* Upload Icon */}
        <div className="relative w-40 h-40 rounded-full bg-[#1e1e1e] border border-[rgba(255,255,255,0.2)] mb-8 flex items-center justify-center">
          {formData.icon.length !== 0 ? (
            <>
              <Image
                className="w-full h-full object-cover rounded-full"
                src={formData.icon}
                width={100}
                height={100}
                alt="Directory Icon"
              />
              <div className="absolute bottom-1 right-1">
                <label
                  className="cursor-pointer flex items-center justify-center min-w-7 min-h-7 bg-[#1E1E1E] p-2 border border-gray-700 rounded-md font-bold"
                  onChange={(e) => handleIconUpload(e.target.files[0])}
                  htmlFor="mobileImageUpload"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="mobileImageUpload"
                    hidden
                    onChange={(e) => handleIconUpload(e.target.files[0])}
                  />
                  <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.5007 0.333336L12.1569 2.33334H15.0007H16.5007V3.83334V12.8333V14.3333H15.0007H2.00065H0.500652V12.8333V3.83334V2.33334H2.00065H4.81315L5.50065 0.333336H11.5007ZM12.1569 3.83334H11.0632L10.7194 2.83334L10.4069 1.83334H6.56315L6.25065 2.83334L5.9069 3.83334H4.81315H2.00065V12.8333H15.0007V3.83334H12.1569ZM8.50065 4.83334C9.75065 4.83334 10.8757 5.52084 11.5007 6.58334C12.1569 7.67709 12.1569 9.02084 11.5007 10.0833C10.8757 11.1771 9.75065 11.8333 8.50065 11.8333C7.2194 11.8333 6.0944 11.1771 5.4694 10.0833C4.81315 9.02084 4.81315 7.67709 5.4694 6.58334C6.0944 5.52084 7.2194 4.83334 8.50065 4.83334ZM10.5007 8.33334C10.5007 7.64584 10.0944 6.98959 9.50065 6.61459C8.87565 6.27084 8.0944 6.27084 7.50065 6.61459C6.87565 6.98959 6.50065 7.64584 6.50065 8.33334C6.50065 9.05209 6.87565 9.70834 7.50065 10.0833C8.0944 10.4271 8.87565 10.4271 9.50065 10.0833C10.0944 9.70834 10.5007 9.05209 10.5007 8.33334Z" fill="white" />
                  </svg>
                </label>
              </div>
            </>
          ) : (
            <div className="text-center text-white">
              <label htmlFor="upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
                  </svg>
                  <span>Upload Icon</span>
                </div>
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleIconUpload(e.target.files[0])}
                />
              </label>
            </div>
          )}
        </div>

        {/* Form */}
        <div className="w-full lg:w-[570px] space-y-5 flex justify-center items-center flex-col rounded-lg">
          <div className="flex flex-col w-full lg:flex-row space-y-3 lg:space-y-0 lg:space-x-[20px]">
            {/* First Name */}
            <div className="relative w-full lg:w-[275px]">
              <InputNew
                type="text"
                name="name"
                placeholder=" "
                id="directoryName"
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
                value={formData.name}
                label="NAME"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>

            <div className="relative w-full lg:w-[275px]">
              <SelectNew
                options={directoryType}
                selected={{ name: formData.type }}
                onChange={(e) => handleInputChange("type", e.name)}
                id="templateStatus"
                label="PRICE"
              />
            </div>
          </div>

          <div className="flex flex-col w-full lg:flex-row space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
            {/* First Name */}
            <div className="relative w-full lg:w-[275px]">
              <MultipleSelectNew
                options={directoryCategory}
                selected={formData.categories?.map((name) => ({ name }))}
                onChange={(e) => handleInputChange("categories", e)}
                id="categories"
                Name="USE CASE"
              />
            </div>

            <div className="relative w-full lg:w-[275px]">
              <InputNew
                type="text"
                name="website"
                id="website"
                onChange={(e) =>
                  handleInputChange("website", e.target.value)
                }
                value={formData.website}
                placeholder=" "
                label="WEBSITE"
                labelClassName="text-[rgba(255,255,255,0.5)]"
              />
            </div>
          </div>

          <div className="relative w-full bg-[#323639] rounded-[6.56px] border border-[rgba(255,255,255,0.2)] pt-4">
            <label htmlFor="description" className="text-gray-400 text-sm mb-2 uppercase pl-4">
              Description
            </label>
            <ReactQuill
              modules={reactQuillModuleSettings}
              formats={reactQuillFormatSettings}
              placeholder="Add a simple directory description"
              onChange={(content) => {
                handleInputChange("description", content);
              }}
              value={formData.description}
              className="bg-[#323639] rounded-md text-white max-h-100 flex flex-col h-full quill-editor-custom"
            />
          </div>



          <div className="flex flex-col w-full lg:flex-row space-y-[20px] lg:space-y-0 lg:space-x-[20px]">
            {/* First Name */}
            <div className="relative w-full lg:w-[275px]">
              <TextArea
                placeholder={text.directoryForm.summary.placeholder}
                id="summary"
                rows={8}
                maxLength={200}
                onChange={(e) =>
                  handleInputChange("summary", e.target.value)
                }
                value={formData.summary}
                label="SUMMARY DESCRIPTION"
              />
            </div>

            <div className="relative w-full lg:w-[275px]">
              <TextArea
                placeholder={text.directoryForm.extraInformation.placeholder}
                id="extraInformation"
                rows={8}
                onChange={(e) =>
                  handleInputChange("extraInformation", e.target.value)
                }
                value={formData.extraInformation}
                label="EXTRA INFORMATION"
              />
            </div>
          </div>

          <div className="relative w-full">
            <h3 className="text-lg font-bold mb-2">Images</h3>
            {
              imagesLink.length === 0 && images.length === 0 ?
                <div onClick={() => document.getElementById('image-upload').click()} className="flex justify-center items-center mx-auto max-w-auto max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                  <label lassName="cursor-pointer flex justify-center">
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
                    </svg>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleImagesChange(e)}
                  />
                </div>
                :
                <div className="flex flex-row mt-4 gap-8">
                  <div onClick={() => document.getElementById('image-upload').click()} className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                    <label className="cursor-pointer flex justify-center">
                      <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.5 0.5L17.4844 3.5H21.75H24V5.75V19.25V21.5H21.75H2.25H0V19.25V5.75V3.5H2.25H6.46875L7.5 0.5H16.5ZM17.4844 5.75H15.8438L15.3281 4.25L14.8594 2.75H9.09375L8.625 4.25L8.10938 5.75H6.46875H2.25V19.25H21.75V5.75H17.4844ZM12 7.25C13.875 7.25 15.5625 8.28125 16.5 9.875C17.4844 11.5156 17.4844 13.5312 16.5 15.125C15.5625 16.7656 13.875 17.75 12 17.75C10.0781 17.75 8.39062 16.7656 7.45312 15.125C6.46875 13.5312 6.46875 11.5156 7.45312 9.875C8.39062 8.28125 10.0781 7.25 12 7.25ZM15 12.5C15 11.4688 14.3906 10.4844 13.5 9.92188C12.5625 9.40625 11.3906 9.40625 10.5 9.92188C9.5625 10.4844 9 11.4688 9 12.5C9 13.5781 9.5625 14.5625 10.5 15.125C11.3906 15.6406 12.5625 15.6406 13.5 15.125C14.3906 14.5625 15 13.5781 15 12.5Z" fill="white" />
                      </svg>
                    </label>
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(event) => handleImagesChange(event)}
                    />
                  </div>
                  <div className="overflow-x-auto flex space-x-4 max-h-[150px] w-full lg:w-[400px]">
                    {imagesLink.map((img, index) => (
                      <div key={index} className="relative min-w-[90px]">
                        <img src={img} alt={`Uploaded ${index}`} className="h-[90px] w-[140px] rounded-[5px] object-cover" />
                        <button
                          onClick={() => removeUploadedImage(img)}
                          className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                        >
                          <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>

                        </button>
                      </div>
                    ))}
                    {images.map((img, index) => (
                      <div key={index} className="relative min-w-[90px]">
                        <img src={URL.createObjectURL(img)} alt={`Uploaded ${index}`} className="h-[90px] w-[140px] rounded-[5px] object-cover" />
                        <button
                          onClick={() => removeSelectedImageFile(img)}
                          className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                        >
                          <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>

                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            }
          </div>

          <div className="relative w-full">
            <h3 className="text-lg font-bold mb-2">Videos</h3>
            {
              videosLink.length === 0 && videos.length === 0 ?
                <div onClick={() => document.getElementById('video-upload').click()} className="flex justify-center items-center max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                  <label className="cursor-pointer flex justify-center">
                    <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.75 2.25V15.75H16.25V2.25H2.75ZM0.5 0H2.75H16.25H18.5V2.25V4.5V13.5V15.75V18H16.25H2.75H0.5V15.75V2.25V0ZM20 11.7656L25.25 14.3906V3.65625L20 6.28125V3.75L25.25 1.125L27.5 0V2.53125V15.5156V18L25.25 16.875L20 14.25V11.7656Z" fill="white" />
                    </svg>
                  </label>
                  <input
                    id="video-upload"
                    type="file"
                    className="hidden"
                    accept="video/*"
                    multiple
                    onChange={(event) => handleVideoChange(event)}
                  />
                </div>
                :
                <div className="flex flex-row mt-4 gap-8">
                  <div onClick={() => document.getElementById('video-upload').click()} className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                    <label className="cursor-pointer flex justify-center">
                      <svg width="28" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.75 2.25V15.75H16.25V2.25H2.75ZM0.5 0H2.75H16.25H18.5V2.25V4.5V13.5V15.75V18H16.25H2.75H0.5V15.75V2.25V0ZM20 11.7656L25.25 14.3906V3.65625L20 6.28125V3.75L25.25 1.125L27.5 0V2.53125V15.5156V18L25.25 16.875L20 14.25V11.7656Z" fill="white" />
                      </svg>
                    </label>
                    <input
                      id="video-upload"
                      type="file"
                      className="hidden"
                      accept="video/*"
                      multiple
                      onChange={(event) => handleVideoChange(event)}
                    />
                  </div>

                  {/* Scrollable container for videos */}
                  <div className="overflow-x-auto flex space-x-4 max-h-[150px] w-full lg:w-[400px]">
                    {videosLink.map((vid, index) => (
                      <div key={index} className="relative min-w-[90px]">
                        <video className="h-[90px] w-[140px] rounded-[5px] object-cover" controls src={vid}></video>
                        <button
                          onClick={() => removeUploadedVideo(vid)}
                          className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                        >
                          <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {videos.map((vid, index) => (
                      <div key={index} className="relative min-w-[90px]">
                        <video className="h-[90px] w-[140px] rounded-[5px] object-cover" controls src={vid}></video>
                        <button
                          onClick={() => removeSelectedVideoFile(vid)}
                          className="absolute top-2 right-2 bg-black text-white rounded-[5px] p-1"
                        >
                          <svg width="10" height="11" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

            }
          </div>

          <div className="relative w-full">
            <h3 className="text-lg font-bold mb-2">Documents</h3>
            <p className="text-white text-xs mb-4" style={{ fontWeight: "400" }}>This document will be used to inform the chatbot to make more accurate AI tool recommendations. It will not be published. </p>
            {
              docsLink.length === 0 && docs.length === 0 ?
                <div onClick={() => document.getElementById('document-upload').click()} className="flex justify-center items-center max-h-[150px] w-full border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-6 text-center cursor-pointer ">
                  <label className="cursor-pointer flex justify-center">
                    <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.0781 4.42188C16.8594 3.20312 14.8438 3.20312 13.625 4.42188L4.67188 13.4219C2.60938 15.4844 2.60938 18.8125 4.67188 20.8281C6.6875 22.8906 10.0156 22.8906 12.0781 20.8281L19.2031 13.7031L20 12.9062L21.5469 14.5L20.75 15.2969L13.6719 22.4219C10.7188 25.375 5.98438 25.375 3.07812 22.4219C0.125 19.5156 0.125 14.7812 3.07812 11.8281L12.0781 2.82812C14.1406 0.765625 17.5625 0.765625 19.6719 2.82812C21.7344 4.9375 21.7344 8.35938 19.6719 10.4219L11.0469 19.0469C9.54688 20.5469 7.10938 20.4062 5.79688 18.7656C4.67188 17.3594 4.8125 15.3438 6.07812 14.0781L13.2031 6.95312L14 6.15625L15.5469 7.75L14.75 8.54688L7.67188 15.6719C7.20312 16.1406 7.15625 16.8438 7.57812 17.3594C8.04688 17.9219 8.89062 18.0156 9.45312 17.4531L18.0781 8.82812C19.2969 7.60938 19.2969 5.64062 18.0781 4.42188Z" fill="white" />
                    </svg>

                  </label>
                  <input
                    id="document-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    multiple
                    onChange={(event) => handleDocumentChange(event)}
                  />
                </div>
                :
                <div className="flex flex-row mt-4 gap-8">
                  <div onClick={() => document.getElementById('document-upload').click()} className="flex justify-center items-center max-h-[150px] w-[90px] border-[1px] border-[rgba(255,255,255,0.5)] bg-[#323639] rounded-[10px] p-4 text-center cursor-pointer">
                    <label className="cursor-pointer flex justify-center">
                      <svg width="22" height="26" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.0781 4.42188C16.8594 3.20312 14.8438 3.20312 13.625 4.42188L4.67188 13.4219C2.60938 15.4844 2.60938 18.8125 4.67188 20.8281C6.6875 22.8906 10.0156 22.8906 12.0781 20.8281L19.2031 13.7031L20 12.9062L21.5469 14.5L20.75 15.2969L13.6719 22.4219C10.7188 25.375 5.98438 25.375 3.07812 22.4219C0.125 19.5156 0.125 14.7812 3.07812 11.8281L12.0781 2.82812C14.1406 0.765625 17.5625 0.765625 19.6719 2.82812C21.7344 4.9375 21.7344 8.35938 19.6719 10.4219L11.0469 19.0469C9.54688 20.5469 7.10938 20.4062 5.79688 18.7656C4.67188 17.3594 4.8125 15.3438 6.07812 14.0781L13.2031 6.95312L14 6.15625L15.5469 7.75L14.75 8.54688L7.67188 15.6719C7.20312 16.1406 7.15625 16.8438 7.57812 17.3594C8.04688 17.9219 8.89062 18.0156 9.45312 17.4531L18.0781 8.82812C19.2969 7.60938 19.2969 5.64062 18.0781 4.42188Z" fill="white" />
                      </svg>
                    </label>
                    <input
                      id="document-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      multiple
                      onChange={(event) => handleDocumentChange(event)}
                    />
                  </div>

                  {/* Scrollable container for documents */}
                  <div className="overflow-x-auto flex space-x-4 max-h-[150px] w-full lg:w-[400px]">
                    {docsLink.map((doc, index) => (
                      <div key={index} className="bg-[#323639] rounded-[10px] p-4 flex justify-center items-center min-w-[90px]">
                        <a href={doc} className="text-center cursor-pointer" target="_blank" rel="noopener noreferrer">
                          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                            <path d="M10.5 14.5V5H7V1.5H1.5V14.5H10.5ZM1.5 0H8L12 4V14.5V16H10.5H1.5H0V14.5V1.5V0H1.5Z" fill="white" />
                          </svg>
                        </a>
                        <span className="overflow-hidden whitespace-nowrap text-white text-center max-w-[200px] text-ellipsis">
                          {doc.name}
                        </span>
                        <button
                          onClick={() => removeUploadedDocument(doc)}
                          className="bg-black text-white rounded-[5px] p-1 ml-4"
                        >
                          <svg width="14" height="14" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>
                        </button>
                      </div>
                    ))}
                    {docs.map((doc, index) => (
                      <div key={index} className="bg-[#323639] rounded-[10px] p-4 flex justify-center items-center min-w-[90px]">
                        <a href={doc} className="text-center cursor-pointer" target="_blank" rel="noopener noreferrer">
                          <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4">
                            <path d="M10.5 14.5V5H7V1.5H1.5V14.5H10.5ZM1.5 0H8L12 4V14.5V16H10.5H1.5H0V14.5V1.5V0H1.5Z" fill="white" />
                          </svg>
                        </a>
                        <span className="overflow-hidden whitespace-nowrap text-white text-center max-w-[200px] text-ellipsis">
                          {doc.name}
                        </span>
                        <button
                          onClick={() => removeSelectedDocumentFile(doc)}
                          className="bg-black text-white rounded-[5px] p-1 ml-4"
                        >
                          <svg width="14" height="14" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.79622 0.666687H2.99935H4.99935H5.18685L5.31185 0.838562L6.0306 1.91669H6.23372H6.99935H7.49935V2.66669H6.93685L6.49935 8.66669H1.49935L1.04622 2.66669H0.49935V1.91669H0.99935H1.74935H1.95247L2.68685 0.838562L2.79622 0.666687ZM2.85872 1.91669H5.12435L4.79622 1.41669H3.18685L2.85872 1.91669ZM1.79622 2.66669L2.18685 7.91669H5.79622L6.18685 2.66669H1.79622Z" fill="white" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
            }
          </div>

          <div />

          <Button variant="primary" size="small" className="mt-6" onClick={handleSubmit}>
            Update directory
          </Button>
        </div>
      </div>
    </section>
  )
}

export default EditDirectory