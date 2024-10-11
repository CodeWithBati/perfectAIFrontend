
import { useState } from 'react';
import Image from "next/image";

const PriceCard = ({ detail, toggleOpen, openIndex }) => {

    return (
        <div className="bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-lg shadow-lg min-w-full lg:min-w-auto">

            {detail?.planType === 'bronze' ?
                <div className='flex justify-between items-center mt-8'>
                    <div className="relative inline-block lg:w-full">
                        <svg viewBox="0 0 320 44" preserveAspectRatio="none" className="w-full lg:w-auto min-h-[44px] max-h-[44px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#875C33" />
                        </svg>
                        <div className="flex items-center absolute top-0 left-4 lg:w-full h-full z-20">
                            <Image
                                alt="GetGenie"
                                width={40}
                                height={40}
                                src='/images/bronze.png'
                                className="rounded-[6.56px]"
                            />

                            <span className="text-white text-lg font-semibold ml-4">{detail?.plan}</span>
                        </div>
                    </div>
                    <button className="block lg:hidden px-[10px] py-[10px]" onClick={() => toggleOpen(detail?.id)}>
                        {openIndex === detail?.id ? <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 0.347656L7.46484 0.8125L12.7148 6.03516L13.1797 6.5L12.25 7.42969L11.7852 6.96484L7 2.17969L2.21484 6.96484L1.75 7.42969L0.820312 6.5L1.28516 6.03516L6.53516 0.785156L7 0.320312V0.347656Z" fill="white" />
                        </svg>
                            : <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 7.17969L6.53516 6.71484L1.28516 1.46484L0.820312 1L1.75 0.0703125L2.21484 0.535156L7 5.34766L11.7852 0.5625L12.25 0.0976562L13.1797 1L12.7148 1.46484L7.46484 6.71484L7 7.17969Z" fill="white" />
                            </svg>
                        }
                    </button>
                </div>
                : detail?.planType === 'silver' ?
                    <div className='flex justify-between items-center mt-8'>
                        <div className="relative inline-block lg:w-full">
                            <svg viewBox="0 0 320 44" preserveAspectRatio="none" className="w-full lg:w-auto min-h-[44px] max-h-[44px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#B5B5B5" />
                            </svg>
                            <div className="flex items-center absolute top-0 left-4 lg:w-full h-full ml-1">
                                <Image
                                    alt="GetGenie"
                                    width={40}
                                    height={40}
                                    src='/images/silver.png'
                                    className="rounded-[6.56px]"
                                />

                                <span className="text-black text-lg font-semibold ml-4">{detail?.plan}</span>
                            </div>

                        </div>
                        <button className="block lg:hidden px-[10px] py-[10px]" onClick={() => toggleOpen(detail?.id)}>
                            {openIndex === detail?.id ? <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 0.347656L7.46484 0.8125L12.7148 6.03516L13.1797 6.5L12.25 7.42969L11.7852 6.96484L7 2.17969L2.21484 6.96484L1.75 7.42969L0.820312 6.5L1.28516 6.03516L6.53516 0.785156L7 0.320312V0.347656Z" fill="white" />
                            </svg>
                                : <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 7.17969L6.53516 6.71484L1.28516 1.46484L0.820312 1L1.75 0.0703125L2.21484 0.535156L7 5.34766L11.7852 0.5625L12.25 0.0976562L13.1797 1L12.7148 1.46484L7.46484 6.71484L7 7.17969Z" fill="white" />
                                </svg>
                            }
                        </button>
                    </div>
                    :
                    <div className='flex justify-between items-center mt-8'>
                        <div className="relative inline-block lg:w-full">
                            <svg viewBox="0 0 320 44" preserveAspectRatio="none" className="w-full lg:w-auto min-h-[44px] max-h-[44px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#CB9A1B" />
                            </svg>
                            <div className="flex items-center absolute top-0 left-4 lg:w-full h-full ml-1">
                                <Image
                                    alt="GetGenie"
                                    width={40}
                                    height={40}
                                    src='/images/gold.png'
                                    className="rounded-[6.56px]"
                                />

                                <span className="text-white text-lg font-semibold ml-4">{detail?.plan}</span>
                            </div>
                        </div>
                        <button className="block lg:hidden px-[10px] py-[10px]" onClick={() => toggleOpen(detail?.id)}>
                            {openIndex === detail?.id ? <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 0.347656L7.46484 0.8125L12.7148 6.03516L13.1797 6.5L12.25 7.42969L11.7852 6.96484L7 2.17969L2.21484 6.96484L1.75 7.42969L0.820312 6.5L1.28516 6.03516L6.53516 0.785156L7 0.320312V0.347656Z" fill="white" />
                            </svg>
                                : <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7 7.17969L6.53516 6.71484L1.28516 1.46484L0.820312 1L1.75 0.0703125L2.21484 0.535156L7 5.34766L11.7852 0.5625L12.25 0.0976562L13.1797 1L12.7148 1.46484L7.46484 6.71484L7 7.17969Z" fill="white" />
                                </svg>
                            }
                        </button>
                    </div>
            }
            <div className="p-4 mt-4">
                {detail?.price === "Custom Pricing" ?
                    <p className="text-[40px] font-bold mb-6">{detail?.price}</p>
                    :
                    <p className="text-[40px] font-bold mb-6">{detail?.price}<span className='text-base'> / {detail?.duration}</span></p>
                }
                <button
                    className={`w-full text-white font-semibold px-[20px] py-[10px] rounded-lg mb-6 ${detail?.button === 'Get started' ? 'bg-[#8B60B2]' : 'bg-[#1e1e1e] border border-[#FFFFFF33]'}`}
                >
                    {detail?.button}
                </button>
                {openIndex === detail?.id && (
                    <ul className="lg:hidden space-y-4">
                        {detail?.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0, border: '1px solid white', borderRadius: '50%', marginTop: '5px' }}>
                                    <path d="M7 14.75C3.11719 14.75 0 11.6328 0 7.75C0 3.89453 3.11719 0.75 7 0.75C10.8555 0.75 14 3.89453 14 7.75C14 11.6328 10.8555 14.75 7 14.75ZM10.0898 6.46484H10.0625L10.5273 6L9.625 5.07031L9.16016 5.53516L6.125 8.59766L4.83984 7.3125L4.375 6.84766L3.44531 7.75L3.91016 8.21484L5.66016 9.96484L6.125 10.4297L6.58984 9.96484L10.0898 6.46484Z" fill="#8B60B2" />
                                </svg>
                                <span className='ml-4'>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <ul className="lg:block hidden space-y-4">
                    {detail?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0, border: '1px solid white', borderRadius: '50%', marginTop: '5px' }}>
                                <path d="M7 14.75C3.11719 14.75 0 11.6328 0 7.75C0 3.89453 3.11719 0.75 7 0.75C10.8555 0.75 14 3.89453 14 7.75C14 11.6328 10.8555 14.75 7 14.75ZM10.0898 6.46484H10.0625L10.5273 6L9.625 5.07031L9.16016 5.53516L6.125 8.59766L4.83984 7.3125L4.375 6.84766L3.44531 7.75L3.91016 8.21484L5.66016 9.96484L6.125 10.4297L6.58984 9.96484L10.0898 6.46484Z" fill="#8B60B2" />
                            </svg>
                            <span className='ml-4'>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PriceCard;
