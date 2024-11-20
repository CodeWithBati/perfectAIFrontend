import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Button from "../global/Button";
import toast from 'react-hot-toast'
import Link from 'next/link'
import { toastText } from "@/constants/text-constants";

const ChatLog = ({ historyLog }) => {
  const copyTextToClipboard = async (textToCopy) => {
    toast.error("Share link is currently unavailable");
    // if ("clipboard" in navigator) {
    //   try {
    //     await navigator.clipboard.writeText(textToCopy);
    //     toast.success(toastText.success.linkCopied);
    //   } catch (err) {
    //     console.error("Failed to copy: ", err);
    //   }
    // } else {
    //   console.error("Clipboard API not available.");
    // }
  };

  return (
    <div className="text-slate-700 dark:text-white border rounded-md p-4 pb-1 ">
      <Link href={`chat/${historyLog.id}`} className="text-slate-900 hover:text-blue-600 transition-all dark:text-gray-500">{historyLog.input}</Link>
      <div className=" my-2 flex justify-end">
        <Button
          className={"bg-blue-600 text-white hover:bg-blue-800 z-20"}
          onClick={() => copyTextToClipboard(historyLog.shareableLink)}
        >
          Share Link <FontAwesomeIcon icon={faCopy} />
        </Button>
      </div>
    </div>
  );
};

export default ChatLog;
