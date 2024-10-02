import { useEffect, useState, useRef } from "react";


const SubScriptionSection = () => {

    return (
        <section className="py-10">
            <div
                className="h-[257px] relative overflow-hidden"
                style={{
                    background: '#1E1E1E',
                    backgroundBlendMode: "screen",
                }}
            >
                <div
                    className="absolute"
                    style={{
                        width: '1454px',
                        height: '1454px',
                        borderRadius: '50%',
                        top: '-600px',
                        left: '820px',
                        transform: 'rotate(180deg)',
                        background:
                            'radial-gradient(41.73% 41.73% at 50% 52.76%, #935FAF 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
                        backgroundBlendMode: 'lighten',
                    }}
                ></div>

                {/* Ellipse 3 */}
                <div
                    className="absolute"
                    style={{
                        width: '1454px',
                        height: '1454px',
                        borderRadius: '50%',
                        top: '-600px',
                        right: '700px',
                        transform: 'rotate(180deg)',
                        background:
                            'radial-gradient(41.73% 41.73% at 50% 52.76%, #353C83 0%, rgba(53, 60, 131, 0.5) 56.85%, rgba(53, 60, 131, 0) 100%)',
                        backgroundBlendMode: 'lighten',
                    }}
                ></div>
                <div className="max-w-4xl absolute top-0 left-0 right-0 text-white py-[55px] px-[70px]">
                    <h2 className="text-5xl font-bold mb-4">There&apos;s An AI For That</h2>
                    <p className="text-base mb-8">Stay up to date with the latest AI tools, by the #1 AI aggregator.</p>

                    <div className="flex justify-start items-center">
                        <input
                            type="email"
                            placeholder="EMAIL ADDRESS"
                            className="p-4 w-full max-w-md rounded-md bg-[#323639] text-white border border-[rgba(255,255,255,0.2)]"
                        />
                        <button className="ml-4 px-6 py-4 bg-[#8B60B2] text-white text-sm font-bold rounded-[5px] hover:bg-purple-600">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SubScriptionSection;
