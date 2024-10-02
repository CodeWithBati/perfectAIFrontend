import React from 'react'
import Header from '../../layout/Header/HeaderNew'
import Footer from '../../layout/FooterNew'

function ThankYou() {
  return (
    <>
      <div className='bg-slate-800' >
        <Header />
        <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pb-16 text-white bg-no-repeat bg-cover" style={{
          backgroundImage: `url('/images/all_bg.jpeg')`
        }}>
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              {/* Icon */}
              <div className="flex items-center justify-center rounded-full">
                <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center">
                  <div className="bg-purple-600 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-white "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Thank you message */}
              <h1 className="text-5xl font-bold text-white mt-6">Thank you</h1>

              {/* Description */}
              <p className="text-white text-lg font-bold mt-4 max-w-2xl">
                We recommend uploading as much specific, detailed information as possible about your AI tool. This will increase the quality of your leads, as the chatbot will recommend AI tools more precisely and accurately to users.
              </p>
            </div>
          </div>


        </section>

      </div>
      <Footer />
    </>
  )
}

export default ThankYou