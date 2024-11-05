import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Image from 'next/image'
import { Rating, ThinStar } from "@smastrom/react-rating";
import toast from "react-hot-toast";
import { toastText } from "@/constants/text-constants";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import Feedback from './keyFeature/Feedback';
import AddNewReviewModal from "../Directories/ReviewModal/AddNewReviewModal";
import UpdateReviewModal from "../Directories/ReviewModal/UpdateReviewModal";


const defaultformState = {
  description: "",
  stars: 0,
  reviewId: "",
};

const myStyles = {
  itemShapes: ThinStar,
  activeFillColor: "#8B60B2",
  inactiveFillColor: "gray",
};

const PersonReviews = ({ directory }) => {

  const { user, token } = useSelector((state) => state.auth);
  const [isReviewed, setIsReviewed] = useState(directory?.hasReviewed);

  const [reviews, setReviews] = useState([]);
  const [notAllowdUsers, setNotAllowdUsers] = useState([]);
  const [reviewFormData, setReviewFormData] = useState(defaultformState);
  const [showModal, setShowModal] = useState(false);
  const [showUpdatedModal, setShowUpdatedModal] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showStars, setShowStars] = useState(false);
  const inputRef = useRef(null);

  const handleInputFocus = () => {
    setShowStars(true);
  };

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
    if (!directory?.id) return; // Check if directory.id exists
    const getReviews = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/directories/${directory.id}/reviews`
        );
        if (response.status === 200) {
          setReviews(response.data.results);
          const reviewRecord = reviews.find((rec) => rec.id === reviewId);
          setReviewFormData({
            description: reviewRecord.description,
            stars: reviewRecord.stars,
            reviewId: reviewId,
          });
        } else {
          console.log("Error fetching the records");
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };

    getReviews();
  }, [directory]);


  const handleAddReview = () => {
    if (notAllowdUsers.includes(user?.id)) {
      toast.error(toastText.error.alreadyHaveAReview);
      return;
    }
    setShowModal(true);
  };

  return (
    <div className="border-t mt-8 border-t-[rgba(255,255,255,0.2)]">
      {/* Review Section */}
      <section className="text-white py-8 lg:py-12 lg:flex lg:flex-col items-center justify-center">
        {/* Search Bar */}
        {!isReviewed ? (
          <div className="flex items-center justify-center bg-[#323639] p-2 rounded-lg max-w-[770px] mb-16 border border-[rgba(255,255,255,0.2)]">
            {/* User avatar */}
            {
              user?.profile ? (
                <Image
                  src={user?.profile}
                  className="w-10 h-10 rounded-[5px] mr-2"
                  alt="avatar"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src="/images/avatar.svg"
                  className="w-10 h-10 rounded-[5px] mr-2"
                  alt="No Profile Image Avatar"
                  width={100}
                  height={100}
                />
              )
            }

            {/* Input field */}
            <div className="relative flex w-full lg:w-[570px]">
              <input
                type="text"
                id="comment"
                placeholder="WHAT DO YOU THINK..."
                className="block px-4 pb-2 w-full h-10 text-sm text-white bg-[#323639] rounded-[5px] border-none outline-none focus:outline-none focus:ring-0 peer"
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                value={reviewFormData.description}
                onFocus={handleInputFocus}
                ref={inputRef}
              />

              {/* Star Rating */}
              {showStars && (
                <div className="flex justify-center items-center">
                  <Rating
                    itemStyles={myStyles}
                    style={{ maxWidth: 100 }}
                    activeColor="#8B60B2"
                    value={reviewFormData.stars}
                    onChange={(value) => handleInputChange("stars", value)}
                  />
                </div>
              )}
            </div>

            {/* Review button */}
            <button className="hidden lg:block ml-3 bg-[#8B60B2] text-white px-4 py-2 rounded-lg font-semibold" onClick={handleCreateNewReview}>
              Review
            </button>
            <button className="lg:hidden ml-3 bg-[#8B60B2] text-white px-4 py-4 rounded-lg font-semibold">
              <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.59375 6.09375L0 0H2L16 7L2 14H0L2.59375 7.9375L9.5 7L2.59375 6.09375Z" fill="white" />
              </svg>
            </button>
          </div>

        ) :
          (
            <div className="flex items-center justify-center bg-[#323639] p-2 rounded-lg max-w-[770px] mb-16 border border-[rgba(255,255,255,0.2)]">
              {/* User avatar */}
              {
                user?.profile ? (
                  <Image
                    src={user?.profile}
                    className="w-10 h-10 rounded-[5px] mr-2"
                    alt="avatar"
                    width={100}
                    height={100}
                  />
                ) : (
                  <Image
                    src="/images/avatar.svg"
                    className="w-10 h-10 rounded-[5px] mr-2"
                    alt="No Profile Image Avatar"
                    width={100}
                    height={100}
                  />
                )
              }

              {/* Input field */}
              <div className="relative flex w-full lg:w-[570px]">
                <input
                  type="text"
                  id="comment"
                  placeholder="WHAT DO YOU THINK..."
                  className="block px-4 pb-2 w-full h-10 text-sm text-white bg-[#323639] rounded-[5px] border-none outline-none focus:outline-none focus:ring-0 peer"
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  value={reviewFormData.description}
                />

                <div className="mt-2">
                  <Rating
                    itemStyles={myStyles}
                    style={{ maxWidth: 100 }}
                    activeColor="#8B60B2"
                    value={reviewFormData.stars}
                    onChange={(value) => handleInputChange("stars", value)}
                  />
                </div>
              </div>

              {/* Review button */}
              <button className="hidden lg:block ml-3 bg-[#8B60B2] text-white px-4 py-2 rounded-lg font-semibold" onClick={handleUpdateReview}>
                Review
              </button>
              <button className="lg:hidden ml-3 bg-[#8B60B2] text-white px-4 py-4 rounded-lg font-semibold">
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.59375 6.09375L0 0H2L16 7L2 14H0L2.59375 7.9375L9.5 7L2.59375 6.09375Z" fill="white" />
                </svg>
              </button>
            </div>
          )
        }

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <Feedback key={index} review={review} user={user} handleEditReview={handleEditReview} handleRemoveReview={handleRemoveReview} />
          ))}
        </div>

        <div className="lg:hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={1.4}
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              200: {
                slidesPerView: 1.4,
                spaceBetween: 30,
              },
            }}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <Feedback key={index} review={review} user={user} />
              </SwiperSlide>
            ))}

          </Swiper>
        </div>
      </section>

    </div>
  );
}


export default PersonReviews;