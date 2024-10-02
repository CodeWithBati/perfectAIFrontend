import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null); // Close if clicked again
    } else {
      setOpenIndex(index);
    }
  };

  const faqs = [
    {
      question: 'What is MyPerfectAI?',
      answer: 'MyPerfectAI is an advanced image generation tool that uses sophisticated AI algorithms to produce realistic and unique images by transforming inputs or concepts into visually compelling artwork.',
    },
    {
      question: 'After clicking "Subscribe", what happens next?',
      answer: 'Once you click "Subscribe", your payment will be processed, and you will receive immediate access to all features, including priority ranking, listings, and promotional benefits.',
    },
    {
      question: 'Why create a MyPerfectAI Customized Listing?',
      answer: 'A customized listing helps improve visibility and search engine rankings for your tool. You can also showcase detailed information, including photos and videos, making your listing more attractive to potential users.',
    },
    {
      question: 'Why do we charge a monthly subscription, instead of a one-time payment?',
      answer: 'A monthly subscription allows for continuous updates, improvements, and ongoing support for your listing. It ensures that you are always receiving the most up-to-date features and insights.',
    },
    {
      question: 'Why do we use custom pricing for Featured Listings and Additional Promotion?',
      answer: 'Custom pricing is designed to be flexible based on the size of your tool, its category, and your promotional goals. This ensures fair and optimized promotion tailored to your specific needs.',
    },
    {
      question: 'How can you contact MyPerfectAI?',
      answer: 'You can contact us via email, our support page, or through our dedicated chatbot. We aim to respond to all inquiries within 24 hours.',
    },
    {
      question: 'How much user traffic will a Customized Listing receive?',
      answer: 'The amount of user traffic depends on several factors, including the popularity of your category and the level of promotion. Customized listings generally see a significant increase in visibility.',
    },
    {
      question: 'Will the MyPerfectAI chatbot recommend my AI tool?',
      answer: 'Yes, if your AI tool fits within the needs of the user, our chatbot will recommend it based on the customized listing, SEO rankings, and the content provided.',
    },
    {
      question: 'How can I cancel my Customized Listing subscription?',
      answer: 'You can cancel your subscription anytime through your account dashboard. Upon cancellation, your listing will remain active until the end of the current billing cycle.',
    },
  ];

  return (
    <div className="text-white py-10">
      <h2 className="text-[40px] font-bold text-center mb-10">FAQ</h2>
      <div className="max-w-4xl mx-auto ">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="border-b-[1px] border-gray-600 flex justify-between w-[770px] items-center cursor-pointer p-4 "
              onClick={() => toggleOpen(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-2xl">
                {openIndex === index ? <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 0.347656L7.46484 0.8125L12.7148 6.03516L13.1797 6.5L12.25 7.42969L11.7852 6.96484L7 2.17969L2.21484 6.96484L1.75 7.42969L0.820312 6.5L1.28516 6.03516L6.53516 0.785156L7 0.320312V0.347656Z" fill="white" />
                </svg>
                  : <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 7.17969L6.53516 6.71484L1.28516 1.46484L0.820312 1L1.75 0.0703125L2.21484 0.535156L7 5.34766L11.7852 0.5625L12.25 0.0976562L13.1797 1L12.7148 1.46484L7.46484 6.71484L7 7.17969Z" fill="white" />
                  </svg>
                }
              </span>
            </div>
            {openIndex === index && (
              <div className=" border-b-[1px] border-gray-600 p-4 w-[770px] mt-2">
                <p className='text-sm'>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
