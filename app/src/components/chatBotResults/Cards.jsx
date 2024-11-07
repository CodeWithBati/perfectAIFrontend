import Image from 'next/image'
import feat2 from '../../../../public/images/feat2.jpeg'
import logo from '../../../../public/images/footer_logo.jpeg'
function Cards() {
  return (
    <div className="relative bg-[#1e1e1e] border-[1px] border-gray-400 rounded-md flex flex-col text-center items-center p-6"
      style={{
        background: `
      radial-gradient(circle at 123% 145%, rgb(147, 95, 175) 0%, rgba(53, 60, 131, 0.5) 60%, rgba(53, 60, 131, 0) 100%) no-repeat, radial-gradient(circle at -9% -4%, rgb(71, 86, 223) 0%, rgba(53, 60, 157, 0.5) 30%, rgba(53, 60, 77, 0) 100%) no-repeat, rgb(30, 30, 30)`,
        backgroundSize: '100% 100%, 100% 100%, cover',
        backgroundBlendMode: 'lighten',
      }}
    >
      <div className='flex flex-col items-center justify-center w-full px-4'>
        <Image className='w-[40px] h-[40px] rounded-[10px] mb-4' src='/images/defaulticon5.png' width={100} height={100} alt='' />
        <p className='text-lg font-semibold text-white'>We value your feedback</p>
        <h2 className='text-sm text-white mb-4'>Help us improve by contacting<br />feedback@myperfectai.app</h2>
        {/* <button className='bg-[#8B60B2] p-2 rounded-md mt-2 font-bold text-white'>Feedback Now</button> */}
      </div>
    </div>
  )
}

export default Cards