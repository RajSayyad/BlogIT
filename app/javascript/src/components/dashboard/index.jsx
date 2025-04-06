import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Link } from "react-router-dom";

import postsAPI from "../../apis/posts";
import BlogPrev from "../blogprev";
import { HeadingView } from "../commons";

const POSTS_PER_PAGE = 4;

const Dashboard = ({ postCategories }) => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsAPI.fetch();
        setPosts(response.data.posts);
      } catch (error) {
        Logger.error(error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts =
    postCategories.length === 0
      ? posts
      : posts.filter(post =>
          post.categories.some(cat => postCategories.includes(cat.id))
        );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Slice posts to only show the current page's items
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <>
      <div className="flex">
        <HeadingView heading="Blog Posts" />
        <Link to="/post/create">
          <button
            className="ml-[950px] inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-white hover:bg-[#050708]/90 focus:ring-4 focus:ring-[#050708]/50"
            type="button"
          >
            Add new Blog Post
          </button>
        </Link>
      </div>
      {currentPosts.length > 0 ? (
        currentPosts.map(post => <BlogPrev key={post.id} post={post} />)
      ) : (
        <p className="text-center text-gray-500">No posts found.</p>
      )}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-end">
          <button
            disabled={currentPage === 1}
            className={`mx-1 rounded-md px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-300"
                : "bg-black text-white"
            }`}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span className="mx-1 px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            disabled={currentPage === totalPages}
            className={`mx-1 rounded-md px-4 py-2 ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-300"
                : "bg-black text-white"
            }`}
            onClick={() =>
              setCurrentPage(prev => Math.min(prev + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Dashboard;
