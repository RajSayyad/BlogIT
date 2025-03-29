import React from "react";

const BlogPrev = ({ post }) => {
  const dateStr = post.created_at;
  const date = new Date(dateStr);
  const extractedDate = date.toISOString().split("T")[0];

  return (
    <div>
      <h1 className="mt-8 text-xl font-semibold tracking-tight text-gray-900 md:text-xl">
        {post.title}
      </h1>
      <p className="mt-3 line-clamp-2">{post.description}</p>
      <p className="mt-1 text-sm text-gray-400">{extractedDate}</p>
      <hr className="mt-2" />
    </div>
  );
};

export default BlogPrev;
