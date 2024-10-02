import Image from 'next/image';

import Container from '@/app/src/components/global/Container';
import Section from '@/app/src/components/global/Section';

const RevolutionizeSection = () => {
  return (
    <Section className='w-full pt-16 md:pt-20 lg:pt-24 xl:pt-28 bg-white overflow-hidden'>
      <Container>
        <div className='relative bg-gradient-to-b from-white to-slate-50 border border-b-0 border-gray-200 rounded-t-xl p-6 sm:p-10 !pb-0'>
          <div className='flex flex-wrap items-center -m-4'>
            <div className='p-4 w-full lg:w-6/12'>
              <div className='lg:pb-10'>
                <h1 className='text-2xl sm:text-4xl/snug font-bold text-slate-700 mb-4'>
                  Revolutionize Your Copywriting Save{' '}
                  <span className='bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent'>
                    Time and Money
                  </span>
                </h1>
                <p className='text-slate-500 text-base/relaxed sm:text-lg/relaxed mb-6'>
                  Stop the drain on your resources and start investing your time
                  and money where it truly matters.
                </p>
                <button className='inline-flex justify-center font-bold text-base bg-blue-600 text-white hover:bg-blue-800 transition-all px-7 py-3 rounded-lg'>
                  Try it for Free
                </button>
              </div>
            </div>

            <div className='p-4 w-full lg:w-6/12 self-end'>
              <Image
                className='rounded-t-xl shadow-lg shadow-blue-100 border border-b-0 border-gray-200'
                src={'/images/landing/screens/copywriter.png'}
                alt=''
                width={800}
                height={600}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default RevolutionizeSection;
