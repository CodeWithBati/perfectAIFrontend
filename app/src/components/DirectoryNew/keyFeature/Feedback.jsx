
import React from 'react';
import Image from 'next/image'
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import StarRating from '../../StarRating';

const Feedback = ({ review, user, handleEditReview, handleRemoveReview }) => {
    return (
        <div className="relative p-6 bg-[#323639] rounded-[5px] border border-[rgba(255,255,255,0.2)] text-white h-[250px] flex flex-col justify-between">
            {/* Star rating */}
            <div className="flex flex-col mb-4">
                <div className='flex justify-between items-center mb-2'>
                    <StarRating rating={review.stars} />
                    <div className="flex flex-row gap-3 opacity-100 transition-opacity duration-300">
                        {(review.user.id === user?.id ||
                            review.user === user?.id || user?.role === 'admin') && (
                                <>
                                    <span
                                        onClick={() => handleEditReview(review.id)}
                                        className="text-red cursor-pointer"
                                    >
                                        <PencilSquareIcon className=" h-5" />
                                    </span>
                                    <span
                                        onClick={() => handleRemoveReview(review.id)}
                                        className="text-red-600 cursor-pointer"
                                    >
                                        <TrashIcon className="h-5" />
                                    </span>
                                </>
                            )}
                    </div>
                </div>
                {/* Title */}
                {/* <h3 className="text-sm mb-2 line-clamp-1">Huge potential</h3> */}

                {/* Description */}
                <p className="text-white text-sm mb-4 line-clamp-3 mt-6">
                    {review?.description}
                </p>
            </div>

            {/* Author section */}
            <div className="flex items-center mt-4">
                {
                    review.user?.profile ? (
                        <Image
                            src={review.user?.profile}
                            className="w-[40px] h-[40px] rounded-[5px] mr-2"
                            alt="avatar"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <Image
                            src="/images/avatar.svg"
                            className="w-[40px] h-[40px] rounded-[5px] mr-2"
                            alt="No Profile Image Avatar"
                            width={40}
                            height={40}
                        />
                    )
                }
                <div className="text-base font-semibold">{review.user?.firstName || user?.firstName}{" "}
                    {review.user?.lastName || user?.lastName}</div>
            </div>
        </div>
    );
};

export default Feedback;
