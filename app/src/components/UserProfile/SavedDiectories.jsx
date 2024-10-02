import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import DirectoresCard from "../../layout/Home/Directories/DirectoresCard";
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { truncateWithEllipsis } from "@/lib/form";
import Spinner from "@/app/src/ui/Spinner";
import { useRouter } from "next/navigation";

const SavedDiectories = () => {
  const { token } = useSelector((state) => state.auth);
  const [savedDirectories, setSavedDirectories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/saves`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setSavedDirectories(response.data.results);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const sentToDirectoryView = (dirSlug) => {
    router.push(`/directories/${dirSlug}`);
  };

  return (
    <div className=" p-4">
      {loading ? (
        <div className="my-20 flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedDirectories.map((dirObj, index) => {
            const dir = dirObj.directory;

            return (
              <div
                key={index}
                onClick={()=>sentToDirectoryView(dir.slug)}
                className=" cursor-pointer"
              >
                <div className=" w-full overflow-hidden border border-gray-100 dark:border-slate-600 rounded-lg h-full p-4 shadow-lg flex justify-between flex-col dark:bg-slate-950">
                  <div>
                    <div className=" mb-3">
                      <div className=" flex justify-between">
                        <div className=" flex flex-row gap-4 w-full">
                          <div>
                            <div className="w-16 h-16 flex justify-center items-center border border-gray-300 dark:border-gray-800 rounded-lg relative">
                              <Image
                                width={100}
                                height={100}
                                alt="Directory Icon"
                                src={dir.icon}
                                className=" p-2"
                              />
                              <svg
                                className={`absolute -right-2 -top-2 ${
                                  dir.isVerified ? "" : "invisible"
                                }`}
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M16.6453 7.03281C16.3508 6.725 16.0461 6.40781 15.9312 6.12891C15.825 5.87344 15.8187 5.45 15.8125 5.03984C15.8008 4.27734 15.7883 3.41328 15.1875 2.8125C14.5867 2.21172 13.7227 2.19922 12.9602 2.1875C12.55 2.18125 12.1266 2.175 11.8711 2.06875C11.593 1.95391 11.275 1.64922 10.9672 1.35469C10.4281 0.836719 9.81563 0.25 9 0.25C8.18437 0.25 7.57266 0.836719 7.03281 1.35469C6.725 1.64922 6.40781 1.95391 6.12891 2.06875C5.875 2.175 5.45 2.18125 5.03984 2.1875C4.27734 2.19922 3.41328 2.21172 2.8125 2.8125C2.21172 3.41328 2.20312 4.27734 2.1875 5.03984C2.18125 5.45 2.175 5.87344 2.06875 6.12891C1.95391 6.40703 1.64922 6.725 1.35469 7.03281C0.836719 7.57188 0.25 8.18437 0.25 9C0.25 9.81563 0.836719 10.4273 1.35469 10.9672C1.64922 11.275 1.95391 11.5922 2.06875 11.8711C2.175 12.1266 2.18125 12.55 2.1875 12.9602C2.19922 13.7227 2.21172 14.5867 2.8125 15.1875C3.41328 15.7883 4.27734 15.8008 5.03984 15.8125C5.45 15.8187 5.87344 15.825 6.12891 15.9312C6.40703 16.0461 6.725 16.3508 7.03281 16.6453C7.57188 17.1633 8.18437 17.75 9 17.75C9.81563 17.75 10.4273 17.1633 10.9672 16.6453C11.275 16.3508 11.5922 16.0461 11.8711 15.9312C12.1266 15.825 12.55 15.8187 12.9602 15.8125C13.7227 15.8008 14.5867 15.7883 15.1875 15.1875C15.7883 14.5867 15.8008 13.7227 15.8125 12.9602C15.8187 12.55 15.825 12.1266 15.9312 11.8711C16.0461 11.593 16.3508 11.275 16.6453 10.9672C17.1633 10.4281 17.75 9.81563 17.75 9C17.75 8.18437 17.1633 7.57266 16.6453 7.03281ZM12.5672 7.56719L8.19219 11.9422C8.13414 12.0003 8.06521 12.0464 7.98934 12.0779C7.91346 12.1093 7.83213 12.1255 7.75 12.1255C7.66787 12.1255 7.58654 12.1093 7.51066 12.0779C7.43479 12.0464 7.36586 12.0003 7.30781 11.9422L5.43281 10.0672C5.31554 9.94991 5.24965 9.79085 5.24965 9.625C5.24965 9.45915 5.31554 9.30009 5.43281 9.18281C5.55009 9.06554 5.70915 8.99965 5.875 8.99965C6.04085 8.99965 6.19991 9.06554 6.31719 9.18281L7.75 10.6164L11.6828 6.68281C11.7409 6.62474 11.8098 6.57868 11.8857 6.54725C11.9616 6.51583 12.0429 6.49965 12.125 6.49965C12.2071 6.49965 12.2884 6.51583 12.3643 6.54725C12.4402 6.57868 12.5091 6.62474 12.5672 6.68281C12.6253 6.74088 12.6713 6.80982 12.7027 6.88569C12.7342 6.96156 12.7503 7.04288 12.7503 7.125C12.7503 7.20712 12.7342 7.28844 12.7027 7.36431C12.6713 7.44018 12.6253 7.50912 12.5672 7.56719Z"
                                  fill="#49ADFF"
                                ></path>
                              </svg>
                            </div>
                          </div>
                          <div className=" flex flex-row justify-between w-full">
                            <p className=" font-semibold mt-3 text-xl dark:text-white ">
                              {dir.name}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {dir.type && (
                      <div className=" bg-custom-blue-light text-white inline dark:bg-custom-blue-dark px-4 py-1 rounded-md text-sm dark:text-white">
                        {dir.type}
                      </div>
                    )}
                    <div className=" mt-4">
                      <p className=" text-slate-600 dark:text-slate-300">
                        {truncateWithEllipsis(
                          dir.summary ||
                            dir?.description?.replace(/<[^>]+>/g, ""),
                          200
                        )}
                      </p>
                    </div>
                    <div className=" text-blue-400 flex flex-wrap gap-4 my-3 font-medium flex-row"></div>
                  </div>
                  <div className=" flex flex-row justify-between">
                    <div
                      className={`flex items-center gap-2 text-base text-[#6b7280] dark:text-slate-200 ${
                        dir.isFeatured ? "" : "invisible"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-star"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>{" "}
                      Featured
                    </div>
                    <div className=" flex justify-end">
                      <Link
                        href={dir.website ?? "#"}
                        target="_blank"
                        className="justify-center text-sm font-medium disabled:pointer-events-none text-ice-500 hover:bg-custom-blue-light dark:hover:bg-custom-blue-dark hover:text-white h-10 px-4 py-2 flex items-center gap-2 rounded-lg border border-custom-blue-light dark:border-custom-blue-dark transform duration-200"
                      >
                        <span className="text-lg font-normal dark:text-slate-100 ">
                          Visit
                        </span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="3"
                          height="3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 dark:text-slate-100"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" x2="21" y1="14" y2="3"></line>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedDiectories;
