'use client'
import Footer from "../../layout/FooterNew"
import Header from "../../layout/Header/HeaderNew"
import FAQ from "./FAQ"
import PriceCard from "./PriceCard"

function PricingNew() {

  const pricePlans = [
    {
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
      <Header />
      <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-32 pb-16 text-white bg-no-repeat bg-cover" style={{
        backgroundImage: `url('/images/all_bg.jpeg')`
      }}>
        <div className=" text-white py-10 px-[135px]">
          <h1 className="text-5xl font-bold mb-8 text-center">Pricing</h1>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricePlans?.map((plan, index) => (
              <PriceCard detail={plan} key={index} />
            ))}
          </div>
        </div>
        <FAQ />
      </section>
      <Footer />
    </>
  )
}

export default PricingNew