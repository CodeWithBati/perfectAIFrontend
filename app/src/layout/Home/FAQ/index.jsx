'use client';
import Accordion from '@/app/src/components/Accordion';
import Container from '@/app/src/components/global/Container';
import Section from '@/app/src/components/global/Section';

const FAQ = () => {
  return (
    <Section className='w-full pb-10 pt-16 md:pt-20 lg:pt-24 xl:pt-28 bg-white dark:bg-slate-900 overflow-hidden'>
      <Container>
        <div className='flex flex-wrap items-center justify-center pb-8 lg:pb-10'>
          <div className='sm:w-2/3 md:w-3/5 lg:w-2/5 text-center text- mx-auto'>
            <h3 className='text-3xl leading-tight font-bold text-slate-700 dark:text-white mb-3'>
              FAQ
            </h3>
          </div>
        </div>
        <div className='flex flex-wrap justify-center -m-3 md:-m-4'>
          <div className='w-full xl:w-3/4 p-3 md:p-4'>
            <Accordion className='flex flex-col gap-3'>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl dark:text-red-900'
                header={'What is MyPerfectAI?'}
                initialEntered
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    An AI image generator is a sophisticated tool that leverages
                    advanced artificial intelligence algorithms to produce
                    realistic and unique images. By understanding patterns and
                    features from extensive datasets, it transforms given inputs
                    or concepts into visually compelling artworks.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'After clicking ‘Subscribe’, what happens next?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    The AI image generator operates by employing intricate
                    algorithms to meticulously analyze input data. By learning
                    from a vast dataset, the generator can then create images
                    that resonate with the identified patterns and features,
                    resulting in visually striking and unique outputs.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'Why create a MyPerfectAI Customized Listing?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Yes, our AI image generator is designed with a user-friendly
                    interface, making it accessible and intuitive for beginners.
                    Simply input your creative ideas, and the generator
                    seamlessly handles the complex process of image creation on
                    your behalf.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'Why do we charge a monthly subscription, instead of a one-time payment?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Depending on the platform, our AI image generator may offer
                    the flexibility for users to incorporate their own images as
                    input. This feature allows for the generation of customized
                    results, adding a personal touch to your creative endeavors.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'How long does it take for a Customized Listing to be published?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'Why do we use custom pricing for Featured Listings and Additional Promotion?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'How can you contact MyPerfectAI?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'How much user traffic will a Customized Listing receive?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'Will the MyPerfectAI chatbot recommend my AI tool?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
              <Accordion.Item
                size='lg'
                className='bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-500 shadow rounded-2xl'
                header={'How can I cancel my Customized Listing subscription?'}
              >
                <div className='max-w-3xl'>
                  <p className='text-base/7 dark:text-slate-300'>
                    Our AI image generator is versatile and can create a diverse
                    array of images. Whether you&apso;re looking for landscapes,
                    abstract art, portraits, or other styles, the generator
                    adapts to various preferences and artistic expressions,
                    providing a wide range of creative possibilities.
                  </p>
                </div>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default FAQ;
