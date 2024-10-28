"use client";

import { useState } from "react";
import Link from 'next/link';

import React from "react";
import Terms from '../Term&Conditions/Terms';
import PrivacyPolicy from '../Privacy&Policy/PrivacyPolicy';

const AuthFooter = () => {
    const [termModalOpen, setTermModalOpen] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    const openModalTerms = () => setTermModalOpen(true);
    const closeModalTerms = () => setTermModalOpen(false);
    const openModalPrivacy = () => setPrivacyModalOpen(true);
    const closeModalPrivacy = () => setPrivacyModalOpen(false);

    return (
        <div className="text-center lg:font-semibold mb-8 text-white flex flex-col lg:flex-row justify-center space-y-4 lg:space-y-0 lg:space-x-4 text-xs">
            <p className="text-xs">
                © 2024. Crafted By <Link href="/" className="text-additional-purple underline">MyPerfectAI</Link>
            </p>
            <div className="flex space-x-4">
                <p onClick={openModalPrivacy} className="text-white text-xs mt-0 cursor-pointer">Privacy Policy</p>
                <p onClick={openModalPrivacy} className="text-white text-xs mt-0 cursor-pointer">Terms and Conditions</p>
            </div>

            <Terms isOpen={termModalOpen} onClose={closeModalTerms} />
            <PrivacyPolicy isOpen={privacyModalOpen} onClose={closeModalPrivacy} />
        </div>
    );
};

export default AuthFooter;
