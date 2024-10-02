"use client";
import { useEffect, useState, useRef } from "react";
import Section from "@/app/src/components/global/Section";

import VerticalStepper from "@/app/src/components/ChatBot/VerticalStepper";
import axios from "axios";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import Button from "@/app/src/components/global/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedSideBar from "@/app/src/components/Directories/FeaturedSideBar/FeaturedSideBar";
import withDynamicFavicon from "@/app/src/hoc/withDynamicFavicon";
import Image from "next/image";
import { useTheme } from "@/app/src/layout/provider";
import Spinner from "@/app/src/ui/Spinner";
import Head from "next/head";
import { toastText } from "@/constants/text-constants";

const ChatOverview = ({ ChatKey }) => {
  const textAreaRef = useRef(null);
  const theme = useTheme();

  const [chatData, setChatData] = useState([]);
  const [input, setInput] = useState("");
  const [shareableLink, setShareableLink] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "inherit"; // Reset height to calculate the scroll height correctly
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      toast.error(toastText.error.loginFirst);
    }
  }, [user, router]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/chat/${ChatKey}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setChatData(response.data.outputs);
          setInput(response.data.input);
          setShareableLink(response.data.shareableLink);
        } else {
          console.log("error fetching the record");
        }
      } catch (error) {
        if (error.response.status === 404 || error.response.status === 400) {
          router.push("/chatNotFound");
        }
        console.log("error->", error);
      }
    })();
  }, [ChatKey, token, router]);

  const copyTextToClipboard = async (textToCopy) => {
    if ("clipboard" in navigator) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        toast.success(toastText.success.linkCopied);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      console.error("Clipboard API not available.");
    }
  };

  return chatData.length === 0 ? (
    <div className="mt-20 md:mt-40">
      <Spinner />
    </div>
  ) : (
    <>
      <Head>
        <title>MyPerfectAI - AI Tool Recommendations</title>
      </Head>
      <div className="container">
        <div className="grid lg:grid-cols-4 md:grid-cols-3">
          <div className="col-span-3">
            <div className="flex flex-col flex-wrap items-center ">
              <div className="flex flex-col">
                <Section>
                  <div className=" pt-20 p-2 flex flex-col">
                    <div className=" flex md:flex-row flex-col justify-between items-center mb-4">
                      <div className=" flex flex-row items-center">
                        <h1 className=" relative text-custom-blue-light dark:text-custom-blue-dark text-xl ">
                          <span className="text-2xl md:text-4xl font-bold bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark bg-clip-text text-transparent">
                            MyPerfectAI{" "}
                          </span>
                          recommendations for your task
                        </h1>
                      </div>
                      <div className=" my-2 flex justify-end">
                        <Button
                          className={
                            "bg-blue-600 text-white hover:bg-blue-800 "
                          }
                          onClick={() => copyTextToClipboard(shareableLink)}
                        >
                          Share Link <FontAwesomeIcon icon={faCopy} />
                        </Button>
                      </div>
                    </div>
                    <textarea
                      id="chatInput"
                      rows={1}
                      className="w-full h-full sm:w-[500px] md:w-[800px] border border-gray-300 rounded-lg resize-none bg-transparent dark:text-white"
                      disabled
                      ref={textAreaRef}
                      value={input}
                      style={{ overflowY: "hidden" }}
                    >
                      {input}
                    </textarea>
                  </div>
                </Section>
                <Section>
                  <div className="flex flex-col items-center">
                    <div className="h-full p-2 relative">
                      {chatData.map((rec, index) => (
                        <VerticalStepper key={index} data={rec} />
                      ))}
                    </div>
                  </div>
                </Section>
              </div>
            </div>
          </div>
          <div className=" lg:mt-10 px-5 md:px-0 col-span-3 lg:col-span-1">
            <FeaturedSideBar />
          </div>
        </div>
        <div className="text-center text-lg md:text-2xl text-black dark:text-white my-5 mt-10">
          <div className=" mb-3 flex flex-row gap-4 justify-center items-end">
            Thanks for using{" "}
            <span className="text-2xl flex items-end md:text-4xl font-bold bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark bg-clip-text text-transparent">
              MyPerfectAI{" "}
            </span>
          </div>
          <p className=" w-10/12 mx-auto">
            We hope our chatbot has made accurate and helpful AI tool
            recommendations to help you complete your task. If you would like to
            leave feedback, please contact usersupport@myperfectai.app
          </p>
        </div>
      </div>
    </>
  );
};

export default withDynamicFavicon(ChatOverview);
