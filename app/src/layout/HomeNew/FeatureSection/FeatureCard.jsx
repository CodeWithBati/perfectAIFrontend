import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSelector } from "react-redux";
import { BookmarkIcon as FillBookMarkIcon } from "@heroicons/react/24/solid";

import Image from "next/image";
import StarRating from "@/app/src/components/StarRating";

import { useRouter } from "next/navigation";
import { toastText } from "@/constants/text-constants";


const FeatureCard = ({ directory, saved = false }) => {

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
            <div className="relative bg-[#323639] p-4 flex flex-col justify-between rounded-lg shadow-lg border border-[rgba(255,255,255,0.2)] mb-4 min-h-[250px]">

                {directory?.isFeatured && <div className="absolute top-2 right-0 flex items-center">
                    <div className="relative inline-block">
                        {/* Featured Text with Icon */}
                        <svg width="89" height="22" viewBox="0 0 89 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 0H89V22H0.5L7.5 11L0.5 0Z" fill="#8B60B2" />
                        </svg>

                        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full ml-1" style={{fontWeight: '400'}}>
                            
                            <FontAwesomeIcon icon={solidStar} color="white" height={10} width={12} />
                            <span className="text-white text-xs ml-1 tracking-wide">Featured</span>
                        </div>
                    </div>
                </div>}
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
                        <h3 className="text-lg font-semibold text-white ml-3 line-clamp-1 tracking-wide">{directory?.name}</h3>
                        <div className="flex items-center text-purple-400 ml-3">
                            <StarRating rating={directory?.averageRating} size="sm" />
                            <span className="text-[10px] text-white">({directory?.reviews})</span>
                        </div>
                    </div>
                </div>
                {/* Title and Rating */}


                {/* Description */}
                <p className="text-white text-sm mt-2 line-clamp-3 tracking-wide min-h-full">
                    {directory?.summary !== undefined && directory?.summary !== "" ? directory?.summary : directory?.description.replace(/<[^>]+>/g, "")} 
                </p>
                {/* Pricing Badge */}
                <div className="flex justify-between items-center mt-4 tracking-wide text-xs">
                    <span className="bg-[#4B4B4B] text-xs text-white px-[10px] py-[5px] rounded-md">{directory?.type}</span>
                </div>
                <div className="flex justify-between mt-4 space-x-2">
                    <button onClick={handleToggleSaved} className="text-white border border-[rgba(255,255,255,0.2)] bg-[#1E1E1E] p-2 rounded-md">
                        {directorySaveStatus || saved ?
                            <FillBookMarkIcon width={14} height={18} />
                            :
                            <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 8.58594L5.5625 8.91406L8.375 10.5547V1.625H1.625V10.5547L4.41406 8.91406L5 8.58594ZM1.625 11.8438L0.5 12.5V11.2109V1.625V0.5H1.625H8.375H9.5V1.625V11.2109V12.5L8.375 11.8438L5 9.875L1.625 11.8438Z" fill="white" />
                            </svg>}
                    </button>
                    <button onClick={() => window.open(directory?.website, '_blank')} className="text-white border border-[rgba(255,255,255,0.2)] p-2 bg-[#1E1E1E] rounded-md">
                        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.6875 0.5H11.4375H12V1.0625V4.8125V5.375H10.875V4.8125V2.42188L5.64844 7.64844L5.25 8.04688L4.45312 7.25L4.85156 6.85156L10.0781 1.625H7.6875H7.125V0.5H7.6875ZM0.5625 1.25H4.6875H5.25V2.375H4.6875H1.125V11.375H10.125V7.8125V7.25H11.25V7.8125V11.9375V12.5H10.6875H0.5625H0V11.9375V1.8125V1.25H0.5625Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default FeatureCard;


