// components/ProsCons.js
export default function ProsCons() {
    return (
      <section className="text-white">
        <h2 className="text-2xl font-bold mb-5">Pros/Cons Comparison</h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="border-r border-white" style={{ borderRightStyle: 'dashed' }}>
            <h3 className="font-bold mb-2">Pros</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Seamless integration with WordPress.</li>
              <li>Comprehensive SEO optimization tools.</li>
              <li>Wide range of AI templates for diverse content needs.</li>
              <li>User-friendly interface and easy setup.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-2">CONS</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Limited word count on lower plans.</li>
              <li>Some SEO features have monthly limits.</li>
              <li>Occasional issues with the content score tab visibility.</li>
            </ul>
          </div>
        </div>
      </section>
    );
  }
  