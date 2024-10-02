
import { useState } from 'react';
import Image from "next/image";

const PriceCard = ({ detail }) => {

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg">

            {detail?.planType === 'bronze' ?
                <div className="relative inline-block w-full mt-8">
                    <svg width="320" height="44" viewBox="0 0 320 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#875C33" />
                    </svg>
                    <div className="flex items-center absolute top-0 left-4 w-full h-full z-20">
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
                : detail?.planType === 'silver' ?
                    <div className="relative inline-block w-full mt-8">
                        <svg width="320" height="44" viewBox="0 0 320 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#B5B5B5" />
                        </svg>
                        <div className="flex items-center absolute top-0 left-4 w-full h-full ml-1">
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
                    :
                    <div className="relative inline-block w-full mt-8">
                        <svg width="320" height="44" viewBox="0 0 320 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0H320L307.5 22L320 44H0V0Z" fill="#CB9A1B" />
                        </svg>
                        <div className="flex items-center absolute top-0 left-4 w-full h-full ml-1">
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
            }
            <div className="p-4 mt-4">
            {detail?.price === "Custom Pricing" ?
                <p className="text-[40px] font-bold mb-6">{detail?.price}</p>
                :
                <p className="text-[40px] font-bold mb-6">{detail?.price}<span className='text-base'> / {detail?.duration}</span></p>
            }
            <button
                className={`w-full text-white font-semibold py-2 rounded-lg mb-6 ${detail?.button === 'Get started' ? 'bg-[#8B60B2]' : 'bg-[#1e1e1e] border border-[#FFFFFF33]'}`}
            >
                {detail?.button}
            </button>
            <ul className="space-y-4">
                {detail?.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '14px', height: '15px', flexShrink: 0, border: '1px solid white', borderRadius: '50%', marginTop: '5px' }}>
                            <path d="M10.0898 6.46484L11.5041 7.87906L14.9183 4.46484H10.0898V6.46484ZM10.0625 6.46484L8.64829 5.05063L5.23407 8.46484H10.0625V6.46484ZM10.5273 6L11.9416 7.41421L13.3348 6.02095L11.9625 4.60705L10.5273 6ZM9.625 5.07031L11.0602 3.67736L9.64627 2.22062L8.21079 3.6561L9.625 5.07031ZM9.16016 5.53516L7.74593 4.12093L7.73962 4.1273L9.16016 5.53516ZM6.125 8.59766L4.71079 10.0119L6.13136 11.4324L7.54554 10.0055L6.125 8.59766ZM4.375 6.84766L5.78921 5.43344L4.39595 4.04018L2.98205 5.41249L4.375 6.84766ZM3.44531 7.75L2.05236 6.31484L0.59562 7.72873L2.0311 9.16421L3.44531 7.75ZM6.125 10.4297L4.71079 11.8439L6.125 13.2581L7.53921 11.8439L6.125 10.4297ZM7 12.75C4.22176 12.75 2 10.5282 2 7.75H-2C-2 12.7374 2.01262 16.75 7 16.75V12.75ZM2 7.75C2 4.99401 4.22684 2.75 7 2.75V-1.25C2.00753 -1.25 -2 2.79505 -2 7.75H2ZM7 2.75C9.7509 2.75 12 4.9991 12 7.75H16C16 2.78996 11.96 -1.25 7 -1.25V2.75ZM12 7.75C12 10.5232 9.75599 12.75 7 12.75V16.75C11.9549 16.75 16 12.7425 16 7.75H12ZM10.0898 4.46484H10.0625V8.46484H10.0898V4.46484ZM11.4767 7.87906L11.9416 7.41421L9.11313 4.58579L8.64829 5.05063L11.4767 7.87906ZM11.9625 4.60705L11.0602 3.67736L8.18984 6.46326L9.09218 7.39295L11.9625 4.60705ZM8.21079 3.6561L7.74594 4.12094L10.5744 6.94937L11.0392 6.48453L8.21079 3.6561ZM7.73962 4.1273L4.70446 7.1898L7.54554 10.0055L10.5807 6.94301L7.73962 4.1273ZM7.53921 7.18344L6.25406 5.89829L3.42563 8.72671L4.71079 10.0119L7.53921 7.18344ZM6.25406 5.89829L5.78921 5.43344L2.96079 8.26187L3.42563 8.72671L6.25406 5.89829ZM2.98205 5.41249L2.05236 6.31484L4.83826 9.18516L5.76795 8.28282L2.98205 5.41249ZM2.0311 9.16421L2.49594 9.62906L5.32437 6.80063L4.85953 6.33579L2.0311 9.16421ZM2.49594 9.62906L4.24594 11.3791L7.07437 8.55063L5.32437 6.80063L2.49594 9.62906ZM4.24594 11.3791L4.71079 11.8439L7.53921 9.01547L7.07437 8.55063L4.24594 11.3791ZM7.53921 11.8439L8.00406 11.3791L5.17563 8.55063L4.71079 9.01547L7.53921 11.8439ZM8.00406 11.3791L11.5041 7.87906L8.67563 5.05063L5.17563 8.55063L8.00406 11.3791Z" fill="white" mask="url(#path-1-outside-1_497_3101)" />
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
