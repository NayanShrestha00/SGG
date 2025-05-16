import { useState, useEffect } from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { PostCard } from "../../../components";
import { UserSummaryApi } from "../../../features/common/UserSummaryApi";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 9;
  const bgimage = {
    flat: '/flat.jpg',
    land: '/land.jpg',
    house: '/house.jpg',
    commercial: '/commercial.jpg',
    residential: '/residential.jpg',
    apartment: '/apartment.jpg',
  }

  // Fetching the Posts
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`${UserSummaryApi.Category(category).url}?page=${currentPage}&limit=${postsPerPage}`);
        setPosts(response.data.data);
        const totalPosts = response.data.data.totalProperty;
        const calculatedTotalPages = Number(Math.ceil(totalPosts / postsPerPage));
        setTotalPages(calculatedTotalPages);
        console.log(response.data.data.totalProperty);


      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    const fetchTypeData = async () => {
      try {
        const response = await axios.get(`${UserSummaryApi.TypeData(category).url}?page=${currentPage}&limit=${postsPerPage}`);
        setPosts(response.data.data);


      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    if (category === "commercial" || category === "residential") {
      fetchTypeData();
    } else {
      fetchCategoryData();
    }
  }, [currentPage]);

  return (
    <section>
      {/* Top Part  */}
      <div className="h-[55vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${bgimage[category]})` }}>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        {/* Content */}
        <div className="absolute inset-x-0 top-0 bottom-10 flex items-end text-white">
          <div className="w-[67%] mx-auto flex flex-col gap-6">
            <h2 className="text-5xl font-bold capitalize">{`${category}`} Properties</h2>
            <div className="flex items-center gap-2">
              <Link to="/">
                <FaHouseChimney className="h-4 w-4 hover:text-[#519fff]" />
              </Link>
              <span>/</span>
              <p>Property Listing</p>
            </div>
          </div>
        </div>

      </div>
      {/* Bottom Part */}
      <div className="md:w-[80%] mx-auto">
        <section className="container mx-auto px-4 py-8  ">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} posts={post} />
            ))}
          </div>

        </section>
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
    </section>
  );
};

export default Post;
