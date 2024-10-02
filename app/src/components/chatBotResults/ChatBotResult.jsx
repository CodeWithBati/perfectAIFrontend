'use client'
import Image from "next/image"
import Footer from "../../layout/FooterNew"
import Header from "../../layout/Header/HeaderNew"
import feat2 from '../../../../public/images/feat2.jpeg'
import FeatureCard from "../../layout/HomeNew/FeatureSection/FeatureCard"
import Cards from "./Cards"


function ChatBotResult() {

  const aiToolsData = [
    {
      id: 1,
      title: "GetGenie",
      description: "GetGenie is an AI-powered tool for content creation and SEO, offering over 30 templates for various use cases.",
      pricing: "Freemium",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: true,
      badge: "Featured",
      imageUrl: "/images/feat1.jpeg"
    },
    {
      id: 2,
      title: "Devin AI",
      description: "Devin AI, developed by Cognition Labs, is an advanced AI model that autonomously handles software engineering tasks.",
      pricing: "Free",
      rating: 5,
      reviews: 100,
      featured: true,
      verified: false,
      badge: "Featured",
      imageUrl: "/images/feat2.jpeg"
    },
  ];

  return (
    <div>
      <Header />
      <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-32 pb-16 text-white bg-no-repeat bg-cover" style={{
        backgroundImage: `url('/images/all_bg.jpeg')`
      }}>
        <h4 className="text-2xl font-bold">We’ve designed our AI system to provide accurate, relevant AI tool recommendations.<span className="text-[#BF96E4] font-bold"> Learn more</span> </h4>
        <div className="px-[135px] mt-8 rounded-lg text-white">

          <div className="flex space-x-6">
            <div className="w-1/4 px-6 rounded-lg">
              <button className="flex items-center bg-[#323639] border border-[rgba(255,255,255,0.2)] px-[20px] py-[10px] rounded-[5px] mb-4 text-sm font-bold text-white hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5l-7-7m0 0l7-7m-7 7h16.5" />
                </svg>
                Back for another search
              </button>
              <div className="bg-[#323639] p-6 rounded-lg">
                <p className="text-white text-sm mb-4">
                  I own a small B2B consulting firm specializing in digital transformation. I need an AI tool to help with lead
                  generation by identifying potential clients in my target industry and automating outreach efforts. My goal is
                  to increase the number of qualified leads and grow my client base.
                </p>

                {/* Share link button */}
                <button className="flex items-center py-2 px-4 bg-[#8B60B2] text-base text-white rounded-[5px] font-semibold mb-6 gap-2">
                  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 0.5V11.5H5V0.5H16ZM2 5.5H4V7.5H2V14.5H9V12.5H11V14.5V16.5H9H2H0V14.5V7.5V5.5H2Z" fill="white" />
                  </svg>

                  Share link
                </button>

                {/* Recommendations */}
                <div className="mt-4 border-t border-t-[rgba(255,255,255,0.2)]">
                  <h3 className="text-sm font-semibold text-lg mb-2 mt-4 font-bold text-white">AI tool recommendations:</h3>
                  <div className="space-y-4 text-sm">
                    <button className="w-full text-left bg-[#8B60B2] py-2 px-4 rounded-[5px] text-white flex items-center gap-2">
                      Lead generation by identifying potential clients in a target industry
                      <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0 }}>
                        <path d="M8.40625 7L7.6875 7.71875L2.6875 12.7188L2 13.4375L0.5625 12L1.28125 11.3125L5.5625 7L1.28125 2.71875L0.5625 2L2 0.59375L2.6875 1.3125L7.6875 6.3125L8.40625 7Z" fill="white" />
                      </svg>
                    </button>
                    <button className="w-full text-left bg-[#1e1e1e] py-2 px-4 rounded-[5px] text-white flex items-center gap-2">
                      Automating outreach efforts to potential clients
                      <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0 }}>
                        <path d="M8.40625 7L7.6875 7.71875L2.6875 12.7188L2 13.4375L0.5625 12L1.28125 11.3125L5.5625 7L1.28125 2.71875L0.5625 2L2 0.59375L2.6875 1.3125L7.6875 6.3125L8.40625 7Z" fill="white" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-2/4">
              <p className="text-lg mb-4 font-bold">Lead generation by identifying potential clients in a target industry </p>
              <div className="flex items-center space-x-4 mb-4">
                <Image alt="Writesonic" src={feat2} className="w-16 h-16 rounded-lg" />
                <div>
                  <h2 className="text-2xl font-semibold">Writesonic</h2>
                  <div className="flex items-center text-2xl space-x-1 text-[#8B60B2]">
                    <span>★★★★★</span>
                    <span className="text-white text-lg">(100)</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="save flex gap-4 mb-4">
                <button className='flex items-center w-auto p-2 h-[41px] text-white font-bold rounded-[5px] bg-[#323639]'>
                  <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                    <path d="M6.5 11.2812L7.25 11.7188L11 13.9062V2H2V13.9062L5.71875 11.7188L6.5 11.2812ZM2 15.625L0.5 16.5V14.7812V2V0.5H2H11H12.5V2V14.7812V16.5L11 15.625L6.5 13L2 15.625Z" fill="white" />
                  </svg>

                  Save (128)
                </button>
                <button className='flex items-center p-2 h-[41px] bg-[#8B60B2] font-bold rounded-[5px]'>
                  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-2'>
                    <path d="M9 0.5H13H14V1.5V5.5V6.5H12V5.5V3.9375L6.6875 9.21875L6 9.9375L4.5625 8.5L5.28125 7.8125L10.5625 2.5H9H8V0.5H9ZM1 1.5H5H6V3.5H5H2V12.5H11V9.5V8.5H13V9.5V13.5V14.5H12H1H0V13.5V2.5V1.5H1Z" fill="white" />
                  </svg>

                  Visit website
                </button>
              </div>

              {/* Why it's perfect */}
              <div className="relative p-4 rounded-[5px] mb-6 overflow-hidden min-h-[175px]" style={{
                background: '#1E1E1E',
                backgroundBlendMode: "screen",
              }}>
                <div
                  className="absolute"
                  style={{
                    width: '1454px',
                    height: '1454px',
                    borderRadius: '50%',
                    top: '-705px',
                    left: '255px',
                    transform: 'rotate(180deg)',
                    background:
                      'radial-gradient(41.73% 41.73% at 50% 52.76%, #935FAF 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
                    backgroundBlendMode: 'lighten',
                  }}
                ></div>

                <div
                  className="absolute"
                  style={{
                    width: '1454px',
                    height: '1454px',
                    borderRadius: '50%',
                    top: '-650px',
                    right: '70px',
                    transform: 'rotate(180deg)',
                    background:
                      'radial-gradient(41.73% 41.73% at 50% 52.76%, #353C83 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
                    backgroundBlendMode: 'lighten',
                  }}
                ></div>
                <div className="absolute z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 16.5C3.5625 16.5 0 12.9375 0 8.5C0 4.09375 3.5625 0.5 8 0.5C12.4062 0.5 16 4.09375 16 8.5C16 12.9375 12.4062 16.5 8 16.5ZM9.46875 6.5L8 3.5L6.53125 6.5L3.21875 6.96875L5.625 9.28125L5.0625 12.5625L8 11L10.9375 12.5625L10.375 9.28125L12.75 6.96875L9.46875 6.5Z" fill="white" />
                    </svg>
                    <h3 className="text-2xl font-semibold">Why it's Perfect for your task</h3>
                  </div>
                  <ul className="list-disc space-y-4 text-sm ml-6">
                    <li>AI-driven content generation with a focus on creativity</li>
                    <li>Variety of templates for different content types</li>
                    <li>User-friendly interface</li>
                  </ul>
                </div>
              </div>

              {/* Tool description */}
              <p className="text-white text-sm mb-8">
                Writesonic is an AI-driven content generation tool that uses advanced natural language processing to produce high-quality written
                content quickly. It is designed to assist with various types of content creation, including blogs, ads, landing pages, and social media
                posts. The platform offers an intuitive interface and multiple templates to help users generate content efficiently, leveraging the
                capabilities of GPT-4 and other AI models.
              </p>

              {/* Pricing information */}
              <h3 className="text-2xl font-semibold mb-2">Pricing information</h3>
              <p className="text-white text-sm mb-8">
                Free plan available with limited features; premium plans available at additional costs.
              </p>

              {/* Alternatives */}
              <h3 className="text-2xl font-semibold mb-2">Alternatives</h3>
              <p className="text-white text-sm mb-8">
                Free plan available with limited features; premium plans available at additional costs.
              </p>
              <div className="flex items-center gap-4 mb-4">
                {aiToolsData?.map((tool, i) => (
                  <FeatureCard feature={tool} key={i} />
                ))}
              </div>
            </div>

            <div className="flex flex-col w-1/4">
              {aiToolsData?.map((tool, i) => (
                <FeatureCard feature={tool} key={i} />
              ))}
              <Cards />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>

  )
}

export default ChatBotResult