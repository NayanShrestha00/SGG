import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserSummaryApi } from "../../../features/common/UserSummaryApi";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { FacebookProvider, EmbeddedVideo } from 'react-facebook';
import { useDispatch } from "react-redux";
import { handleError, handleSuccess } from "../../../utils/Toast";
import { startLoading, stopLoading } from "../../../store/loading";


const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    images: [],
    price: { amount: '', sizePerAmount: '' },
    facilities: [], // Initialize facilities as an empty array
    propertyTitle: '',
    description: '',
    landCategory: '',
    landType: '',
    area: { size: '', unit: '' },
    isNegotiable: false,
    facebookVideoLink: '',
    youtubeVideoLink: '',
    propertyOverView: ''
  });
  const [currentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const facilities = post.facilities && post.facilities.length > 0 ? post.facilities[0].split(',') : []; // Check if facilities exists and is not empty
  const negotiable = post.isNegotiable ? 'Yes' : 'No';
  const videoUrl = post.facebookVideoLink ? post.facebookVideoLink.trim() : '';
  const youtubeUrl = post.youtubeVideoLink ? post.youtubeVideoLink.trim() : '';
  const token = useSelector((state) => state.auth.accessToken);
  const [selectedImage, setSelectedImage] = useState(null);

  const [data, setData] = useState({
    fullName: "",
    mobileNumber: "",
    message: "",
  });



  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(UserSummaryApi.PostDetails(postId).url);
        setPost(response.data.data || {
          images: [],
          price: { amount: '', sizePerAmount: '' },
          facilities: [], // Ensure facilities is initialized
          propertyTitle: '',
          description: '',
          landCategory: '',
          landType: '',
          area: { size: '', unit: '' },
          isNegotiable: false,
          videoLink: '',
          propertyOverView: '',
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const viewCount = async () => {
      try {
        const response = await axios.post(UserSummaryApi.ViewCount(postId).url, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      }
      catch (error) {
        console.error("Error fetching view count:", error);
      }
    };

    viewCount();
    fetchData();
  }, [postId]);

  const handleNext = () => {
    if (currentImage < post.images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  const handlePrev = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  const handleShare = async () => {
    const property = post;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(startLoading());
    try {
      const response = await axios.post(UserSummaryApi.BuyerForm(postId).url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleSuccess(response.data.message);
      setData({
        fullName: "",
        mobileNumber: "",
        message: "",
      });
    } catch (error) {
      handleError(error.response.data.message);
    }
    dispatch(stopLoading());
  };

  console.log(post);

  return (
    <>
      <div>
        <section className='relative'>
          <div className="h-[50vh] md:h-[77vh] md:w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${post.images[currentImage] || 'N/A'})` }}>
            <div className="w-full h-full bg-black bg-opacity-30 flex items-end">
              <div className='absolute bottom-20 flex justify-between w-full px-4 md:px-8'>
                <div className="relative h-12 w-12 md:h-16 md:w-16 border-2 border-white rounded-md flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out hover:border-transparent before:absolute before:inset-0 before:bg-[#519fff] before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-150" onClick={handlePrev}>
                  <FaArrowLeft className="text-white w-5 h-5 relative z-10" />
                </div>
                <div className="relative h-12 w-12 md:h-16 md:w-16 border-2 border-white rounded-md flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-700 ease-out hover:border-transparent before:absolute before:inset-0 before:bg-[#519fff] before:scale-0 before:transition-transform before:duration-700 before:ease-out hover:before:scale-150" onClick={handleNext}>
                  <FaArrowRight className="text-white w-5 h-5 relative z-10" />
                </div>
              </div>
              <div className='mx-4 md:mx-8 flex justify-between w-full'>
                <div className="relative bg-[#01bbbc] w-[45%] md:w-[20%] py-2 md:py-4 flex justify-center font-semibold text-white rounded-t-md overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#01bbbc] before:absolute before:inset-0 before:bg-[#00a0a1] before:translate-y-full before:transition-all before:duration-500 hover:before:translate-y-0 before:z-0">
                  <span className="relative z-10">Details</span>
                </div>
                <div className="relative bg-[#01bbbc] w-[45%] md:w-[20%] py-2 md:py-4 flex justify-center font-semibold text-white rounded-t-md overflow-hidden cursor-pointer transition-all duration-500 hover:bg-[#01bbbc] before:absolute before:inset-0 before:bg-[#00a0a1] before:translate-y-full before:transition-all before:duration-500 hover:before:translate-y-0 before:z-0" onClick={handleShare}>
                  <span className="relative z-10">Share</span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:flex-row justify-between mx-4 md:mx-8 my-4 md:my-8 h-auto md:h-64 shadow-lg rounded-b-md'>
            <div className='w-full md:w-[20%] flex items-center justify-center flex-col my-4 md:my-0'>
              <div className='space-y-1'>
                <h2 className='text-[#848486] text-sm font-bold'>FOR SALE</h2>
                <p className='text-2xl font-bold flex gap-2'>रु <span>{post.price.amount || 'N/A'} </span>
                  per
                  <span>{post.price.sizePerAmount || 'N/A'}</span>
                </p>
              </div>
            </div>
            <div className='w-full md:w-[60%] flex items-center justify-center flex-col py-4 md:py-0'>
              <div className='w-[90%] md:w-[60%] space-y-4'>
                <h2 className='text-2xl md:text-3xl font-bold'>{post.propertyTitle || 'N/A'}</h2>
                <p className='space-x-2 md:space-x-4 text-sm font-semibold uppercase text-[#848486]'>
                  {facilities.map((facility, index) => (
                    <span key={index} className='bg-gray-200 px-2 py-1 rounded'>{facility}</span>
                  ))}
                </p>
                <p className='text-[#515151] text-justify line-clamp-5'>{post.description || 'N/A'}</p>
              </div>
            </div>
            <div className='w-full md:w-[20%] flex items-center justify-center flex-col my-4 md:my-0'>
              <div className='h-[70%] w-[80%] space-y-6 text-[#848486]'>
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-semibold'>Category</p>
                    <span className='text-[#515151]'>{post.landCategory || 'N/A'}</span>
                  </div>
                  <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-semibold'>Type</p>
                    <span className='text-[#515151]'>{post.landType || 'N/A'}</span>
                  </div>
                </div>
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col gap-2 w-[50%]'>
                    <p className='font-semibold'>Size</p>
                    <p className='flex gap-2'>
                      <span className='text-[#515151]'>{post.area.size || 'N/A'}</span>
                      <span className='text-[#515151]'>{post.area.unit || 'N/A'}</span>
                    </p>
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
        <section>
          <div className="w-full md:w-[70%] mx-auto pt-8 md:pt-32 space-y-4 flex flex-col md:flex-row">
            <div className="w-full md:w-[70%] overflow-auto scrollbar-none">
              <div className="container mx-auto px-4 space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold">Property Overview</h2>
                <p className="text-justify text-lg">{post.propertyOverView || 'No property overview available'}</p>
              </div>
              <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-4 mx-auto">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="image"
                      className="w-full h-44 object-cover rounded-md"
                      onClick={() => setSelectedImage(image)}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[30%] flex items-center my-8 md:my-0">
              <div className="bg-white p-8 flex flex-col rounded-lg shadow-lg w-full transform transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Seller</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="fullName">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={data.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="mobileNumber">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      name="mobileNumber"
                      value={data.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your mobile number"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="message">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={data.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows="4"
                      placeholder="Write your message..."
                      required
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {selectedImage && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
                <div className="relative max-w-4xl w-full p-4">
                  <button
                    className="absolute top-2 right-2 text-white text-2xl font-bold"
                    onClick={() => setSelectedImage(null)}
                  >
                    &times;
                  </button>
                  <img src={selectedImage} alt="Enlarged Property" className="w-full h-auto rounded-lg shadow-lg" />
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-[70%] mx-auto">
            <div className="p-5 text-center w-full md:w-[70%] mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold mb-5">Watch the Video</h2>
              {youtubeUrl && (
                <div className="object-cover mx-auto border border-gray-300 rounded-lg overflow-hidden p-5">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeUrl.split('v=')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="w-full h-[300px] md:h-[400px]"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

    </>
  );
};

export default PostDetails;