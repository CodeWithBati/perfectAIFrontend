import React from "react";
import Label from "../../form/Label";
import Input from "../../form/Input";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Button from "../../global/Button";
import Textarea from "../../form/Textarea";

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#fbf1a9",
};

const UpdateReviewModal = ({
  reviewFormData,
  handleInputChange,
  handleUpdateReview,
  setShowModal,
}) => {
  return (
    <>
      <div className="bg-black bg-opacity-30 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative my-6 mx-auto w-4/12 ">
          <div className="border-0 rounded-lg relative flex flex-col w-full  outline-none focus:outline-none">
            <div className="p-2 px-4 bg-white dark:bg-slate-950 my-2 mb-4 rounded-2xl">
              <Label htmlFor="directoryName" className="mb-2">
                Update Review
              </Label>
               <Textarea
                placeholder={"Add a Review"}
                id="addnewReview"
                rows="6"
                className=" rounded-md resize-none"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                value={reviewFormData.description}
              />
              <div className=" mt-2">
                <Rating
                  itemStyles={myStyles}
                  style={{ maxWidth: 150 }}
                  value={reviewFormData.stars}
                  onChange={(value) => handleInputChange("stars", value)}
                />
              </div>
              <div className=" flex justify-end gap-2">
                <Button
                  onClick={() => setShowModal(false)}
                  className="bg-red-600 text-white hover:bg-red-800 my-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handleUpdateReview(reviewFormData.reviewId)}
                  className="bg-blue-600 text-white hover:bg-blue-800 my-2"
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
    </>
  );
};

export default UpdateReviewModal;
