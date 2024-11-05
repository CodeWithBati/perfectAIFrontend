import { useEffect, useState, useRef } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BookmarkIcon as FillBookMarkIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import StarRating from "@/app/src/components/StarRating";

import { useRouter } from "next/navigation";
import { toastText } from "@/constants/text-constants";


const MobileFeature = ({ directory, saved=false }) => {

    const { user, token } = useSelector((state) => state.auth);
    const router = useRouter();

    const [directorySaveStatus, setDirectorySaveStatus] = useState(directory?.hasSaved);
    const [directorySaves, setDirectorySaves] = useState(directory?.saves)


    const handleToggleSaved = async (event) => {
        event.stopPropagation();

        if (!user) {
            toast.error(toastText.error.savingWithoutLogin);
            router.push("/login");
            return;
        }


        const response = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/saves`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (response.status === 200) {
            setDirectorySaveStatus(!directorySaveStatus);
            if (directorySaveStatus) {
                setDirectorySaves(prevState => prevState - 1)
                toast.success("Save Successfully removed from your list");
            } else {
                setDirectorySaves(prevState => prevState + 1)
                toast.success("Save Successfully added to your list");
            }
        } else {
            toast.error(toastText.error.directoryNotSaved);
        }
    };


    return (
        <Link href={`/directories/${directory?.slug}`}>
            <div className="relative bg-[#323639] p-4 rounded-lg shadow-lg border border-[rgba(255,255,255,0.2)] mb-4">
                <div className="flex justify-start items-start">
                    <div className="text-white relative">
                        <Image
                            alt="GetGenie"
                            width={40}
                            height={40}
                            src={directory?.icon}
                            className="rounded-[6.56px]"
                        />
                        {directory?.isVerified && <div className="absolute bottom-[-5px] right-[-5px]">
                            <Image
                                alt="GetGenie"
                                width={16}
                                height={16}
                                src="/images/verified.png"
                                className="rounded-[6.56px]"
                            />
                        </div>}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-white ml-4 tracking-wide">{directory?.name}</h3>
                        <div className="flex items-center text-purple-400 ml-4">
                            <StarRating rating={directory?.averageRating} size="sm" />
                            <span className="text-[10px] text-white">({directory?.reviews})</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MobileFeature;


