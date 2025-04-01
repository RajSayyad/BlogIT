import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Link } from "react-router-dom";

import postsAPI from "../../apis/posts";
import BlogPrev from "../blogprev";
import { HeadingView } from "../commons";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await postsAPI.fetch();
      setPosts(response.data.posts);
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Link to="/post/create">
        <button
          className="fixed right-4 mb-2 me-2 inline-flex items-center rounded-lg bg-[#050708] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 dark:focus:ring-[#050708]/50"
          type="button"
        >
          Add new Blog Post
        </button>
      </Link>
      <HeadingView heading="Blog Posts" />
      {posts.map(post => (
        <Link key={post.id} to={`/post/${post.slug}`}>
          <BlogPrev post={post} />
        </Link>
      ))}
    </>
  );
};

export default Dashboard;
