import React from "react";

import { DateView, CategoryView, HeadingView } from "../commons";

const BlogPrev = ({ post }) => {
  const dateStr = post.created_at;

  return (
    <div className="mt-8">
      <HeadingView heading={post.title} />
      <CategoryView post={post} />
      <div className="ml-1 mt-4">
        <p className="text-sm text-gray-600">{post.user.name}</p>
        <DateView dateStr={dateStr} />
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default BlogPrev;
