// About.js
'use client'
import React from 'react'
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

import Slider from '../Slider'

const About = ({ aboutContent, directory }) => {
    const sanitizedDescription = DOMPurify.sanitize(aboutContent);

    return (
        <>
            <div className="lg:hidden">
                <Slider videos={directory?.videos} />
            </div>
            <div className="mt-2 text-white text-sm lg:text-base">
                {parse(sanitizedDescription)}
            </div>
            <div className="lg:flex lg:space-x-2 lg:space-y-0 space-y-2 mt-4 w-auto">
                {directory?.categories?.map((category, index) => (
                    <p key={index} className='bg-[#4B4B4B] rounded-lg text-xs px-[10px] py-[5px] inline-block'>{category}</p>
                ))}
            </div>
            <div className="hidden lg:block">
                <Slider videos={directory?.videos} />
            </div>
        </>
    )
}

export default About;
