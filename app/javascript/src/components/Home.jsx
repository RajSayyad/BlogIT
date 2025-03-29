import React, { useState, useEffect } from "react";

import Logger from "js-logger";

import postsAPI from "../apis/posts";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.fetch();
      setPosts(response.data.posts); // Ensure this matches your API response structure
    } catch (error) {
      Logger.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <ul>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
        Welcome to My Blog
      </h1>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li> // ✅ Fix: Correctly render post title
      ))}
    </ul>
  );
};

export default Home;
