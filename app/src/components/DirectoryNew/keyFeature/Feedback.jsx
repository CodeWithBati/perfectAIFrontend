
import React from 'react';
import Image from 'next/image'
import StarRating from '../../StarRating';

const Feedback = ({ review, user }) => {
    return (
        <div className="relative p-6 bg-[#323639] rounded-[5px] border border-[rgba(255,255,255,0.2)] text-white h-[250px] flex flex-col justify-between">
            {/* Star rating */}
            <div className="flex flex-col mb-4">
                <StarRating rating={review.stars} />
                {/* Title */}
                {/* <h3 className="text-sm mb-2 line-clamp-1">Huge potential</h3> */}

                {/* Description */}
                <p className="text-white text-sm mb-4 line-clamp-3 mt-8">
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
