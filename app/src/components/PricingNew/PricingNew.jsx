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
      "price": "$4.99",
      "duration": "month",
      "button": "Get started",
      "features": [
        "Create trust with a verified listing",
        "Increase MyPerfectAI chatbot recommendations & SEO ranking by creating a detailed, custom tool description",
        "Add photos, videos & pricing information",
        "Monthly data insights",
        "Update listing details anytime",
        "Indexed on Google"
      ]
    },
    {
      "id": "2",
      "plan": "Silver Partnership",
      "planType": "silver",
      "price": "Custom Pricing",
      "button": "Coming Soon",
      "duration": "month",
      "features": [
        "Increase exposure with placement on the MyPerfectAI home screen",
        "Priority ranking in directory",
        "All customized listing features included",
        "Pricing is unique to your tool's category size & your promotional objectives",
        "Priority when contacting us & updating listing details"
      ]
    },
    {
      "id": "3",
      "plan": "Gold Partnership",
      "planType": "gold",
      "price": "Custom Pricing",
      "button": "Coming Soon",
      "duration": "month",
      "features": [
        "Gain exposure for your tool with customized promotion including:",
        "Newsletter promotion",
        "Social media promotion",
        "Blog promotion",
        "Sponsorship"
      ]
    }
  ]

  return (
    <>
      <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-16 lg:pt-32 pb-16 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">
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