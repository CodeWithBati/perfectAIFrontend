import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import Typewriter from "typewriter-effect";

import Section from "@/app/src/components/global/Section";
import InstructionsStepper from "./InstructionsStepper";
import Directories from "../Directories/Directories";
import Spinner from "@/app/src/ui/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { useSelector } from "react-redux";
import useAutosizeTextArea from "@/app/src/customHooks/useAutoSizeTextArea";
import Image from "next/image";

import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../../provider";
import { toastText } from "@/constants/text-constants";

const TypeWriterSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const [input, setInput] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(false);

  const textAreaRef = useRef(null);
  useAutosizeTextArea(textAreaRef.current, input);

  const handleChange = (evt) => {
    const val = evt.target?.value;

    setInput(val);
  };

  const handleSearchChatbot = async () => {
    if (!user) {
      toast.error(toastText.error.loginFirst);
      return;
    }

    setSpinner(true);

    const formData = {
      input: input,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        router.push(`/chat/${response.data.id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  return (
    <Section className="w-full min-h-screen mt-3 pt-16 md:pt-20 lg:pt-24 bg-white dark:bg-slate-900 overflow-hidden">
      <div className="flex flex-col justify-center items-center container-fluid px-6 md:px-12 lg:px-24">
        <div className="w-full flex justify-center items-center flex-wrap -m-6">
          <div className=" w-full md:w-10/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12">
            <div className="text-center">
              <h1 className="text-3xl/snug sm:text-4xl/snug lg:text-5xl/tight font-bold text-slate-700 dark:text-slate-400 pb-4">
                Unlock the Power of AI
                <div className="bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark bg-clip-text text-transparent">
                  <Typewriter
                    options={{
                      strings: [
                        "To Increase Productivity",
                        "To Save Time",
                        "To Make Money",
                        "To Automate Tasks",
                        " To Learn",
                        "To Reduce Workload",
                        "To Make Decisions",
                        "To Analyse Data",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </div>
              </h1>
              <p className="text-base/7 text-slate-600 dark:text-slate-400">
                Don&apos;t know which AI tool to use for your task? MyPerfectAI
                recommends the best AI tools for your task, by giving
                step-by-step, personalized instructions
              </p>
              <div className="pt-6 flex flex-col justify-center items-center gap-5">
                {spinner ? (
                  <Spinner />
                ) : (
                  <>
                    <div className="relative w-full max-w-xl">
                      <textarea
                        id="chatInput"
                        ref={textAreaRef}
                        className=" h-12 overflow-y-hidden text-black dark:text-white bg-transparent pr-20 w-full border border-gray-300 rounded-xl resize-none focus:ring-blue-500 focus:border-blue-500 p-3"
                        placeholder="Describe your task..."
                        onChange={handleChange}
                        value={input}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSearchChatbot();
                          }
                        }}
                      ></textarea>
                      <button
                        onClick={handleSearchChatbot}
                        className="absolute right-2 bottom-[14px] w-8 h-8 transform duration-150 rounded-lg bg-custom-blue-light dark:bg-custom-blue-dark  text-white"
                      >
                        <FontAwesomeIcon icon={faArrowUp} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="p-6 w-full flex justify-center items-center my-14">
            <InstructionsStepper />
          </div>
        </div>
        <div className=" flex justify-center flex-col items-center">
          <div className=" mb-3 flex flex-row gap-3 justify-center items-end text-2xl md:text-4xl dark:text-custom-blue-dark text-custom-blue-light">
            <span className="text-4xl flex items-end md:text-6xl font-bold bg-gradient-to-r to-custom-blue-light from-custom-purple-light dark:to-custom-blue-dark dark:from-custom-purple-dark bg-clip-text text-transparent mt-[1]">
              MyPerfectAI{" "}
            </span>
            <span className="md:mb-[2px]">Directory{" "}</span>
          </div>
          
          <p className="dark:text-custom-blue-dark text-custom-blue-light text-xl md:text-3xl">
            Discover the best AI tools
          </p>
        </div>

        <div className=" my-5 w-full">
          <Directories />
        </div>
      </div>
      <div className="absolute h-[1px] w-full bottom-0 start-0 bg-gradient-to-r from-transparent from-10% via-blue-100 to-transparent to-90% animate-[animateGradient_5s_ease-in-out_2]"></div>
    </Section>
  );
};

export default TypeWriterSection;
