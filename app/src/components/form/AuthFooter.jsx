"use client";

import Link from 'next/link';

import React from "react";

const AuthFooter = () => {

    return (
        <div className="text-center lg:font-semibold mb-8 text-white flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-4 text-xs">
            <p className="text-xs">
                © 2024. Crafted By <Link href="/" className="text-additional-purple underline">MyPerfectAI</Link>
            </p>
            <div className="flex space-x-4">
                <Link href="#" className="text-white text-xs mt-0">Privacy Policy</Link>
                <Link href="#" className="text-white text-xs mt-0">Terms and Conditions</Link>
            </div>
        </div>
    );
};

export default AuthFooter;
