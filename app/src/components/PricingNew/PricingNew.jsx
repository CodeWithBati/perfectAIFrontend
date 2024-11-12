'use client'
import { useState } from 'react';
import Footer from "../../layout/FooterNew"
import Header from "../../layout/Header/HeaderNew"
import FAQ from "./FAQ"
import PriceCard from "./PriceCard"

function PricingNew() {
  const [openIndex, setOpenIndex] = useState("1");

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const pricePlans = [
    {
      "id": "1",
      "plan": "Bronze Partnership",
      "planType": "bronze",
      "price": "$299.99",
      "duration": "year",
      "button": "Get started",
      "features": [
        "FREE for AI tools with affiliate programs, contact partners@myperfectai.app",
        "Verified badge demonstraing credibility and relevance",
        "Access to update your directory listing at any time, subject to editorial approval",
        "Add images, videos, and documents",
        "Continuous partnership with MyPerfectAI to help find customers for your AI tool",
        "Boost SEO with backlinks and indexing on Google",
        "Monthly reports on how our users interact with your directory listing"
      ]
    },
    {
      "id": "2",
      "plan": "Silver Partnership",
      "planType": "silver",
      "price": "$449.99",
      "duration": "year",
      "button": "Get Started",
      "features": [
        "$149.99/year for AI tools with affiliate programs, contact partners@myperfectai.app",
        "Discounted access to additional promotional opportunities across our network",
        "All Bronze Partnership features included",
        "Priority support and liaison with MyPerfectAI",
        "AI Insights spotlight article included"
      ]
    },
    {
      "id": "3",
      "plan": "Gold Partnership",
      "planType": "gold",
      "price": "Custom Pricing",
      "button": "Get Started",
      "duration": "month",
      "features": [
        "Fully custom-built partnership. For AI startups with limitless ambition. Contact partners@myperfectai.app",
      ]
    }
  ]

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-16 lg:pt-32 pb-16 text-white bg-contain bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">
        <div className=" text-white mb-8 lg:mb-10 px-[30px] lg:px-[135px] w-full lg:w-auto">
          <h1 className="text-2xl lg:text-5xl mt-6 lg:mt-0 font-bold mb-6 lg:mb-8 text-center">Pricing</h1>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 w-full lg:w-auto">
            {pricePlans?.map((plan, index) => (
              <PriceCard detail={plan} key={index} toggleOpen={toggleOpen} openIndex={openIndex} />
            ))}
          </div>
        </div>
        <FAQ />
      </section>
    </>
  )
}

export default PricingNew
