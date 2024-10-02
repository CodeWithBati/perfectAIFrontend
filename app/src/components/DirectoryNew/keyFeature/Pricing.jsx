// components/Pricing.js
export default function Pricing() {
    return (
      <section className="text-white">
        <h1 className="text-2xl font-bold">Pricing Information</h1>
        <p className="mb-4 font-bold">GetGenie AI offers several pricing plans:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#323639] p-5 rounded">
            <h3 className="font-bold text-lg mb-2">Free Plan</h3>
            <p className="text-md">
              Limited to one website, 2,500 words per month, access to all AI templates, and limited SEO analysis.
            </p>
          </div>
          <div className="bg-[#323639] p-5 rounded">
            <h3 className="font-bold text-lg mb-2">Writer Plan</h3>
            <p>
              $11.40 per month, includes 50,000 words, unlimited websites, and additional SEO analysis and image generation features.
            </p>
          </div>
          <div className="bg-[#323639] p-5 rounded">
            <h3 className="font-bold text-lg mb-2">Pro Plan</h3>
            <p>
              $29.40 per month, offers 400,000 words, extensive SEO and competitor analysis, and higher limits on image generation.
            </p>
          </div>
          <div className="bg-[#323639] p-5 rounded">
            <h3 className="font-bold text-lg mb-2">Agency Unlimited Plan</h3>
            <p>
              $59.40 per month, designed for large teams and agencies, includes 1,000,000 words, and extensive SEO and image generation capabilities.
            </p>
          </div>
        </div>
      </section>
    );
  }
  