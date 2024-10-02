"use client";
import Container from "@/app/src/components/global/Container";
import Link from "next/link";
import { useState, useEffect } from "react";
import PrivacyPolicyModal from "../../ui/PrivacyPolicyModal";
import TermsAndConditionModal from "../../ui/TermsAndConditionModal";

const Footer = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTCModalOpen, setIsTCModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = isModalOpen ? "hidden" : originalStyle;
    return () => (document.body.style.overflow = originalStyle);
  }, [isModalOpen]);

  return (
    <footer className="isolate relative py-4 border-t dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto ">
      <PrivacyPolicyModal isModalOpen={isModalOpen} closeModal={closeModal} />
      <TermsAndConditionModal
        isModalOpen={isTCModalOpen}
        closeModal={() => setIsTCModalOpen(false)}
      />
      <Container>
        <div className="flex items-center gap-20">
          <p className="text-xs font-medium text-slate-600 dark:text-gray-300">
            &copy; 2024. Crafted By&nbsp;
            <Link
              href="#"
              className="text-slate-900 hover:text-blue-600 transition-all dark:text-gray-500"
            >
              MyPerfectAI
            </Link>
          </p>
          <span
            onClick={openModal}
            className="text-slate-900 hover:text-blue-600 transition-all dark:text-white text-xs cursor-pointer"
          >
            Privacy Policy
          </span>
          <span
            onClick={() => setIsTCModalOpen(true)}
            className="text-slate-900 hover:text-blue-600 transition-all dark:text-white text-xs cursor-pointer"
          >
            Terms and Conditions
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
