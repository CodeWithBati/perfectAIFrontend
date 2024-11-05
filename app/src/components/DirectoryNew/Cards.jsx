import Image from 'next/image'

import Link from "next/link";
import feat2 from '../../../../public/images/feat2.jpeg'
import logo from '../../../../public/images/footer_logo.jpeg'


function Cards({ directory }) {
  return (
    <div
      className="relative bg-[#1e1e1e] border border-gray-400 rounded-md flex flex-col text-center items-center"
      style={{
        background: `
        radial-gradient(circle at 123% 145%, rgb(147, 95, 175) 0%, rgba(53, 60, 131, 0.5) 60%, rgba(53, 60, 131, 0) 100%) no-repeat, radial-gradient(circle at -9% -4%, rgb(71, 86, 223) 0%, rgba(53, 60, 157, 0.5) 30%, rgba(53, 60, 77, 0) 100%) no-repeat, rgb(30, 30, 30)`,
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className='flex flex-col items-center justify-center w-full p-0 lg:p-6'>
        <Image className='w-[50px] h-[50px] rounded-[10px] mb-4' src='/images/defaulticon5.png' width={200} height={200} alt='' />
        <h2 className='text-2xl font-bold text-white mb-4'>Wondering if {directory?.name} is suitable for your use case?</h2>
        <Link href='/' className='bg-[#8B60B2] p-2 rounded-md mt-2 font-bold text-white'>Try using our Chatbot</ Link>
      </div>
    </div>
  )
}

export default Cards