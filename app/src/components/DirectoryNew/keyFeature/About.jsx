'use client'
import React from 'react'
import DOMPurify from 'dompurify';

import Slider from '../Slider'

const About = ({ directory }) => {
    const sanitizedDescription = DOMPurify.sanitize(directory?.description);

    return (
        <>
            <div className="lg:hidden">
                <Slider />
            </div>
            <p className="mt-2 text-white text-sm lg:text-base"
                dangerouslySetInnerHTML={{ __html: sanitizedDescription }}>
            </p>
            <div className="lg:flex lg:space-x-2 lg:space-y-0 space-y-2 mt-4 w-auto">
                {directory?.categories?.map((category, index) => (
                    <>
                        <p key={index} className='bg-[#4B4B4B] rounded-lg text-xs px-[10px] py-[5px] inline-block'>{category}</p>
                        <br className='lg:hidden' />
                    </>
                ))}
            </div>
            <div className="hidden lg:block">
                <Slider />
            </div>
        </>
    )
}

export default About;
