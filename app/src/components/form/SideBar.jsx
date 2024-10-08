"use client";

import React from "react";

const SideBar = () => {

    return (
        <>
        <div className="hidden lg:w-1/3 w-full bg-no-repeat lg:flex justify-center items-center" style={{ backgroundImage: "url('/images/authBg.png')" }}>
            <div className="text-center text-white px-8">
                <p className="bg-main-purple text-xs px-[10px] py-[5px] mb-4 font-semibold inline-block rounded-[5px]">DID YOU KNOW?</p>
                <h1 className="text-[32px] font-bold mb-4">AI can improve customer service</h1>
                <p className="text-lg">
                    AI-powered chatbots and virtual assistants can improve customer service by providing quick and accurate responses to customer inquiries.
                </p>
            </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-40 lg:hidden"></div>
        </>
    );
};

export default SideBar;
