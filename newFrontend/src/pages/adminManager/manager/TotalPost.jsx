import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi';
import { useSelector } from 'react-redux';

const TotalPost = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const manager = useSelector((state) => state.auth.user);
  const [totalPosts, setTotalPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchtotalPosts = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.TotalPost(manager._id).url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setTotalPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching Total Posts:", error);
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchtotalPosts();
  }, [accessToken, manager._id]);

  const handleShowData = async (postId) => {
    try {
      const response = await axios.get(AdminManagerSummaryApi.SinglePostData(postId).url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedPost(response.data.data);
    } catch (error) {
      console.error("Error fetching Post data:", error);
      setError("Failed to fetch post details. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6 bg-gray-100 rounded-2xl shadow-md h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Total Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {totalPosts.map((post) => (
          <div
            key={post._id}
            className="flex flex-col p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleShowData(post._id)}
          >
            <img
              src={post.avatar}
              alt={post.propertyTitle}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <p className="text-lg font-semibold mb-2">{post.propertyTitle}</p>
            <p className="text-sm text-gray-600">{post.state}</p>
          </div>
        ))}
      </div>

      {selectedPost && (
  <div className="fixed inset-0 flex items-center justify-end pr-6 bg-black bg-opacity-50 p-4 w-full">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl w-full overflow-y-auto max-h-[90vh]">
      <h2 className="text-2xl font-bold mb-4">Post Details</h2>

      {/* Property Information Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Property Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#f3f4f6] p-4 rounded-lg shadow-md">
          <div>
            <p><strong>Property Title:</strong> {selectedPost.propertyTitle}</p>
            <img
              src={selectedPost.avatar}
              alt={selectedPost.propertyTitle}
              className="w-72 h-48 object-cover rounded-lg mb-4"
            />
            <p><strong>Description:</strong> {selectedPost.description}</p>
            <p><strong>State:</strong> {selectedPost.state}</p>
            <p><strong>Purpose:</strong> {selectedPost.purpose}</p>
            <p><strong>Is Negotiable:</strong> {selectedPost.isNegotiable ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p><strong>Facilities:</strong> {selectedPost.facilities.join(', ')}</p>
            <p><strong>Featured:</strong> {selectedPost.featured}</p>
            <p><strong>Created At:</strong> {new Date(selectedPost.createdAt).toLocaleDateString()}</p>
            <p><strong>Video Link:</strong> 
              <a href={selectedPost.videoLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {selectedPost.videoLink}
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
        <div className="space-y-2">
          <p><strong>Contact:</strong> {selectedPost.sellerNumber}</p>
          <p><strong>Full Name:</strong> {selectedPost.fullName}</p>
        </div>
      </div>

      {/* Manager Information Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Manager Information</h3>
        <div className="space-y-2">
          <p><strong>Manager Full Name:</strong> {selectedPost.managerFullName}</p>
          <p><strong>Manager Address:</strong> {selectedPost.managerAddress}</p>
        </div>
      </div>

      {/* Images Section */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3">Property Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {selectedPost.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Property Image ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Close Button */}
      <button
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={handleCloseModal}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default TotalPost;