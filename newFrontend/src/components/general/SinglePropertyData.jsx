import React from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const SinglePropertyData = ({ posts, currentData, handleNext, handlePrev }) => {
    const negotiable = posts[currentData] && posts[currentData].isNegotiable ? 'Yes' : 'No';
    const facilities = posts[currentData] && posts[currentData].facilities ? posts[currentData].facilities[0].split(',') : [];

    const handleShare = async () => {
        const property = posts[currentData];
        if (!property) return;

        const shareData = {
            title: property.propertyTitle,
            url: window.location.href, // Current URL or a specific property URL
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            // Fallback: Copy URL to clipboard
            try {
                await navigator.clipboard.writeText(shareData.url);
            } catch (error) {
                console.error('Error copying to clipboard:', error);
            }
        }
    };

    return (
        <div className=''>
            {/* Hero  */}
            <section className='relative'>
                <div className="h-[50vh] md:h-[77vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${posts[currentData] ? posts[currentData].avatar[0] : 'N/A'})` }}>
                    <div className="w-full h-full bg-black bg-opacity-30 flex items-end">
                        {/* button  */}
                        <div className='absolute bottom-16 md:bottom-20 flex justify-between w-full px-4 md:px-8 '>
                            <div className="relative h-12 w-12 md:h-16 md:w-16 border-2 border-white rounded-md flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out hover:border-transparent before:absolute before:inset-0 before:bg-[#519fff] before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-150" onClick={handlePrev}>
                                <FaArrowLeft className="text-white w-4 h-4 md:w-5 md:h-5 relative z-10" />
                            </div>
                            <div className="relative h-12 w-12 md:h-16 md:w-16 border-2 border-white rounded-md flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out hover:border-transparent before:absolute before:inset-0 before:bg-[#519fff] before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-150" onClick={handleNext}>
                                <FaArrowRight className="text-white w-4 h-4 md:w-5 md:h-5 relative z-10" />
                            </div>
                        </div>
                        {/* details and share */}
                        <div className='mx-4 md:mx-8 flex justify-between w-full'>
                            <Link to={`/postdetails/${posts[currentData] ? posts[currentData]._id : ''}`} 
                                className='relative bg-[#01bbbc] w-[30%] md:w-[20%] py-2 md:py-4 flex justify-center font-semibold text-white rounded-t-md overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#01bbbc] before:absolute before:inset-0 before:bg-[#00a0a1] before:translate-y-full before:transition-all before:duration-500 hover:before:translate-y-0 before:z-0'
                            >
                                <span className="relative z-10">Details</span>
                            </Link>
                            <button 
                                onClick={handleShare}
                                className="relative bg-[#01bbbc] w-[30%] md:w-[20%] py-2 md:py-4 flex justify-center font-semibold text-white rounded-t-md overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#01bbbc] before:absolute before:inset-0 before:bg-[#00a0a1] before:translate-y-full before:transition-all before:duration-500 hover:before:translate-y-0 before:z-0"
                            >
                                <span className="relative z-10">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Post Data */}
                <div className='flex flex-col md:flex-row justify-between mx-4 md:mx-8 h-auto md:h-64 shadow-lg rounded-b-md'>
                    {/* 1 box  */}
                    <div className='w-full md:w-[20%] flex items-center justify-center flex-col py-4 md:py-0'>
                        <div className='space-y-1'>
                            <h2 className='text-[#848486] text-sm font-bold'>FOR SALE</h2>
                            <p className='text-2xl font-bold flex gap-2'>
                                रु <span>{posts[currentData] ? posts[currentData].price.amount : 'N/A'}</span>
                                per <span>{posts[currentData] ? posts[currentData].price.sizePerAmount : 'N/A'}</span>
                            </p>
                        </div>
                    </div>
                    {/* 2 box  */}
                    <div className='w-full md:w-[60%] flex items-center justify-center flex-col py-4 md:py-0'>
                        <div className='w-[90%] md:w-[60%] space-y-4'>
                            <h2 className='text-2xl md:text-3xl font-bold'>{posts[currentData] ? posts[currentData].propertyTitle : 'N/A'}</h2>
                            <p className='space-x-2 md:space-x-4 text-sm font-semibold uppercase text-[#848486]'>
                                {facilities.map((facility, index) => (
                                    <span key={index} className='bg-gray-200 px-2 py-1 rounded'>{facility}</span>
                                ))}
                            </p>
                            <p className='text-[#515151] text-justify line-clamp-5'>{posts[currentData] ? posts[currentData].description : 'N/A'}</p>
                        </div>
                    </div>
                    {/* 3 box  */}
                    <div className='w-full md:w-[20%] flex items-center justify-center flex-col py-4 md:py-0'>
                        <div className='h-auto md:h-[70%] w-[90%] md:w-[80%] space-y-6 text-[#848486]'>
                            {/* 1 st row  */}
                            <div className='flex w-full justify-between'>
                                <div className='flex flex-col gap-2 w-[50%]'>
                                    <p className='font-semibold'>Category</p>
                                    <span className='text-[#515151] capitalize'>{posts[currentData] ? posts[currentData].landCategory : 'N/A'}</span>
                                </div>
                                <div className='flex flex-col gap-2 w-[50%]'>
                                    <p className='font-semibold'>Type</p>
                                    <span className='text-[#515151] capitalize'>{posts[currentData] ? posts[currentData].landType : 'N/A'}</span>
                                </div>
                            </div>
                            {/* 2nd row  */}
                            <div className='flex w-full justify-between'>
                                <div className='flex flex-col gap-2 w-[50%]'>
                                    <p className='font-semibold'>Size</p>
                                    <div className='flex gap-1'>
                                        <span className='text-[#515151]'>{posts[currentData] ? posts[currentData].area.size : 'N/A'}</span>
                                        <span className='text-[#515151]'>{posts[currentData] ? posts[currentData].area.unit : 'N/A'}</span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2 w-[50%]'>
                                    <p className='font-semibold'>Negotiable</p>
                                    <span className='text-[#515151]'>{negotiable}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SinglePropertyData;