import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { handleError } from "../../../utils/Toast";

const Posts = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10; // Match backend limit

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${AdminManagerSummaryApi.PostList.url}?page=${currentPage}&limit=${postsPerPage}`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );

                setPosts(response.data.data || []);
                setTotalPages(response.data.data.length < postsPerPage ? currentPage : currentPage + 1);
            } catch (error) {
                handleError(error.response?.data?.message || "Failed to fetch posts!");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [accessToken, currentPage]);

    return (
        <main className="flex-1 p-4 space-y-3 bg-white rounded-2xl shadow-md h-full overflow-x-hidden">
            <h1 className="text-2xl font-bold mb-4">All Posts</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading posts...</p>
            ) : posts.length === 0 ? (
                <p className="text-center text-gray-500">No posts found.</p>
            ) : (
                <div className="space-y-4">
                    {posts.map((post) => (
                        <div
                            key={post._id}
                            className="flex flex-wrap items-center border p-3 rounded-md shadow-sm bg-gray-50"
                        >
                            {/* Post Image (Check if avatar exists) */}
                            {post.avatar && post.avatar.length > 0 && (
                                <img
                                    src={post.avatar[0]}
                                    alt={`${post.managerFullName}'s avatar`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                            )}

                            {/* Post Info */}
                            <div className="flex flex-col ml-4 flex-grow">
                                <h2 className="text-lg font-semibold truncate max-w-full">{post.fullName}</h2>
                                <div className="flex flex-wrap space-x-6 max-w-full">
                                    <p className="text-sm text-gray-600 break-words">Post By: {post.managerFullName}</p>
                                    <p className="text-sm text-gray-600">Status: {post.state}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="px-4 py-2 text-lg font-semibold">
                    Page {currentPage}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={posts.length < postsPerPage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </main>
    );
};

export default Posts;
