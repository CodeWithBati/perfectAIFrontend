import Image from "next/image"
import Header from "../../layout/Header/HeaderNew"
import blog1 from '../../../../public/images/blog1.jpeg'
import Footer from "../../layout/FooterNew"


function AboutUs() {
  return (
    <section className="relative flex flex-col items-center justify-center min-w-screen min-h-screen pt-20 lg:pt-32 pb-16 text-white bg-center bg-no-repeat bg-[#181C1F] lg:bg-cover bg-[url('/images/mobileSomeBg.png')] lg:bg-[url('/images/someBg.png')]">


      <div className="min-h-screen text-white">
        <div className="lg:max-w-4xl w-full mx-auto px-[30px] lg:px-6">
          {/* About Us Section */}
          <section className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-6">About MyPerfectAI</h1>
            <p className="text-lg">
              MyPerfectAI is redefining how professionals and SMEs discover and
              implement AI tools, offering a uniquely curated, reliable, and
              easy-to-navigate platform. We believe that access to powerful AI
              solutions should be seamless and trustworthy, guiding users to
              impactful solutions that genuinely fit their needs.
            </p>
            <h2 className="text-2xl lg:text-3xl font-bold mb-6 mt-6">Uncompromising Approval and Verification Process</h2>
            <p className="text-lg mt-4">
              At MyPerfectAI, quality is non-negotiable. Our Approval and
              Verification Process is crafted to ensure that every tool in our directory
              meets the highest standards in business value, technical robustness,
              and user experience. Unlike many AI directories that focus on
              quantity, we prioritize relevance, credibility, and effectiveness.
            </p>
          </section>

          {/* Image */}
          {/* <div className=" mb-8 lg:mb-16">
            <Image
              src={blog1} // Assuming the image is located in the public folder
              alt="Visual Search"
              width={800}
              height={550}
              className="w-full object-cover rounded-lg"
            />
          </div> */}

          {/* Visual Search Section */}
          <section className="text-center">
            <p className="text-xl lg:text-2xl mb-4">Here’s a look at our criteria:</p>
            <p className="text-base lg:text-lg mb-4">
              Business Impact: Every tool must provide clear, measurable
              value, addressing real business challenges across industries and
              showcasing a solid ROI. We evaluate documented case studies
              and gather industry feedback to validate each tool’s potential
              impact.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Technical Excellence: Only tools with proven accuracy,
              scalability, and adherence to top security standards make the
              cut. We leverage industry benchmarks to ensure each tool can
              handle demanding, real-world applications.
            </p>
            <p className="text-base lg:text-lg mb-4">
              User-Friendly Design: Intuitive interfaces, comprehensive
              documentation, and ease of integration with common enterprise
              platforms (like ERP and CRM systems) are essential. We
              prioritize tools that make implementation straightforward and
              productivity-enhancing.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Vendor Credibility: We select tools from providers with strong
              track records, industry recognition, and positive client
              testimonials. This ensures that our users are working with tools
              backed by reputable vendors invested in continuous
              improvement.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Innovation and Future-Readiness: The AI landscape is
              fast-moving, and we prioritize tools that demonstrate a
              commitment to ongoing R&D, frequent updates, and a clear
              future roadmap.
            </p>
          </section>
          <p className="text-base lg:text-lg mb-4 text-center">
            Through this meticulous multi-stage vetting process, only the highest
            quality AI tools are selected to be featured in the MyPerfectAI
            directory. This ensures that our users can trust the recommendations
            they receive, knowing that each tool has passed our rigorous
            standards.
          </p>

          <section className="text-center">

            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Our Advanced AI System: Your Personal AI Consultant</h2>
            <p className="text-base lg:text-lg mb-4">
              At the heart of MyPerfectAI is a powerful AI system, built on advanced
              ChatGPT-4o architecture. It’s more than just a recommendation
              engine—it’s a virtual AI consultant designed to understand and
              respond to your unique needs with speed and accuracy. Our AI
              analyzes user prompts with exceptional precision, transforming
              complex requirements into tailored, high-quality recommendations in
              seconds.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Users can leverage our 4-Step Prompt Guide to communicate their
              requirements clearly, allowing our AI to provide highly relevant
              recommendations across a wide array of use cases. Until now, finding
              the right AI tools has often required a time-consuming and confusing
              process, involving searches on Google, navigating overpopulated AI
              directories, sorting through paid promotions, or relying on sponsoredcontent—often without a clear understanding of what truly suits their
              needs. MyPerfectAI changes that by delivering focused, unbiased
              solutions in seconds, providing clarity in a complex market.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-6">Our Vision: Leading the AI Adoption Journey</h2>
            <p className="text-base lg:text-lg mb-4">
              As AI continues to transform industries, MyPerfectAI is committed to
              being a leader in guiding professionals and SMEs through this
              evolution. We are focused on continuous platform enhancements,
              including expanding our directory to encompass the latest and most
              innovative tools.
            </p>
            <p className="text-base lg:text-lg mb-4">
              In addition, we are preparing to launch an exclusive newsletter that
              will provide insights into AI advancements, tips on maximizing AI in
              business, and updates on industry trends. This newsletter will serve
              as an essential resource for our users, equipping them with the
              knowledge to make informed decisions and stay ahead of the curve.
            </p>
            <p className="text-base lg:text-lg mb-4">
              And there’s even more to come—our team is hard at work on several
              exciting developments that will elevate MyPerfectAI’s capabilities and
              further enhance our users’ experience. While we can’t share all the
              details just yet, rest assured that we have big plans in store, aiming to
              push the boundaries of AI discovery and application.
            </p>
            <p className="text-base lg:text-lg mb-4">
              Join us on this journey as we build the future of AI accessibility,
              transforming how businesses of all sizes discover, implement, and
              benefit from AI technology. With MyPerfectAI, the power of AI is within
              reach—trustworthy, tailored, and always advancing.
            </p>
          </section>
        </div>
      </div>

    </section>

  )
}

export default AboutUs
