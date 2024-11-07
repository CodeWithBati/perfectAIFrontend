"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  faGear,
  faUser,
  faList,
  faSave,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Overview from "./Overview";
import Settings from "./Settings";
import { useSelector } from "react-redux";
import axios from "axios";
import { updateProfileImage } from "@/lib/features/auth/authSlice";
import { useAppDispatch } from "@/lib/hooks";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import UserChatsLog from "./UserChatsLog";
import SavedDiectories from "./SavedDiectories";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user, token } = useSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.profile);

  useEffect(() => {
    if (typeof window !== undefined && user) {
      document.title = `MyPerfectAI - ${user.firstName} ${user.lastName}`;
    }
  }, [user]);

  useEffect(() => {
    setImageUrl(user?.profile);
  }, [user?.profile]);

  useEffect(() => {
    const tabMap = ["overview", "settings", "chats", "saved"];
    const queryTab = searchParams.get("tab");

    if (queryTab && tabMap.includes(queryTab)) {
      setSelectedIndex(tabMap.indexOf(queryTab));
    }
  }, [searchParams]);

  useEffect(() => {
    const tabMap = ["overview", "settings", "chats", "saved"];
    const tabName = tabMap[selectedIndex];
    const newParams = new URLSearchParams(searchParams);
    newParams.set("tab", tabName);
    router.replace(`?${newParams.toString()}`, undefined, { shallow: true });
  }, [selectedIndex, searchParams, router]);

  const handleImageChange = (e) => {
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
    <>
      <div className="flex">
        <div className="relative hidden md:block sm:w-28 md:w-38 lg:w-72 lg:h-72 flex-shrink-0">
          {spinner ? (
            <div className="h-full flex justify-center items-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="relative inline-flex flex-shrink-0 w-full rounded-lg overflow-hidden">
                {user && user.profile ? (
                  <Image src={imageUrl} alt="" height={200} width={400} />
                ) : (
                  <Image
                    src="/images/avatar.svg"
                    alt=""
                    height={200}
                    width={400}
                  />
                )}
              </div>
              <div className="absolute top-3 right-1">
                <label
                  className="cursor-pointer flex items-center justify-center min-w-10 min-h-10 bg-white border border-blue-500 rounded-full text-blue-600 font-bold"
                  onChange={handleImageChange}
                  htmlFor="formId"
                >
                  <input
                    name=""
                    type="file"
                    accept="image/*"
                    id="formId"
                    hidden
                  />
                  <FontAwesomeIcon icon={faPen} />
                </label>
              </div>
            </>
          )}
        </div>
        <div className="flex-grow-1 w-full md:ms-6 lg:ms-8">
          <h2 className="text-xl font-bold text-slate-700 dark:text-white mb-4 mt-2">
            My Profile
          </h2>
          <div className="bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 w-full">
            <Tab.Group
              selectedIndex={selectedIndex}
              onChange={setSelectedIndex}
            >
              <Tab.List className="flex flex-wrap px-3 border-b border-slate-200 dark:border-slate-800">
                <Tab className="flex items-center mx-3 py-3 text-sm text-slate-600 dark:text-slate-200 font-medium ui-selected:text-blue-600 ui-selected:dark:text-blue-600 -mb-[1px] border-b-2 border-b-transparent ui-selected:border-blue-600 focus-visible:outline-none">
                  <FontAwesomeIcon icon={faUser} />
                  <span className="block ms-2">Overview</span>
                </Tab>
                <Tab className="flex items-center mx-3 py-3 text-sm text-slate-600 dark:text-slate-200 font-medium ui-selected:text-blue-600 ui-selected:dark:text-blue-600 -mb-[1px] border-b-2 border-b-transparent ui-selected:border-blue-600 focus-visible:outline-none">
                  <FontAwesomeIcon icon={faGear} />
                  <span className="block ms-2">Settings</span>
                </Tab>
                <Tab className="flex items-center mx-3 py-3 text-sm text-slate-600 dark:text-slate-200 font-medium ui-selected:text-blue-600 ui-selected:dark:text-blue-600 -mb-[1px] border-b-2 border-b-transparent ui-selected:border-blue-600 focus-visible:outline-none">
                  <FontAwesomeIcon icon={faList} />
                  <span className="block ms-2">History</span>
                </Tab>
                <Tab className="flex items-center mx-3 py-3 text-sm text-slate-600 dark:text-slate-200 font-medium ui-selected:text-blue-600 ui-selected:dark:text-blue-600 -mb-[1px] border-b-2 border-b-transparent ui-selected:border-blue-600 focus-visible:outline-none">
                  <FontAwesomeIcon icon={faSave} />
                  <span className="block ms-2">Saved</span>
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <Overview setSelectedIndex={setSelectedIndex} />
                </Tab.Panel>
                <Tab.Panel>
                  <Settings />
                </Tab.Panel>
                <Tab.Panel>
                  <UserChatsLog />
                </Tab.Panel>
                <Tab.Panel>
                  <div className="max-h-[700px] overflow-y-auto">
                    <SavedDiectories />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
