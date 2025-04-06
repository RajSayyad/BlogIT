import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import postsAPI from "../../apis/posts";
import { HeadingView, DateView } from "../commons";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchMyPosts = async () => {
    try {
      const response = await postsAPI.myPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.error?.[0] || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, [refreshKey]);

  // Whenever you want to re-fetch:
  const refreshPosts = () => setRefreshKey(prev => prev + 1);

  const onDelete = async slug => {
    try {
      const response = await postsAPI.deletePost(slug);
      toast.success(response.data.message);
      refreshPosts();
      history.push("/");
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-4">
        <HeadingView heading="My Blog Posts" />
        <p className="ml-2 mt-14 font-semibold">{posts.length} Articles</p>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    id="checkbox-all-search"
                    type="checkbox"
                  />
                  <label className="sr-only" htmlFor="checkbox-all-search">
                    checkbox
                  </label>
                </div>
              </th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Last Updated Date</th>
              <th className="px-6 py-3">Published</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                key={post.id}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      className="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      id={`checkbox-post-${index}`}
                      type="checkbox"
                    />
                    <label
                      className="sr-only"
                      htmlFor={`checkbox-post-${index}`}
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                  scope="row"
                >
                  {post.title}
                </th>
                <td className="w-24 truncate px-6 py-4">
                  {`${post.categories
                    ?.map(c => c.name) // get names
                    .join(", ") // join into a single string
                    .split(" ") // split into words
                    .slice(0, 3) // take first 3 words
                    .join(" ")}...`}
                </td>
                <td className="px-6 py-4">
                  <DateView dateStr={post.updated_at} />
                </td>
                <td className="px-6 py-4">
                  {post.is_bloggable ? "Yes" : "Draft"}
                </td>
                <td className="flex items-center space-x-3 px-6 py-4">
                  <Link
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    to={`/post/${post.slug}/edit`}
                  >
                    Edit
                  </Link>
                  <button
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => onDelete(post.slug)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPosts;
