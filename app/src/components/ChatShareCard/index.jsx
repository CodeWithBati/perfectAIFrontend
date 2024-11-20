import toast from 'react-hot-toast'
import Link from 'next/link'
import { toastText } from "@/constants/text-constants";


const ChatShareCard = ({ chat }) => {
    const copyTextToClipboard = async (textToCopy) => {

        toast.error("Share link is currently unavailable");
        // if ("clipboard" in navigator) {
        //     try {
        //         await navigator.clipboard.writeText(textToCopy);
        //         toast.success(toastText.success.linkCopied);
        //     } catch (err) {
        //         console.error("Failed to copy: ", err);
        //     }
        // } else {
        //     console.error("Clipboard API not available.");
        // }
    };

    return (
        <Link href={`/chat/${chat?.id}`}>
            <div className="relative bg-[#323639] p-4 rounded-lg shadow-lg border border-[rgba(255,255,255,0.2)] cursor-pointer">
                <p className="text-white text-sm mt-2 line-clamp-6 min-h-[145px]">
                    {chat?.input}
                </p>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        copyTextToClipboard(chat?.shareableLink);
                    }}
                    className="bg-[#8B60B2] flex justify-center items-center text-base font-semibold text-white h-[38px] mt-[30px] rounded-[5px] px-[20px] py-[10px] hover:bg-[#763b9a] focus:outline-none focus:ring-2 focus:ring-[#8B60B2] z-[20]"
                >
                    <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-2"
                    >
                        <path
                            d="M16 0.5V11.5H5V0.5H16ZM2 5.5H4V7.5H2V14.5H9V12.5H11V14.5V16.5H9H2H0V14.5V7.5V5.5H2Z"
                            fill="white"
                        />
                    </svg>
                    Share Link
                </button>
            </div>
        </Link>

    );
};

export default ChatShareCard;


