import React, { useState, useEffect } from "react";

import Logger from "js-logger";

import postsAPI from "../../apis/posts";
import BlogPrev from "../blogprev";

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
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-4xl">
        Blog Posts
      </h1>
      {posts.map(post => (
        <BlogPrev key={post.id} post={post} />
      ))}
    </>
  );
};

export default Dashboard;
