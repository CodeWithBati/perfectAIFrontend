import Image from 'next/image';
import Link from 'next/link';

import Container from '@/app/src/components/global/Container';
import Section from '@/app/src/components/global/Section';
import { PARTNERS_DATA, TEMPLATES_DATA } from '@/app/src/data/landingPageData';

const StatsSection = () => {
  return (
    <Section className='w-full pt-16 md:pt-20 pb-16 md:pb-20 lg:pb-24 xl:pb-28 bg-slate-50 overflow-hidden'>
      <Container>
        <div className='text-center pb-6'>
          <p className='text-base/7 font-semibold text-slate-600'>
            Trusted by most popular players in the tech.
          </p>
        </div>
        <div className='pb-16 md:pb-20'>
          <ul className='flex flex-wrap justify-center items-center -m-2'>
            {PARTNERS_DATA.map((item, index) => {
              return (
                <li key={index} className='p-2'>
                  <div className='p-4 sm:p-5 rounded-full flex justify-center items-center w-14 h-14 sm:h-20 sm:w-20 bg-white shadow shadow-slate-100 border border-gray-100'>
                    <Image
                      className='w-12'
                      src={item.img}
                      alt=''
                      width={800}
                      height={600}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className='flex flex-wrap justify-center pt-14 -my-3 -mx-5'>
            <div className='w-full xs:w-8/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 py-3 px-5'>
              <div className='text-center'>
                <h6 className='text-2xl font-bold text-slate-700 mb-2'>
                  10,000+
                </h6>
                <p className='text-base/7 text-slate-500'>
                  Happy blogger, marketer and agencies.
                </p>
              </div>
            </div>
            <div className='w-full xs:w-8/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 py-3 px-5'>
              <div className='text-center'>
                <h6 className='text-2xl font-bold text-slate-700 mb-2'>
                  4.9/5
                </h6>
                <p className='text-base/7 text-slate-500'>
                  Satisfaction rating from 1000+ reviews on TrustPilot.
                </p>
              </div>
            </div>
            <div className='w-full xs:w-8/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 py-3 px-5'>
              <div className='text-center'>
                <h6 className='text-2xl font-bold text-slate-700 mb-2'>
                  2,00,000+ hr
                </h6>
                <p className='text-base/7 text-slate-500'>
                  $50 million+ saved in content writing.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap items-center justify-center pb-8 lg:pb-12'>
          <div className='w-full sm:w-4/5 md:w-3/5 xl:w-2/5 text-center mx-auto'>
            <div className='text-xs inline-flex font-medium text-white bg-gradient-to-r from-blue-600 to-pink-500 px-3 py-1 tracking-wider rounded mb-2'>
              Templates
            </div>
            <h3 className='text-3xl sm:text-[2.5rem] leading-tight font-bold text-slate-700 mb-3'>
              Things you can do with our awesome tools
            </h3>
          </div>
        </div>
        <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'>
          {TEMPLATES_DATA.slice(0, 12).map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className='bg-white p-6 border border-slate-100 shadow rounded-2xl hover:ring-2 hover:ring-blue-600 transition-all'
            >
              <div className='flex flex-col gap-x-3 mb-2'>
                <div className='h-8 mb-2'>{item.icon}</div>
                <h6 className='text-lg font-bold text-slate-700'>
                  {item.name}
                </h6>
              </div>
              <p className='text-sm text-slate-500 line-clamp-3'>
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default StatsSection;
