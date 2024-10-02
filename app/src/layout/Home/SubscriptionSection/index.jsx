import Container from '@/app/src/components/global/Container';
import Section from '@/app/src/components/global/Section';
import PlanCard from './PlanCard';
const SubscriptionSection = () => {
  return (
    <Section className='w-full pt-16 md:pt-20 lg:pt-24 xl:pt-28 pb-2 bg-white dark:bg-slate-900 overflow-hidden'>
      <Container>
        <div className='flex flex-wrap items-center justify-center pb-8 lg:pb-12'>
          <div className='w-full sm:w-7/12 text-center mx-auto'>
            <h3 className='text-3xl sm:text-[2.5rem] leading-tight font-bold text-slate-700 dark:text-slate-400 mb-3'>
              MyPerfectAI recommends your AI tool to the right customers.
            </h3>
          </div>
        </div>
        <div className='flex flex-wrap justify-center -m-3 md:-m-4'>
          <PlanCard
            title='Customized Listing'
            price='$4.99'
            duration='/Month'
            credits='2000'
            members='5'
            features={[
              'Create trust with a verified listing',
              'Increase MyPerfectAI chatbot recommendations & SEO ranking by creating a detailed, custom tool description',
              'Add photos, videos & pricing information',
              'Monthly data insights',
              'Update listing details anytime',
              'Indexed on Google'
            ]}
            buttonText='Subscribe'
            buttonColor='bg-blue-600'
            commingSoon={true}
            link="/register"
          />
          <PlanCard
            title='Featured Listing'
            price='Custom Pricing'
            credits='2000'
            members='5'
            features={[
              'Increase exposure with placement on the MyPerfectAI home screen',
              'Priority ranking in directory',
              'All Customized listing features included',
              'Pricing is unique to your tool\'s category size & your promotional objectives',
              'Priority when contacting us & updating listing details',
            ]}
            buttonText='Coming Soon'
            buttonColor='bg-blue-600'
            link="#"
          />
          <PlanCard
            title='Additional Promotion'
            price='Custom Pricing'
            credits='90000'
            members='30'
            features={[
              'Gain exposure for your tool with customized promotion including:',
              'Newsletter promotion',
              'Social media promotion',
              'Blog promotion',
              'Sponsorship',
            ]}
            buttonText='Coming Soon'
            buttonColor='bg-slate-400 text-slate-700 border border-slate-200 hover:bg-blue-600 hover:border-blue-600 hover:text-white'
            link="#"
          />
        </div>
      </Container>
    </Section>
  );
};

export default SubscriptionSection;
