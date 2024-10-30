import React from 'react'
import Header from '../../layout/Header/HeaderNew'
import Footer from '../../layout/FooterNew'

function ThankYou() {
  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pb-16 text-white bg-no-repeat bg-[#181C1F] lg:bg-cover bg-center bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">
      <div className="flex items-center justify-center px-[30px] lg:px-[50px] lg:mt-[100px]">
        <div className="text-center">
          {/* Icon */}
          <div className="flex items-center justify-center rounded-full">
            <div className="bg-white rounded-full w-[82px] h-[82px] flex items-center justify-center">
              <div className="bg-[#8B60B2] rounded-full w-[62px] h-[62px] flex items-center justify-center">
                <svg width="62" height="62" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="path-1-outside-1_224_5144" maskUnits="userSpaceOnUse" x="-10" y="-10" width="84" height="84" fill="black">
                    <rect fill="white" x="-10" y="-10" width="84" height="84" />
                    <path d="M32 64C14.25 64 0 49.75 0 32C0 14.375 14.25 0 32 0C49.625 0 64 14.375 64 32C64 49.75 49.625 64 32 64ZM46.125 26.125H46L48.125 24L44 19.75L41.875 21.875L28 35.875L22.125 30L20 27.875L15.75 32L17.875 34.125L25.875 42.125L28 44.25L30.125 42.125L46.125 26.125Z" />
                  </mask>
                  <path d="M32 64C14.25 64 0 49.75 0 32C0 14.375 14.25 0 32 0C49.625 0 64 14.375 64 32C64 49.75 49.625 64 32 64ZM46.125 26.125H46L48.125 24L44 19.75L41.875 21.875L28 35.875L22.125 30L20 27.875L15.75 32L17.875 34.125L25.875 42.125L28 44.25L30.125 42.125L46.125 26.125Z" fill="#8B60B2" />
                  <path d="M46.125 26.125L53.1961 33.1961L70.2671 16.125H46.125V26.125ZM46 26.125L38.9289 19.0539L21.8579 36.125H46V26.125ZM48.125 24L55.1961 31.0711L62.1624 24.1048L55.3008 17.0352L48.125 24ZM44 19.75L51.1758 12.7852L44.1063 5.50154L36.9289 12.6789L44 19.75ZM41.875 21.875L34.8039 14.8039L34.7881 14.8198L34.7723 14.8357L41.875 21.875ZM28 35.875L20.9289 42.9461L28.0318 50.0489L35.1027 42.9143L28 35.875ZM20 27.875L27.0711 20.8039L20.1048 13.8376L13.0352 20.6992L20 27.875ZM15.75 32L8.78525 24.8242L1.50154 31.8937L8.67893 39.0711L15.75 32ZM28 44.25L20.9289 51.3211L28 58.3921L35.0711 51.3211L28 44.25ZM32 54C19.7728 54 10 44.2272 10 32H-10C-10 55.2728 8.72715 74 32 74V54ZM10 32C10 19.8724 19.7983 10 32 10V-10C8.70172 -10 -10 8.87762 -10 32H10ZM32 10C44.1022 10 54 19.8978 54 32H74C74 8.85215 55.1478 -10 32 -10V10ZM54 32C54 44.2017 44.1276 54 32 54V74C55.1224 74 74 55.2983 74 32H54ZM46.125 16.125H46V36.125H46.125V16.125ZM53.0711 33.1961L55.1961 31.0711L41.0539 16.9289L38.9289 19.0539L53.0711 33.1961ZM55.3008 17.0352L51.1758 12.7852L36.8242 26.7148L40.9492 30.9648L55.3008 17.0352ZM36.9289 12.6789L34.8039 14.8039L48.9461 28.9461L51.0711 26.8211L36.9289 12.6789ZM34.7723 14.8357L20.8973 28.8357L35.1027 42.9143L48.9777 28.9143L34.7723 14.8357ZM35.0711 28.8039L29.1961 22.9289L15.0539 37.0711L20.9289 42.9461L35.0711 28.8039ZM29.1961 22.9289L27.0711 20.8039L12.9289 34.9461L15.0539 37.0711L29.1961 22.9289ZM13.0352 20.6992L8.78525 24.8242L22.7148 39.1758L26.9648 35.0508L13.0352 20.6992ZM8.67893 39.0711L10.8039 41.1961L24.9461 27.0539L22.8211 24.9289L8.67893 39.0711ZM10.8039 41.1961L18.8039 49.1961L32.9461 35.0539L24.9461 27.0539L10.8039 41.1961ZM18.8039 49.1961L20.9289 51.3211L35.0711 37.1789L32.9461 35.0539L18.8039 49.1961ZM35.0711 51.3211L37.1961 49.1961L23.0539 35.0539L20.9289 37.1789L35.0711 51.3211ZM37.1961 49.1961L53.1961 33.1961L39.0539 19.0539L23.0539 35.0539L37.1961 49.1961Z" fill="white" mask="url(#path-1-outside-1_224_5144)" />
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
  )
}

export default ThankYou