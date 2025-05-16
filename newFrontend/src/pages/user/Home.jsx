import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PostCard, SinglePropertyData } from "../../components";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import { Link } from "react-router-dom";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading";
import { motion, AnimatePresence } from "framer-motion";

// Floating Menu Component
const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".floating-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-10 right-8 floating-container flex flex-col items-end md:hidden z-30">
      {/* Parent Transparent Container */}
      <div className="relative flex flex-col items-center">
        {/* Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute bottom-20 right-1 flex flex-col items-center space-y-3 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4 border border-gray-200/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Seller Button */}
              <Link to="/sellerform">
                <motion.div
                  className="w-48 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg flex items-center justify-center cursor-pointer transition-all border border-gray-200/50 shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium text-sm">Seller Form</span>
                </motion.div>
              </Link>

              {/* Buyer Button */}
              <Link to="/enquaryform">
                <motion.div
                  className="w-48 px-6 py-3 bg-white hover:bg-gray-50 text-gray-800 rounded-lg flex items-center justify-center cursor-pointer transition-all border border-gray-200/50 shadow-sm"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-medium text-sm">Enquiry Form</span>
                </motion.div>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <motion.div
          className="w-14 h-14 bg-[#1d2228] text-white rounded-full flex justify-center items-center 
                     shadow-2xl cursor-pointer text-lg font-bold backdrop-blur-md transition-all"
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <span className="text-xl">✖</span>
          ) : (
            <span className="text-2xl">📋</span>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [currentData, setCurrentData] = useState(0);
  const [statsData, setStatsData] = useState(null);

  // Hero Section Navigation
  const handleNext = () => {
    if (currentData < featuredPosts.length - 1) {
      setCurrentData(currentData + 1);
    }
  };

  const handlePrev = () => {
    if (currentData > 0) {
      setCurrentData(currentData - 1);
    }
  };

  // Fetching the Featured Posts
  useEffect(() => {
    const fetchData = async () => {
      dispatch(startLoading());
      try {
        const response = await axios.get(UserSummaryApi.FeaturePosts.url);
        setFeaturedPosts(response.data.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Fetching Stats Data
  useEffect(() => {
    const fetchStatsData = async () => {
      dispatch(startLoading());
      try {
        const response = await axios.get(UserSummaryApi.StatsData.url);
        setStatsData(response.data.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchStatsData();
  }, [dispatch]);

  // Fetching recent posts
  useEffect(() => {
    const fetchPostsData = async () => {
      dispatch(startLoading());
      try {
        const response = await axios.get(UserSummaryApi.Posts.url);
        setPosts(response.data.data.allPost.slice(0, 8));
      } catch (error) {
        console.error("Error fetching posts data:", error);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchPostsData();
  }, [dispatch]);

  // Dynamic Category Data using Stats Data
  const categoriesData = {
    commercial: {
      image: './commercial.jpg',
      title: 'Commercial',
      icon: './commercial_icon.png',
      listing: statsData?.commercial || 0,
    },
    residential: {
      image: './residential.jpg',
      title: 'Residential',
      icon: './residential_icon.png',
      listing: statsData?.residential || 0,
    },
    land: {
      image: './land.jpg',
      title: 'Land',
      icon: './land_icon.png',
      listing: statsData?.land || 0,
    },
    apartment: {
      image: './apartment.jpg',
      title: 'Apartment',
      icon: './apartment_icon.png',
      listing: statsData?.apartment || 0,
    },
    house: {
      image: './house.jpg',
      title: 'House',
      icon: './home_icon.png',
      listing: statsData?.house || 0,
    },
    flat: {
      image: './flat.jpg',
      title: 'Flat',
      icon: './flat_icon.png',
      listing: statsData?.flat || 0,
    },
  };

  return (
    <>
      {/* Hero Section */}
      <SinglePropertyData
        posts={featuredPosts}
        currentData={currentData}
        handlePrev={handlePrev}
        handleNext={handleNext}
      />

      {/* Category Section */}
      <section className="md:mt-[5%] mt-[12%] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl mx-auto space-y-14">
          <div className="space-y-3 text-center sm:text-left">
            <p className="text-lg font-bold text-[#519fff]">Categories</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Browse By Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.keys(categoriesData).map((key) => {
              const category = categoriesData[key];
              return (
                <Link to={`/post/${key}`} key={key}>
                  <div
                    className="flex flex-col justify-between bg-cover h-56 rounded-md transform transition-transform duration-300 hover:-translate-y-2 bg-[#ffffffcc] hover:bg-[#ffffff]"
                    style={{ backgroundImage: `url(${category.image})` }}
                  >
                    <div className="w-14 h-14 bg-inherit m-4 rounded-full flex items-center justify-center transition-colors duration-500 hover:bg-[#fffff]">
                      <img src={category.icon} alt={category.title} className="h-9" />
                    </div>
                    <div className="w-[90%] mx-auto bg-inherit h-[40%] mb-4 rounded-md p-6 transition-colors duration-500 hover:bg-[#fffff]">
                      <p className="text-[#101737] text-lg font-bold">{category.title}</p>
                      <span className="text-[#848486] font-semibold">{category.listing} Listings</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Recent Post Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[5%] space-y-14">
        <div className="space-y-3 text-center sm:text-left">
          <p className="text-lg font-bold text-[#519fff]">Find Your Home</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Recent Listings</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} posts={post} />
          ))}
        </div>
      </section>

      {/* Enquiry Section */}
      <section className="w-full flex justify-center pb-20 pt-10 relative px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl bg-[#01bbbc] shadow-lg rounded-lg overflow-hidden px-6 py-8 text-white relative">
          <div className="absolute top-0 w-full h-80 bg-[#02a6a8] transform skew-x-[-115deg] opacity-50"></div>
          <div className="relative flex flex-col md:flex-row items-center p-6 space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-[50%] text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Need More <span className="block">Information On</span> Real Estate?
              </h3>
            </div>
            <div className="w-full md:w-[50%] text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold">Enquiry for Properties</h3>
              <p className="text-sm mt-2">
                Let us assist you in finding the perfect property.
              </p>
              <button
                onClick={() => navigate("/enquaryform")}
                className="mt-4 px-6 py-2 border-white border-2 text-white font-semibold rounded-md hover:bg-white transition hover:text-black hover:border-transparent"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Download Our App Section */}
      <section className="w-full flex justify-center pb-20 pt-10 relative px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-gray-200 rounded-lg shadow-lg">
        <div className="py-10 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Download Our App
            </h2>
            <p className="text-gray-600 mt-2 max-w-md">
              Explore properties with ease, anytime and anywhere. Find your perfect home at your fingertips.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white hover:bg-gray-50 transition-all shadow-sm">
              <FaGooglePlay className="text-blue-500 text-xl" />
              <span className="text-sm md:text-base">Coming Soon</span>
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-900 bg-white hover:bg-gray-50 transition-all shadow-sm">
              <FaApple className="text-black text-xl" />
              <span className="text-sm md:text-base">Coming Soon</span>
            </button>
          </div>
        </div>
      </div>
    </section>

      {/* Floating Menu */}
      <FloatingMenu />
    </>
  );
};

export default Home;