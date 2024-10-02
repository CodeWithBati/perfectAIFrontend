import React, { useEffect, useState } from "react";
import Section from "../global/Section";
import Container from "../global/Container";
import Masonry from "react-layout-masonry";
import axios from "axios";
import StarsRating from "../../ui/StarsRating";
import { useSelector } from "react-redux";
import "@smastrom/react-rating/style.css";
import toast from "react-hot-toast";
import AddNewReviewModal from "./ReviewModal/AddNewReviewModal";
import UpdateReviewModal from "./ReviewModal/UpdateReviewModal";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { toastText } from "@/constants/text-constants";

const defaultformState = {
  description: "",
  stars: 0,
  reviewId: "",
};

const DirectoryReviews = ({ directory }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [isReviewed, setIsReviewed] = useState(directory?.hasReviewed);

  const [reviews, setReviews] = useState([]);
  const [notAllowdUsers, setNotAllowdUsers] = useState([]);
  const [reviewFormData, setReviewFormData] = useState(defaultformState);
  const [showModal, setShowModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleCreateNewReview = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/reviews`,
        reviewFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success(toastText.success.reviewThanks);
        setReviews((prevState) => [...prevState, response.data]);
        setReviewFormData(defaultformState);
        setNotAllowdUsers((prevState) => [...prevState, response.data.user]);
        setShowModal(false);
        setIsReviewed(true);
      } else {
        toast.error(toastText.error.reviewNotAdded);
      }
    } catch (error) {
      console.log("error->", error.response.data.message);
      toast.error(error.response.data.message[0]);
    }
  };

  const handleUpdateReview = async () => {
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/reviews/${reviewFormData.reviewId}`,
        reviewFormData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(toastText.success.reviewUpdated);
        const arrayWithOutRecord = reviews.filter(
          (rec) => rec.id !== response.data.id
        );
        setReviews([...arrayWithOutRecord, response.data]);
        setReviewFormData(defaultformState);
        setShowUpdatedModal(false);
      } else {
        toast.error(toastText.error.reviewNotUpdated);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message[0]);
    }
  };

  const handleInputChange = (field, value) => {
    setReviewFormData((prevFormData) => {
      return {
        ...prevFormData,
        [field]: value,
      };
    });
  };

  useEffect(() => {
    const userIds = reviews.map(({ user }) => user.id);
    setNotAllowdUsers(userIds);
  }, [reviews]);

  const handleRemoveReview = async (reviewId) => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/reviews/${reviewId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setReviews((prevState) =>
          prevState.filter((rec) => rec.id !== reviewId)
        );
        setNotAllowdUsers((prevState) =>
          prevState.filter((rec) => rec !== user.id)
        );
        toast.success(toastText.success.reviewDeleted);
        setIsReviewed(false);
      } else {
        toast.error(toastText.error.reviewNotDeleted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditReview = async (reviewId) => {
    setShowUpdatedModal(true);
    const reviewRecord = reviews.find((rec) => rec.id === reviewId);
    setReviewFormData({
      description: reviewRecord.description,
      stars: reviewRecord.stars,
      reviewId: reviewId,
    });
  };

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/reviews`
      );
      if (response.status === 200) {
        setReviews(response.data.results);
      } else {
        console.log("Error feteching the records");
      }
    };

    getReviews();
  }, [directory.id]);

  const handleAddReview = () => {
    if (notAllowdUsers.includes(user?.id)) {
      toast.error(toastText.error.alreadyHaveAReview);
      return;
    }
    setShowModal(true);
  };

  return (
    <>
      <Section className="pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-2  dark:bg-slate-900 overflow-hidden">
        <Container>
          <div className="flex flex-wrap items-center justify-center pb-8 lg:pb-12">
            <div className="w-full sm:w-4/5 md:w-3/5 lg:w-2/5 text-center mx-auto">
              <h3 className="text-3xl sm:text-[2.5rem] leading-tight font-bold text-slate-700 dark:text-white mb-3">
                {`${directory.name} user reviews`}
              </h3>
            </div>
          </div>

          {showModal && (
            <AddNewReviewModal
              handleInputChange={handleInputChange}
              handleCreateNewReview={handleCreateNewReview}
              reviewFormData={reviewFormData}
              setShowModal={setShowModal}
            />
          )}

          {showUpdatedModal && (
            <UpdateReviewModal
              handleInputChange={handleInputChange}
              handleUpdateReview={handleUpdateReview}
              reviewFormData={reviewFormData}
              setShowModal={setShowUpdatedModal}
            />
          )}

          {reviews && (
            <Masonry
              columns={{ 640: 1, 768: 2, 1024: 3, 1280: 3 }}
              gap={24}
              className="my-8"
            >
              {isReviewed ? (
                <div className="bg-white dark:bg-slate-950 p-7 border border-slate-100 dark:border-slate-950 shadow rounded-2xl cursor-pointer">
                  <p className="dark:text-white text-2xl h-28 flex justify-center items-center">
                    Thanks For your Review
                  </p>
                </div>
              ) : (
                <div
                  className="bg-white dark:bg-slate-950 p-7 border border-slate-100 dark:border-slate-950 shadow rounded-2xl cursor-pointer"
                  onClick={handleAddReview}
                >
                  <div className="flex flex-col items-center pb-4 justify-center">
                    <div className=" dark:text-white text-7xl">+</div>
                    <span className="text-base text-slate-500 dark:text-slate-300">
                      <p className=" dark:text-white">Add New Review</p>
                    </span>
                  </div>
                </div>
              )}

              {reviews.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-950 p-7 border border-slate-100 dark:border-slate-950 shadow rounded-2xl group"
                  >
                    <div className="flex items-center justify-between pb-4 ">
                      <div className=" flex flex-row">
                        <div className="flex gap-x-1 text-yellow-500">
                          <StarsRating starsCount={item.stars} />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-slate-300 ms-5">
                          {item.stars} Stars
                        </span>
                      </div>
                      <div className="flex flex-row gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {(item.user.id === user?.id ||
                          item.user === user?.id || user?.role === 'admin') && (
                          <>
                            <span
                              onClick={() => handleEditReview(item.id)}
                              className="text-blue-600 hover:text-blue-800 my-2 cursor-pointer"
                            >
                              <PencilSquareIcon className=" h-5" />
                            </span>
                            <span
                              onClick={() => handleRemoveReview(item.id)}
                              className="text-red-600  hover:text-red-800 my-2 cursor-pointer"
                            >
                              <TrashIcon className="h-5" />
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <div className="pb-5">
                        <p className="text-base/7 font-normal text-slate-500 dark:text-slate-300">
                          {item.description}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center">
                      <div className="inline-flex flex-shrink-0 h-12 w-12 rounded-full overflow-hidden outline outline-1 outline-offset-2 outline-slate-300 dark:outline-slate-700">
                        <Image src={item.user?.profile || user?.profile} width={100} height={100} alt="User profile icon" />
                      </div>
                      <div className="ms-5">
                        <h6 className="text-sm/snug font-bold text-slate-600 dark:text-slate-100">
                          {item.user?.firstName || user?.firstName}{" "}
                          {item.user?.lastName || user?.lastName}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Masonry>
          )}
        </Container>
      </Section>
    </>
  );
};

export default DirectoryReviews;
