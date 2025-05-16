import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserSummaryApi } from "../../../features/common/UserSummaryApi";
import { PostCard } from "../../../components";
import { Link } from "react-router-dom";
import { FaHouseChimney } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Buy = () => {
  const [posts, setPosts] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;

  // Fetch posts data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${UserSummaryApi.Posts.url}?page=${currentPage}&limit=${postsPerPage}`);
        setPosts(response.data.data.allPost);
        const totalPosts = response.data.data.totalProperty;
        const calculatedTotalPages = Number(Math.ceil(totalPosts / postsPerPage));
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [currentPage]); // Add currentPage as a dependency

  // Function to handle search
  const handleSearch = async () => {
    console.log("Search term: ");
    
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="h-[55vh] bg-cover bg-center relative" style={{ backgroundImage: `url("/posts.jpg")` }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

        {/* Hero Content */}
        <div className="absolute inset-x-0 top-0 bottom-10 flex items-end text-white">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl sm:text-5xl font-bold capitalize">Property</h2>
            <div className="flex items-center gap-2 mt-4">
              <Link to="/" className="hover:text-[#519fff] transition-colors duration-300">
                <FaHouseChimney className="h-4 w-4" />
              </Link>
              <span>/</span>
              <p className="text-sm sm:text-base">Explore</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="p-6 bg-gray-100">
        <div className="max-w-6xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Search posts by category, type, or location..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="p-6 bg-gray-100 min-h-screen pt-20 w-full">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Available Posts</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post._id} posts={post} />
              ))
            ) : (
              <p className="text-center text-gray-500">No posts found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4 md:pb-20 pb-10">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          <FaArrowLeft />
        </button>
        <span className="px-4 py-2 text-lg font-semibold">
          Page {currentPage}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Buy;