"use client";
import React, { useEffect } from "react";
import Label from "../../form/Label";
import Input from "../../form/Input";
import Textarea from "../../form/Textarea";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Button from "../../global/Button";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toastText } from "@/constants/text-constants";

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "gray",
};

const AddNewReviewModal = ({
  reviewFormData,
  handleInputChange,
  handleCreateNewReview,
  setShowModal,
}) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (!user && !isAuthenticated) {
      toast.error(toastText.error.loginFirst);
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  return (
    <>
      {isAuthenticated && (
        <div className="bg-black bg-opacity-30 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative my-6 mx-auto md:w-6/12 ">
            <div className="border-0 rounded-lg relative flex flex-col w-full  outline-none focus:outline-none">
              <div className=" relative p-2 px-4 bg-white dark:bg-slate-950 my-2 mb-4 rounded-2xl">
                <Button
                  onClick={() => setShowModal(false)}
                  className="absolute top-0 right-0 text-black my-2 text-4xl dark:text-white"
                >
                  <XMarkIcon className=" h-6" />
                </Button>
                <h1 className="font-semibold dark:text-slate-100">
                  Write your Review
                </h1>
                <Label htmlFor="directoryName" className="">
                  Your review help others learn about great AI tools.
                </Label>
                <div className=" my-2">
                  <Rating
                    itemStyles={myStyles}
                    style={{ maxWidth: 150 }}
                    value={reviewFormData.stars}
                    onChange={(value) => handleInputChange("stars", value)}
                  />
                </div>
                <Textarea
                  placeholder={"Write your review here..."}
                  id="addnewReview"
                  rows="6"
                  className=" rounded-md resize-none"
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  value={reviewFormData.description}
                />
                <p className=" text-sm my-3 dark:text-white ">
                  Review Should be More than 10 characters.
                </p>

                <div className=" w-full">
                  <Button
                    onClick={handleCreateNewReview}
                    className="bg-blue-600 text-white hover:bg-blue-800 my-2 block w-full"
                  >
                    Post Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddNewReviewModal;
