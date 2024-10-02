import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPen } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/Button";
import { useAppSelector } from "@/lib/hooks";
import Spinner from "../../ui/Spinner";
import axios from "axios";
import { useAppDispatch } from "@/lib/hooks";
import { updateProfileImage } from "@/lib/features/auth/authSlice";
import toast from "react-hot-toast";
import UserChatsLog from "./UserChatsLog";

const Overview = ({ setSelectedIndex }) => {
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.profile);

  const handleImageChange = (e) => {
    console.log("finction called");
    const file = e.target.files[0];
    handleUpload(file);
  };

  const handleUpload = async (selectedImage) => {
    if (selectedImage) {
      setSpinner(true);
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        dispatch(updateProfileImage({ profile: response.data.profile }));
        setImageUrl(response.data.profile);
        toast.success("Image Uploaded Succesfully");
      }
      setSpinner(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap">
        <div className="relative md:hidden w-36 xs:w-28 sm:w-40 flex-shrink-0 mb-3">
          {spinner ? (
            <div className=" h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="relative inline-flex flex-shrink-0 w-full rounded-lg overflow-hidden">
                {user && user.profile ? (
                  <Image src={user.profile} alt="" height={200} width={400} />
                ) : (
                  <Image
                    src="/images/avatar.svg"
                    alt=""
                    height={200}
                    width={400}
                  />
                )}
              </div>
              <div className=" absolute top-1 right-1">
                <label
                  className=" cursor-pointer flex items-center justify-center min-w-7 min-h-7 bg-white border dark:text-slate-200 border-blue-500 rounded-full text-blue-600 dark:bg-slate-950 font-bold"
                  onChange={handleImageChange}
                  htmlFor="mobileImageUpload"
                >
                  <input
                    name=""
                    type="file"
                    accept="image/*"
                    id="mobileImageUpload"
                    hidden
                  />
                  <FontAwesomeIcon className=" text-sm" icon={faPen} />
                </label>
              </div>
            </>
          )}
        </div>
        <div className="w-full xs:w-[calc(100%-theme(space.36))] sm:w-[calc(100%-theme(space.48))] md:w-full xs:ms-6 sm:ms-8 md:ms-0">
          <div className="flex flex-wrap justify-between items-center mb-2 gap-x-3 gap-y-2">
            <h2 className="text-lg font-bold text-slate-700 dark:text-white">
              Personal Info
            </h2>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setSelectedIndex(1);
              }}
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-800"
            >
              <FontAwesomeIcon icon={faPencil} />
              <span>
                Edit <span className="hidden sm:inline-block">Profile</span>
              </span>
            </Button>
          </div>
          <div className="flex flex-col justify-between md:flex-row">
            <div className="">
              <div className="py-2">
                <h6 className="text-base font-bold text-slate-600 dark:text-slate-200">
                  First Name
                </h6>
                <p className="text-sm  text-slate-500 dark:text-slate-400">
                  {user?.firstName}
                </p>
              </div>
            </div>
            <div className="">
              <div className="py-2">
                <h6 className="text-base font-bold text-slate-600 dark:text-slate-200">
                  Last Name
                </h6>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.lastName}
                </p>
              </div>
            </div>
            <div className="">
              <div className="py-2">
                <h6 className="text-base font-bold text-slate-600 dark:text-slate-200">
                  Email
                </h6>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
