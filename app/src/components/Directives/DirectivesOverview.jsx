"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DirectoryView from "@/app/src/components/Directories/DirectoryView";
import toast from "react-hot-toast";
import DirectoryReviews from "@/app/src/components/Directories/DirectoryReviews";
import { useSelector } from "react-redux";
import AlternativeDirectories from "@/app/src/components/Directories/AlternativeDirectories";
import { useRouter } from "next/navigation";
import withDynamicFavicon from "@/app/src/hoc/withDynamicFavicon";
import Spinner from "@/app/src/ui/Spinner";

const Directory = () => {
  const [directory, setDirectory] = useState({});
  const { token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      try {
        const parts = window.location.pathname.split("/");
        const directoryName = parts[parts.length - 1];

        let headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/${directoryName}`,
          { headers }
        );

        if (response.status === 404) {
          console.log("Yooo!!");
        }

        if (response.status === 200) {
          setDirectory(response.data);
        } else {
          toast.error("Error fetching the record");
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 404) {
          router.push("/directoryNotFound");
        }
      }
    };

    getData();
  }, [token, router]);

  return (
    <div className=" w-full ">
      {Object.keys(directory).length === 0 ? <div className="p-5 md:p-25 lg:p-50 2xl:container mt-20 md:mt-40 flex justify-center items-center">
        <Spinner />
      </div> :(
        <div className="p-5 md:p-25 lg:p-50 2xl:container">
          <DirectoryView dir={directory} />
          <DirectoryReviews directory={directory} />
          <AlternativeDirectories category={directory.category} currentDirectory={directory} />
        </div>
      )}
    </div>
  );
};

export default withDynamicFavicon(Directory);
