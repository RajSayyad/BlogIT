import React from "react";

import { DateView, CategoryView, HeadingView } from "../commons";

const BlogPrev = ({ post }) => {
  const dateStr = post.updated_at;

  return (
    <div className="mt-8">
      <HeadingView heading={post.title} />
      <CategoryView post={post} />
      <div className="ml-1 mt-4">
        <p className="text-sm text-gray-600">{post.user.name}</p>
        <div className="m-1 flex w-auto">
          <div
            className={`align-items-center rounded-xl border border-red-400 bg-red-200 ${
              post.is_bloggable ? "hidden" : " "
            }`}
          >
            <p className="px-4 text-xs">Draft</p>
          </div>
        </div>
        <DateView dateStr={dateStr} />
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default BlogPrev;
