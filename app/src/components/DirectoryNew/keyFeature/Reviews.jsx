// components/Reviews.js
export default function Reviews() {
  return (
    <section className="text-white">
      <h2 className="text-2xl font-bold mb-5">Reviews</h2>
      <div className="flex">
        <div className="border-r border-r-dashed pr-4" style={{ borderRightStyle: 'dashed' }}>
          <div className="flex items-center mb-2">
            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7 14.25C3.11719 14.25 0 11.1328 0 7.25C0 3.39453 3.11719 0.25 7 0.25C10.8555 0.25 14 3.39453 14 7.25C14 11.1328 10.8555 14.25 7 14.25ZM10.0898 5.96484H10.0625L10.5273 5.5L9.625 4.57031L9.16016 5.03516L6.125 8.09766L4.83984 6.8125L4.375 6.34766L3.44531 7.25L3.91016 7.71484L5.66016 9.46484L6.125 9.92969L6.58984 9.46484L10.0898 5.96484Z" fill="#3AFCAB" />
            </svg>
            <span className="font-bold">Positive</span>
          </div>
          <p className="text-sm">Users appreciate the seamless WordPress integration, comprehensive SEO tools, and ease of use.</p>
        </div>
        <div className="border-r border-r-dashed pr-4 ml-2" style={{ borderRightStyle: 'dashed' }}>
          <div className="flex items-center mb-2">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7.66699 14.25C3.78418 14.25 0.666992 11.1328 0.666992 7.25C0.666992 3.39453 3.78418 0.25 7.66699 0.25C11.5225 0.25 14.667 3.39453 14.667 7.25C14.667 11.1328 11.5225 14.25 7.66699 14.25ZM10.3193 5.5L9.41699 4.59766L8.95215 5.0625L7.66699 6.34766L6.38184 5.0625L5.91699 4.59766L4.9873 5.5L5.45215 5.96484L6.7373 7.25L5.45215 8.53516L4.9873 9L5.91699 9.92969L6.38184 9.46484L7.66699 8.17969L8.95215 9.46484L9.41699 9.92969L10.3193 9L9.85449 8.53516L8.56934 7.25L9.85449 5.96484L10.3193 5.5Z" fill="#FC503A" />
            </svg>

            <span className="font-bold">Negative</span>
          </div>
          <p className="text-sm">Some users find the lack of unlimited word generation and certain SEO features per month limiting.</p>
        </div>
        <div className="ml-2">
          <div className="flex items-center mb-2" style={{ borderRightStyle: 'dashed' }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M7.33301 14.25C3.4502 14.25 0.333008 11.1328 0.333008 7.25C0.333008 3.39453 3.4502 0.25 7.33301 0.25C11.1885 0.25 14.333 3.39453 14.333 7.25C14.333 11.1328 11.1885 14.25 7.33301 14.25ZM4.92676 5.28125V5.47266H6.23926V5.30859C6.23926 5.17188 6.32129 5.08984 6.45801 5.08984H7.98926C8.23535 5.08984 8.42676 5.25391 8.42676 5.5C8.42676 5.63672 8.34473 5.77344 8.20801 5.85547L7.00488 6.53906L6.67676 6.73047V7.11328V7.46875V8.125H7.98926V7.49609L8.86426 6.97656C9.38379 6.67578 9.73926 6.10156 9.73926 5.5C9.73926 4.54297 8.94629 3.75 7.98926 3.75H6.45801C5.61035 3.75 4.92676 4.46094 4.92676 5.28125ZM6.67676 10.3125H7.98926V9H6.67676V10.3125Z" fill="#BF96E4" />
            </svg>

            <span className="font-bold">Mixed</span>
          </div>
          <p className="text-sm">
            While the tool is highly praised for its capabilities, the learning curve and some minor interface issues are noted as drawbacks.
          </p>
        </div>
      </div>
    </section>
  );
}
