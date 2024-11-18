"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import Section from "../global/Section";
import withDynamicFavicon from "../../hoc/withDynamicFavicon";
import CreateDirectoryForm from "../Dashboard/AdminDirectories/CreateDirectoryForm";
import { useEffect } from "react";
import axios from "axios";
import EditDirectoryForm from "../Dashboard/AdminDirectories/EditDirectoryForm";
import Spinner from "../../ui/Spinner";
import DisabledForm from "./DisabledFormNew";
import CreateDirectory from "../CreateDirectory/CreateDirectory";
import EditDirectory from "../EditDirectory/EditDirectory";
import { useSearchParams } from 'next/navigation';

const DirectoryManagerMainPageView = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [userDirectory, setUserDirectory] = useState({});
  const [isNew, setIsNew] = useState(true);
  const [spinner, setSpinner] = useState(true);

  const [isActive, setIsActive] = useState(false);

  const searchParams = useSearchParams();
  const type = searchParams.get('type'); 

  useEffect(() => {
    (async () => {
      setSpinner(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setIsNew(false);
          setIsActive(response.data.isActive);
          setUserDirectory(response.data);
        } else {
          console.error(response);
        }
      } catch (error) {
        console.log("erroor--->", error);
        setIsNew(true);
      } finally {
        setSpinner(false);
      }
    })();
  }, [token, isActive, isNew]);

  return (
    <>
      {user?.role === "creator" ? (
        <div className="flex bg-[#181C1F] bg-no-repeat lg:bg-center lg:bg-cover bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">
          <div className="flex flex-col min-h-screen flex-grow overflow-x-hidden max-w-full">
            <main>
              {spinner ? (
                <div className=" w-full h-screen flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <Section>
                  {!isActive && !isNew && userDirectory.slug && (
                    <>
                      <div className=" text-black dark:text-white bg-red-300 dark:bg-red-500 rounded-md w-full text-lg text-center ">
                        Your directory is not active yet. Wait for the admin to
                        approve it.
                      </div>
                      <DisabledForm
                        direcotorySlug={userDirectory.slug}
                        setIsNew={setIsNew}
                        setUserDirectory={setUserDirectory}
                      />
                    </>
                  )}

                  {isNew && Object.keys(userDirectory).length === 0 && (
                    <CreateDirectory
                      title="Create New Directory Listing"
                      url="/directories/request"
                      type="directoryRequest"
                      setIsNew={setIsNew}
                      setIsActive={setIsActive}
                      planType={type}
                    />
                  )}

                  {isActive && !isNew && Object.keys(userDirectory).length !== 0 && (
                    <EditDirectory
                      directorySlug={userDirectory.slug}
                      url={`/directories/${userDirectory.id}/request`}
                      pricingUrl={`/directories/${userDirectory.id}/pricings/:pricing/request`}
                      title="Update Directory Listing"
                      type="directoryRequest"
                      setIsNew={setIsNew}
                      setUserDirectory={setUserDirectory}
                    />
                  )}
                </Section>
              )}
            </main>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default withDynamicFavicon(DirectoryManagerMainPageView);
