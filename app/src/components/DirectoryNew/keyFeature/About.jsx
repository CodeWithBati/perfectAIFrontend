'use client'
import React, { useState, useEffect } from 'react'

import Slider from '../Slider'

function About() {

    return (
        <>
            <div className="lg:hidden">
                <Slider />
            </div>
            <p className="mt-2 text-white text-sm lg:text-base">
                GetGenie AI is an advanced AI-powered writing assistant and SEO optimization tool specifically designed for WordPress users. It offers a range of features to help content creators, marketers, and businesses generate high-quality, SEO-optimized content efficiently. Developed by XpeedStudio, GetGenie integrates seamlessly with WordPress, enabling users to create, optimize, and manage content directly from their WordPress dashboard.
            </p>
            <div className="lg:flex lg:space-x-2 lg:space-y-0 space-y-2 mt-4 w-auto">
                <p className='bg-[#4B4B4B] rounded-lg text-xs px-[10px] py-[5px] inline-block'>Waiting and Content Creation</p>
                <br className='lg:hidden' />
                <p className='bg-[#4B4B4B] rounded-lg text-xs px-[10px] py-[5px] inline-block'>Marketing and Sales Automation</p>
                <br className='lg:hidden' />
                <p className='bg-[#4B4B4B] rounded-lg text-xs px-[10px] py-[5px] inline-block'>Productivity and Workflow Automation</p>
            </div>
            <div className="hidden lg:block">
                <Slider />
            </div>
        </>
    )
}

export default About;
