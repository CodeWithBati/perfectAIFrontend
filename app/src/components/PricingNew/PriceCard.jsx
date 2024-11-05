
import { useState } from 'react';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { toastText } from "@/constants/text-constants";
import Image from "next/image";

import { useSelector } from "react-redux";

const PriceCard = ({ detail, toggleOpen, openIndex }) => {

    const { user, token } = useSelector((state) => state.auth);

    const router = useRouter();

    const handlePayment = () => {
        if (!user) {
            toast.error(toastText.error.loginFirst);
            router.push('/registerCreatePartner');
            return;
        } else {
            router.push('/directory-manager');
        }
    };

    return (
        <div className="bg-[#323639] border border-[rgba(255,255,255,0.2)] rounded-lg shadow-lg min-w-full lg:min-w-auto">

            {detail?.planType === 'bronze' ?
                <div className='flex justify-between items-center mt-8'>
                    <div className="relative inline-block lg:w-full">
                        <svg viewBox="0 0 320 44" preserveAspectRatio="none" className="w-full lg:w-auto min-h-[44px] max-h-[44px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#875C33" />
                        </svg>
                        <div className="flex items-center absolute top-0 left-4 lg:w-full h-full ml-1">
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
                    onClick={handlePayment}
                    className={`w-full text-white font-semibold px-[20px] py-[10px] rounded-lg mb-6 ${detail?.button === 'Get started' ? 'bg-[#8B60B2]' : 'bg-[#1e1e1e] border border-[#FFFFFF33]'}`}
                >
                    {detail?.button}
                </button>
                {openIndex === detail?.id && (
                    <ul className="lg:hidden space-y-4">
                        {detail?.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                                <Image width={200} height={200} quality={100} src='/images/check1.png' alt='check' className='w-[18px] h-[18px] rounded-full' style={{ flexShrink: 0, border: '2px solid white', borderRadius: '50%', }} />
                                <span className='ml-4'>{feature}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <ul className="lg:block hidden space-y-4">
                    {detail?.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                            <Image width={200} height={200} quality={100} src='/images/check1.png' alt='check' className='w-[18px] h-[18px] rounded-full' style={{ flexShrink: 0}} />
                            <span className='ml-4'>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PriceCard;
