import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import { GoEye } from "react-icons/go";


const PostCard = ({ posts }) => {
  const post = posts;
  const postId = post._id;
  const [views, setViews] = useState(0);
  
  
  useEffect(() => {
    const views = async () => {
      try {
        const res = await axios.get(
          `${UserSummaryApi.Views(postId).url}`
        );
        setViews(res.data.data);

      } catch (error) {
        console.error("Error fetching view count:", error);
      }
    };
    views();
  }
    , [postId]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative group">
        <img
          src={post.avatar[0]}
          alt={post.homeName}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>

        {/* View text/button on the left-hand side */}
        <div className="absolute top-3 left-3 bg-white bg-opacity-45 text-black px-2 py-1 rounded-md text-sm font-semibold shadow-md flex gap-2">
          <GoEye className=" text-xl" />
          {views}
        </div>
        <div className="absolute top-3 right-3 bg-white bg-opacity-80 text-black px-2 py-1 rounded-md text-sm font-semibold shadow-md flex gap-2">
          <p className="font-semibold"> ID: {posts.propertyId}</p>
        </div>
      </div>


      {/* Content */}
      <div className="p-6">
        
        {/* Property Title */}
        <Link to={`/postdetails/${post._id}`}>
          <h3 className="text-xl font-bold text-gray-800 hover:text-[#478adc] truncate transition-colors duration-300 cursor-pointer">
            {post.propertyTitle}
          </h3>
        </Link>

        {/* Price */}
        <p className='text-2xl font-bold flex gap-2'>रु <span>{post.price.amount || 'N/A'} </span>
        </p>

        {/* Property Details */}
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex flex-wrap capitalize">
            <div className="w-1/2">
              <p>
                <span className="font-semibold">Type:</span> <br /> {post.landType}
              </p>
              <p>
                <span className="font-semibold">Category:</span> <br /> {post.landCategory}
              </p>
            </div>
            <div className="w-1/2">
              <p>
                <span className="font-semibold truncate">Location:</span> <br /> {post.landAddress}
              </p>
              <p>
                <span className="font-semibold">Negotiable:</span> <br /> {post.isNegotiable ? "Yes" : "No"}
              </p>
            </div>


          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          <Link to={`/postdetails/${post._id}`}>
            <button className="w-full py-3 px-6 bg-[#01bbbc] text-white font-semibold rounded-lg hover:bg-[#00a0a1] transition-colors duration-300">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;