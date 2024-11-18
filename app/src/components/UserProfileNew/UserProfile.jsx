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
import Header from "../../layout/Header/HeaderNew";
import Footer from "../../layout/FooterNew";

const UserProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { user, token } = useSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.profile);
  const [activeTab, setActiveTab] = useState('Overview');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (typeof window !== undefined && user) {
      document.title = `MyPerfectAI - ${user.firstName} ${user.lastName}`;
    }
  }, [user]);

  useEffect(() => {
    setImageUrl(user?.profile);
  }, [user?.profile]);


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
      <section className="relative flex flex-col items-center justify-start min-w-screen min-h-[500px] pt-16 lg:pt-32 text-white bg-no-repeat bg-[#181C1F] bg-cover lg:bg-cover bg-[url('/images/mobileAllBg.png')] lg:bg-[url('/images/allPageBg.png')]">
        <div className="pb-16 min-h-screen text-white w-full"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, transparent 0px, transparent 700px, #181C1F 500px, #181C1F 100%)',
          }}>
          <h1 className="text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8 text-center">Profile</h1>

          <div className="flex flex-col justify-center items-center px-[30px] w-full lg:px-[135px]">

            {/* Tabs Section */}
            <div className="flex justify-center items-center gap-[10px] w-full lg:w-auto">
              <div className="flex justify-center items-center border border-[rgba(255,255,255,0.2)] mb-8 bg-[#1E1E1E] rounded-md p-2">
                <button
                  className={`px-[10px] py-[5px] ${activeTab === 'Overview' ? 'bg-[#8B60B2] text-xs font-bold text-white' : 'bg-transparent text-white text-xs hover:bg-gray-700'} rounded-md mx-2`}
                  onClick={() => handleTabChange('Overview')}
                >
                  Overview
                </button>
                <button
                  className={`px-[10px] py-[5px] ${activeTab === 'Settings' ? 'bg-[#8B60B2] text-xs font-bold text-white' : 'bg-transparent text-white text-xs hover:bg-gray-700'} rounded-md mx-2`}
                  onClick={() => handleTabChange('Settings')}
                >
                  Settings
                </button>
                <button
                  className={`px-[10px] py-[5px] ${activeTab === 'Chats' ? 'bg-[#8B60B2] text-xs font-bold text-white' : 'bg-transparent text-white text-xs hover:bg-gray-700'} rounded-md mx-2`}
                  onClick={() => handleTabChange('Chats')}
                >
                  History
                </button>
                <button
                  className={`px-[10px] py-[5px] ${activeTab === 'Saved' ? 'bg-[#8B60B2] text-xs font-bold text-white' : 'bg-transparent text-white text-xs hover:bg-gray-700'} rounded-md mx-2`}
                  onClick={() => handleTabChange('Saved')}
                >
                  Saved
                </button>
              </div>
            </div>

            {activeTab === 'Overview' && <Overview user={user} token={token} imageUrl={imageUrl} handleImageChange={handleImageChange} spinner={spinner} setSpinner={setSpinner} />}
            {activeTab === 'Settings' && <Settings user={user} token={token} imageUrl={imageUrl} handleImageChange={handleImageChange} spinner={spinner} setSpinner={setSpinner} />}
            {activeTab === 'Saved' && <SavedDiectories user={user} token={token} imageUrl={imageUrl} handleImageChange={handleImageChange} spinner={spinner} setSpinner={setSpinner} />}
            {activeTab === 'Chats' && <UserChatsLog user={user} token={token} imageUrl={imageUrl} handleImageChange={handleImageChange} spinner={spinner} setSpinner={setSpinner} />}
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
