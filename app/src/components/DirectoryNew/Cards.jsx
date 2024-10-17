import Image from 'next/image'
import feat2 from '../../../../public/images/feat2.jpeg'
import logo from '../../../../public/images/footer_logo.jpeg'
function Cards() {
  return (
    <div className="relative bg-[#1e1e1e] border-[1px] border-gray-400 rounded-md flex flex-col min-h-[300px] text-center items-center p-6 overflow-hidden">
      <div
        className="absolute"
        style={{
          width: '600px',
          height: '420px',
          borderRadius: '50%',
          top: '60px',
          left: '85px',
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
        <Image className='w-[40px] h-[40px] rounded-[10px] mb-4' src='/images/footer_logo.jpeg' width={40} height={40} alt='' />
        <h2 className='text-2xl font-bold text-white mb-4'>Wondering if AI tool name is suitable for your use case?</h2>
        <button className='bg-[#8B60B2] p-2 rounded-md mt-2 font-bold text-white'>Try using our Chatbot</button>
      </div>
    </div>
  )
}

export default Cards