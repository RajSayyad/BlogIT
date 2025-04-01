import React from "react";

const CategoryView = ({ post }) => (
  <div className="flex">
    {post.categories.map(category => (
      <div
        className="mr-3 mt-2 w-auto justify-items-center rounded-xl border bg-green-200"
        key={category.id}
      >
        <div className="ml-3 mr-3 flex-1 text-sm">{category.name}</div>
      </div>
    ))}
  </div>
);

export default CategoryView;
