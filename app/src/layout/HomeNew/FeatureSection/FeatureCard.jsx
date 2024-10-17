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


const FeatureCard = ({ directory, saved=false }) => {

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

                {directory?.isFeatured && <div className="absolute top-2 right-0 flex items-center">
                    <div className="relative inline-block">
                        {/* Featured Text with Icon */}
                        <svg width="89" height="22" viewBox="0 0 89 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.5 0H89V22H0.5L7.5 11L0.5 0Z" fill="#8B60B2" />
                        </svg>

                        <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full ml-1">
                            <svg width="16" height="14" viewBox="0 0 34 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17 0L22.375 10.25L33.8125 12.25L25.75 20.5625L27.375 32L17 26.9375L6.5625 32L8.25 20.5625L0.125 12.25L11.5625 10.25L17 0Z" fill="white" />
                            </svg>

                            <span className="text-white text-xs font-semibold ml-1 tracking-wide">Featured</span>
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
                            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-outside-1_691_508" maskUnits="userSpaceOnUse" x="-1" y="-1" width="12" height="13" fill="black">
                                    <rect fill="white" x="-1" y="-1" width="12" height="13" />
                                    <path d="M5 0.25C5.70312 0.25 6.32812 0.660156 6.64062 1.26562C7.28516 1.05078 8.02734 1.20703 8.53516 1.71484C9.04297 2.22266 9.19922 2.96484 8.98438 3.60938C9.58984 3.92188 10 4.54688 10 5.25C10 5.97266 9.58984 6.59766 8.98438 6.91016C9.19922 7.55469 9.04297 8.27734 8.53516 8.78516C8.02734 9.29297 7.28516 9.44922 6.64062 9.25391C6.32812 9.85938 5.70312 10.25 5 10.25C4.27734 10.25 3.65234 9.85938 3.33984 9.25391C2.69531 9.44922 1.97266 9.29297 1.46484 8.78516C0.957031 8.27734 0.800781 7.55469 0.996094 6.91016C0.390625 6.59766 0 5.97266 0 5.25C0 4.54688 0.390625 3.92188 0.996094 3.60938C0.800781 2.96484 0.957031 2.22266 1.46484 1.71484C1.97266 1.20703 2.69531 1.05078 3.33984 1.26562C3.65234 0.660156 4.27734 0.25 5 0.25ZM6.89453 4.64453L7.22656 4.3125L6.5625 3.66797L6.23047 4L4.375 5.85547L3.61328 5.09375L3.28125 4.76172L2.61719 5.40625L2.94922 5.73828L4.04297 6.83203L4.375 7.16406L4.70703 6.83203L6.89453 4.64453Z" />
                                </mask>
                                <path d="M5 0.25C5.70312 0.25 6.32812 0.660156 6.64062 1.26562C7.28516 1.05078 8.02734 1.20703 8.53516 1.71484C9.04297 2.22266 9.19922 2.96484 8.98438 3.60938C9.58984 3.92188 10 4.54688 10 5.25C10 5.97266 9.58984 6.59766 8.98438 6.91016C9.19922 7.55469 9.04297 8.27734 8.53516 8.78516C8.02734 9.29297 7.28516 9.44922 6.64062 9.25391C6.32812 9.85938 5.70312 10.25 5 10.25C4.27734 10.25 3.65234 9.85938 3.33984 9.25391C2.69531 9.44922 1.97266 9.29297 1.46484 8.78516C0.957031 8.27734 0.800781 7.55469 0.996094 6.91016C0.390625 6.59766 0 5.97266 0 5.25C0 4.54688 0.390625 3.92188 0.996094 3.60938C0.800781 2.96484 0.957031 2.22266 1.46484 1.71484C1.97266 1.20703 2.69531 1.05078 3.33984 1.26562C3.65234 0.660156 4.27734 0.25 5 0.25ZM6.89453 4.64453L7.22656 4.3125L6.5625 3.66797L6.23047 4L4.375 5.85547L3.61328 5.09375L3.28125 4.76172L2.61719 5.40625L2.94922 5.73828L4.04297 6.83203L4.375 7.16406L4.70703 6.83203L6.89453 4.64453Z" fill="white" />
                                <path d="M6.64062 1.26562L5.752 1.72427L6.14466 2.48504L6.95685 2.21431L6.64062 1.26562ZM8.98438 3.60938L8.03569 3.29315L7.76496 4.10534L8.52573 4.498L8.98438 3.60938ZM8.98438 6.91016L8.52573 6.02154L7.76496 6.41419L8.03569 7.22638L8.98438 6.91016ZM6.64062 9.25391L6.93063 8.29688L6.13385 8.05543L5.752 8.79526L6.64062 9.25391ZM3.33984 9.25391L4.22846 8.79526L3.84662 8.05543L3.04984 8.29688L3.33984 9.25391ZM0.996094 6.91016L1.95312 7.20016L2.19457 6.40338L1.45474 6.02154L0.996094 6.91016ZM0.996094 3.60938L1.45474 4.498L2.19457 4.11615L1.95312 3.31937L0.996094 3.60938ZM3.33984 1.26562L3.02362 2.21431L3.83581 2.48504L4.22846 1.72427L3.33984 1.26562ZM7.22656 4.3125L7.93367 5.01961L8.65141 4.30187L7.92304 3.59492L7.22656 4.3125ZM6.5625 3.66797L7.25898 2.95039L6.55202 2.26423L5.85539 2.96086L6.5625 3.66797ZM4.375 5.85547L3.66789 6.56258L4.375 7.26968L5.08211 6.56258L4.375 5.85547ZM3.28125 4.76172L3.98836 4.05461L3.29173 3.35798L2.58477 4.04414L3.28125 4.76172ZM2.61719 5.40625L1.92071 4.68867L1.19234 5.39562L1.91008 6.11336L2.61719 5.40625ZM4.375 7.16406L3.66789 7.87117L4.375 8.57828L5.08211 7.87117L4.375 7.16406ZM5 1.25C5.30656 1.25 5.60058 1.43089 5.752 1.72427L7.52925 0.806982C7.05567 -0.110575 6.09969 -0.75 5 -0.75V1.25ZM6.95685 2.21431C7.25118 2.1162 7.5948 2.18871 7.82805 2.42195L9.24226 1.00774C8.45988 0.225357 7.31914 -0.0146382 6.3244 0.316942L6.95685 2.21431ZM7.82805 2.42195C8.06129 2.6552 8.1338 2.99882 8.03569 3.29315L9.93306 3.9256C10.2646 2.93086 10.0246 1.79012 9.24226 1.00774L7.82805 2.42195ZM8.52573 4.498C8.81911 4.64942 9 4.94344 9 5.25H11C11 4.15031 10.3606 3.19433 9.44302 2.72075L8.52573 4.498ZM9 5.25C9 5.58199 8.81364 5.87294 8.52573 6.02154L9.44302 7.79878C10.366 7.32238 11 6.36332 11 5.25H9ZM8.03569 7.22638C8.13216 7.5158 8.0649 7.8412 7.82805 8.07805L9.24226 9.49226C10.021 8.71349 10.2663 7.59358 9.93306 6.59393L8.03569 7.22638ZM7.82805 8.07805C7.59504 8.31106 7.24144 8.39107 6.93063 8.29688L6.35062 10.2109C7.32887 10.5074 8.45965 10.2749 9.24226 9.49226L7.82805 8.07805ZM5.752 8.79526C5.60962 9.07114 5.32572 9.25 5 9.25V11.25C6.08053 11.25 7.04663 10.6476 7.52925 9.71255L5.752 8.79526ZM5 9.25C4.64879 9.25 4.36812 9.06585 4.22846 8.79526L2.45122 9.71255C2.93657 10.6529 3.90589 11.25 5 11.25V9.25ZM3.04984 8.29688C2.74414 8.38952 2.4086 8.3147 2.17195 8.07805L0.757737 9.49226C1.53671 10.2712 2.64649 10.5089 3.62985 10.2109L3.04984 8.29688ZM2.17195 8.07805C1.9353 7.8414 1.86048 7.50586 1.95312 7.20016L0.0390693 6.62015C-0.258919 7.60351 -0.0212365 8.71329 0.757737 9.49226L2.17195 8.07805ZM1.45474 6.02154C1.18415 5.88188 1 5.60121 1 5.25H-1C-1 6.34411 -0.402903 7.31343 0.537451 7.79878L1.45474 6.02154ZM1 5.25C1 4.92428 1.17886 4.64038 1.45474 4.498L0.537451 2.72075C-0.397609 3.20337 -1 4.16947 -1 5.25H1ZM1.95312 3.31937C1.85893 3.00856 1.93894 2.65496 2.17195 2.42195L0.757737 1.00774C-0.0248735 1.79035 -0.257371 2.92113 0.0390693 3.89938L1.95312 3.31937ZM2.17195 2.42195C2.4088 2.1851 2.7342 2.11784 3.02362 2.21431L3.65607 0.316942C2.65642 -0.0162746 1.53651 0.228963 0.757737 1.00774L2.17195 2.42195ZM4.22846 1.72427C4.37706 1.43636 4.66801 1.25 5 1.25V-0.75C3.88668 -0.75 2.92762 -0.116044 2.45122 0.806982L4.22846 1.72427ZM7.60164 5.35164L7.93367 5.01961L6.51946 3.60539L6.18742 3.93742L7.60164 5.35164ZM7.92304 3.59492L7.25898 2.95039L5.86602 4.38555L6.53009 5.03008L7.92304 3.59492ZM5.85539 2.96086L5.52336 3.29289L6.93758 4.70711L7.26961 4.37508L5.85539 2.96086ZM5.52336 3.29289L3.66789 5.14836L5.08211 6.56258L6.93758 4.70711L5.52336 3.29289ZM5.08211 5.14836L4.32039 4.38664L2.90617 5.80086L3.66789 6.56258L5.08211 5.14836ZM4.32039 4.38664L3.98836 4.05461L2.57414 5.46883L2.90617 5.80086L4.32039 4.38664ZM2.58477 4.04414L1.92071 4.68867L3.31366 6.12383L3.97773 5.4793L2.58477 4.04414ZM1.91008 6.11336L2.24211 6.44539L3.65633 5.03117L3.32429 4.69914L1.91008 6.11336ZM2.24211 6.44539L3.33586 7.53914L4.75008 6.12492L3.65633 5.03117L2.24211 6.44539ZM3.33586 7.53914L3.66789 7.87117L5.08211 6.45696L4.75008 6.12492L3.33586 7.53914ZM5.08211 7.87117L5.41414 7.53914L3.99992 6.12492L3.66789 6.45696L5.08211 7.87117ZM5.41414 7.53914L7.60164 5.35164L6.18742 3.93742L3.99992 6.12492L5.41414 7.53914Z" fill="white" mask="url(#path-1-outside-1_691_508)" />
                                <path d="M5 0.25C5.70312 0.25 6.32812 0.660156 6.64062 1.26562C7.28516 1.05078 8.02734 1.20703 8.53516 1.71484C9.04297 2.22266 9.19922 2.96484 8.98438 3.60938C9.58984 3.92188 10 4.54688 10 5.25C10 5.97266 9.58984 6.59766 8.98438 6.91016C9.19922 7.55469 9.04297 8.27734 8.53516 8.78516C8.02734 9.29297 7.28516 9.44922 6.64062 9.25391C6.32812 9.85938 5.70312 10.25 5 10.25C4.27734 10.25 3.65234 9.85938 3.33984 9.25391C2.69531 9.44922 1.97266 9.29297 1.46484 8.78516C0.957031 8.27734 0.800781 7.55469 0.996094 6.91016C0.390625 6.59766 0 5.97266 0 5.25C0 4.54688 0.390625 3.92188 0.996094 3.60938C0.800781 2.96484 0.957031 2.22266 1.46484 1.71484C1.97266 1.20703 2.69531 1.05078 3.33984 1.26562C3.65234 0.660156 4.27734 0.25 5 0.25ZM6.89453 4.64453L7.22656 4.3125L6.5625 3.66797L6.23047 4L4.375 5.85547L3.61328 5.09375L3.28125 4.76172L2.61719 5.40625L2.94922 5.73828L4.04297 6.83203L4.375 7.16406L4.70703 6.83203L6.89453 4.64453Z" fill="#8B60B2" />
                            </svg>
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
                {/* Title and Rating */}


                {/* Description */}
                <p className="text-white text-sm mt-2 line-clamp-3 tracking-wide">
                    {directory?.summary}
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


