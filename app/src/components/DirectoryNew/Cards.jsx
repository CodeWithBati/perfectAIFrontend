import Image from 'next/image'

import Link from "next/link";
import feat2 from '../../../../public/images/feat2.jpeg'
import logo from '../../../../public/images/footer_logo.jpeg'


function Cards({directory}) {
  return (
    <div className="relative bg-[#1e1e1e] border-[1px] border-gray-400 rounded-md flex flex-col min-h-[300px] text-center items-center p-4 overflow-hidden">
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '420px',
          borderRadius: '50%',
          top: '70px',
          left: '80px',
          transform: 'rotate(180deg)',
          background:
            'radial-gradient(41.73% 41.73% at 50% 52.76%, #935FAF 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
          backgroundBlendMode: 'lighten',
        }}
      ></div>

      <div
        className="absolute"
        style={{
          width: '600px',
          height: '420px',
          borderRadius: '50%',
          top: '-150px',
          right: '30px',
          transform: 'rotate(180deg)',
          background:
            'radial-gradient(41.73% 41.73% at 50% 52.76%, #353C83 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
          backgroundBlendMode: 'lighten',
        }}
      ></div>
      <div className='relative z-10 flex flex-col items-center justify-center w-full p-0 lg:p-6'>
        <Image className='w-[50px] h-[50px] rounded-[10px] mb-4' src='/images/defaulticon-dark.png' width={100} height={100} alt='' />
        <h2 className='text-2xl font-bold text-white mb-4'>Wondering if {directory?.name} is suitable for your use case?</h2>
        <Link href='/' className='bg-[#8B60B2] p-2 rounded-md mt-2 font-bold text-white'>Try using our Chatbot</ Link>
      </div>
    </div>
  )
}

export default Cards