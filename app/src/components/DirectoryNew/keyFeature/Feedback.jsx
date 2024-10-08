
import React from 'react';

const Feedback = () => {
    return (
        <div className="p-6 bg-[#323639] rounded-lg border border-[rgba(255,255,255,0.2)] text-white">
            {/* Star rating */}
            <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className="w-5 h-5 text-[#8B60B2]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.601 1.796 8.213L12 18.896l-7.732 4.224 1.796-8.213L.004 9.306l8.332-1.151z" />
                    </svg>
                ))}
            </div>

            {/* Title */}
            <h3 className="text-sm mb-2">Huge potential</h3>

            {/* Description */}
            <p className="text-white text-sm mb-4 line-clamp-5">
                In my opinion, GetGenie AI has the ability to completely revolutionize the WordPress community. I&apos;m hoping for them to release Boss Mode and give GetGenie a unique selling point since I believe it&apos;s a big deal.
            </p>

            {/* Author section */}
            <div className="flex items-center mt-4">
                <img
                    className="w-[40px] h-[40px] rounded-[6.56px] mr-4"
                    src="https://via.placeholder.com/40" // Replace with actual image URL
                    alt="Theresa Webb"
                />
                <div className="text-base font-semibold">There is a Webb</div>
            </div>
        </div>
    );
};

export default Feedback;
