'use client';

import Link from 'next/link';
import Image from "next/image";
import SideBar from '../SideBar';
import AuthFooter from '../AuthFooter';

const PasswordResetFormSuccess = () => {
  return (
    <>

      <div className="flex flex-col lg:flex-row bg-[#181C1F] bg-contain lg:bg-contain bg-no-repeat bg-[url('/images/mobileAuthBg.png')] lg:bg-none">
        <SideBar />

        {/* Right Side with Sign-Up Options */}
        <div className="relative z-10 lg:w-[60%] w-full lg:min-h-[1024px] :bg-dark-bg flex flex-col justify-between items-center px-[30px] lg:px-0">
          {/* Top Part (Logo and Sign Up Buttons) */}
          <Link href='/' className='flex text-white text-center items-center justify-center mt-10 lg:mt-[68px] mb-4 lg:mb-8 font-bold text-xl lg:text-2xl'>
            <Image
              alt="website Logo"
              src={"/images/Profile_logo.png"}
              width={300}
              height={60}
              className="mx-auto rounded-[6.5px] mr-[10px] w-[300px] h-[100%]"
            />
          </Link>

          <div className="space-y-3 text-center flex flex-col justify-center items-center mt-20 lg:mt-0">
            <div className="flex items-center justify-center mb-6">
              <svg className="rounded-full border-4 border-white bg-white" width="65" height="64" viewBox="0 0 65 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1_598_3608" maskUnits="userSpaceOnUse" x="-9.5" y="-10" width="84" height="84" fill="black">
                  <path d="M32.5 64C14.75 64 0.5 49.75 0.5 32C0.5 14.375 14.75 0 32.5 0C50.125 0 64.5 14.375 64.5 32C64.5 49.75 50.125 64 32.5 64ZM46.625 26.125H46.5L48.625 24L44.5 19.75L42.375 21.875L28.5 35.875L22.625 30L20.5 27.875L16.25 32L18.375 34.125L26.375 42.125L28.5 44.25L30.625 42.125L46.625 26.125Z" />
                </mask>
                <path d="M32.5 64C14.75 64 0.5 49.75 0.5 32C0.5 14.375 14.75 0 32.5 0C50.125 0 64.5 14.375 64.5 32C64.5 49.75 50.125 64 32.5 64ZM46.625 26.125H46.5L48.625 24L44.5 19.75L42.375 21.875L28.5 35.875L22.625 30L20.5 27.875L16.25 32L18.375 34.125L26.375 42.125L28.5 44.25L30.625 42.125L46.625 26.125Z" fill="#8B60B2" />
                <path d="M46.625 26.125L53.6961 33.1961L70.7671 16.125H46.625V26.125ZM46.5 26.125L39.4289 19.0539L22.3579 36.125H46.5V26.125ZM48.625 24L55.6961 31.0711L62.6624 24.1048L55.8008 17.0352L48.625 24ZM44.5 19.75L51.6758 12.7852L44.6063 5.50154L37.4289 12.6789L44.5 19.75ZM42.375 21.875L35.3039 14.8039L35.2881 14.8198L35.2723 14.8357L42.375 21.875ZM28.5 35.875L21.4289 42.9461L28.5318 50.0489L35.6027 42.9143L28.5 35.875ZM20.5 27.875L27.5711 20.8039L20.6048 13.8376L13.5352 20.6992L20.5 27.875ZM16.25 32L9.28525 24.8242L2.00154 31.8937L9.17893 39.0711L16.25 32ZM28.5 44.25L21.4289 51.3211L28.5 58.3921L35.5711 51.3211L28.5 44.25ZM32.5 54C20.2728 54 10.5 44.2272 10.5 32H-9.5C-9.5 55.2728 9.22715 74 32.5 74V54ZM10.5 32C10.5 19.8724 20.2983 10 32.5 10V-10C9.20172 -10 -9.5 8.87762 -9.5 32H10.5ZM32.5 10C44.6022 10 54.5 19.8978 54.5 32H74.5C74.5 8.85215 55.6478 -10 32.5 -10V10ZM54.5 32C54.5 44.2017 44.6276 54 32.5 54V74C55.6224 74 74.5 55.2983 74.5 32H54.5ZM46.625 16.125H46.5V36.125H46.625V16.125ZM53.5711 33.1961L55.6961 31.0711L41.5539 16.9289L39.4289 19.0539L53.5711 33.1961ZM55.8008 17.0352L51.6758 12.7852L37.3242 26.7148L41.4492 30.9648L55.8008 17.0352ZM37.4289 12.6789L35.3039 14.8039L49.4461 28.9461L51.5711 26.8211L37.4289 12.6789ZM35.2723 14.8357L21.3973 28.8357L35.6027 42.9143L49.4777 28.9143L35.2723 14.8357ZM35.5711 28.8039L29.6961 22.9289L15.5539 37.0711L21.4289 42.9461L35.5711 28.8039ZM29.6961 22.9289L27.5711 20.8039L13.4289 34.9461L15.5539 37.0711L29.6961 22.9289ZM13.5352 20.6992L9.28525 24.8242L23.2148 39.1758L27.4648 35.0508L13.5352 20.6992ZM9.17893 39.0711L11.3039 41.1961L25.4461 27.0539L23.3211 24.9289L9.17893 39.0711ZM11.3039 41.1961L19.3039 49.1961L33.4461 35.0539L25.4461 27.0539L11.3039 41.1961ZM19.3039 49.1961L21.4289 51.3211L35.5711 37.1789L33.4461 35.0539L19.3039 49.1961ZM35.5711 51.3211L37.6961 49.1961L23.5539 35.0539L21.4289 37.1789L35.5711 51.3211ZM37.6961 49.1961L53.6961 33.1961L39.5539 19.0539L23.5539 35.0539L37.6961 49.1961Z" fill="white" mask="url(#path-1-outside-1_598_3608)" />
              </svg>
            </div>

            {/* Instruction Sent Title */}
            <h2 className="text-white text-5xl font-bold mb-4">Instruction sent</h2>

            {/* Instruction Message */}
            <p className="text-white text-lg mb-6">
              Reset password instruction is sent to your email.
            </p>

            {/* Resend and Change Email Links */}
            <div className="text-white text-sm">
              <p>
                Didn&apos;t receive any email?{' '}
                <br className='lg:hidden' />
                <Link href="/forget-password" className="text-additional-purple underline">Resend instruction</Link> |{' '}
                <Link href="/forget-password" className="text-additional-purple underline">Change email address</Link>
              </p>
            </div>
          </div>

          <div className="block lg:hidden text-center text-white mt-20 mb-12">
            <p className="bg-main-purple text-xs px-[10px] py-[5px] mb-4 font-semibold inline-block rounded-[5px]">DID YOU KNOW?</p>
            <h1 className="text-lg font-bold mb-4">AI can improve customer service</h1>
            <p className="text-xs">
              AI-powered chatbots and virtual assistants can improve customer service by providing quick and accurate responses to customer inquiries.
            </p>
          </div>

          <AuthFooter />
        </div>
      </div>
    </>
  );
};

export default PasswordResetFormSuccess;
