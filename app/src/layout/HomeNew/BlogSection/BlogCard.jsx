import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';


const BlogCard = ({blog}) => {

    return (
        <div className="bg-transparent rounded-lg">
            <Image
                src={blog?.imageUrl}
                className="w-full rounded-lg object-cover mb-4"
                alt="Blog Post"
                height={40}
                width={200}
            />
            <div className="h-[150px]">
            <h3 className="font-semibold text-lg text-white mb-2 line-clamp-3">{blog?.title}</h3>

            <p className="text-sm text-white mb-4 line-clamp-3">{blog?.description}</p>
            </div>
            <div className="flex items-center justify-between">
                <p className="text-sm text-white">{blog?.date}</p>
                <div className="ml-4 flex items-center">
                    <Image
                        src="/images/avatar.svg"
                        className="rounded-full mr-2"
                        alt="No Profile Image Avatar"
                        width={30}
                        height={30}
                    />
                    <p className="text-sm text-white">{blog?.author}</p>
                </div>
            </div>
            <hr className="mt-2 border-[rgba(255,255,255,0.2)]" />
            <Link href="#" className="flex justify-start items-center text-white mt-4 inline-block text-xs font-semibold">
                Read more <svg width="11" height="9" className="ml-2" viewBox="0 0 11 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0547 4.89844L6.46875 8.50781L6.07031 8.90625L5.27344 8.10938L5.67188 7.71094L8.29688 5.0625H0.5625H0V3.9375H0.5625H8.29688L5.67188 1.3125L5.27344 0.914062L6.07031 0.117188L6.46875 0.515625L10.0547 4.10156L10.4531 4.5L10.0547 4.89844Z" fill="white" />
                </svg>
            </Link>
        </div>
    );
};

export default BlogCard;
