import React, { useState } from "react";

import Logger from "js-logger";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import postsAPI from "../../apis/posts";

const Create = () => {
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await postsAPI.create({
        title: postTitle,
        description: postDescription,
      });

      toast.success("New Post Created");
      setPostTitle("");
      setPostDescription("");
    } catch (error) {
      toast.error("Error");
      Logger.error("Error creating post:", error);
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 md:text-4xl">
        New Blog Post
      </h1>
      <div className="mt-6 flex h-full w-full items-center justify-center rounded-lg border border-gray-300 p-6 shadow-lg">
        <div className="flex h-96 w-full flex-col gap-4 rounded-lg bg-white p-4">
          <form className="flex flex-1 flex-col gap-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <label className="mb-1 block text-gray-600" htmlFor="title">
                Title*
              </label>
              <input
                required
                className="h-12 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="title"
                type="text"
                value={postTitle}
                onChange={e => setPostTitle(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label className="mb-1 block text-gray-600" htmlFor="description">
                Description*
              </label>
              <textarea
                required
                className="h-24 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="description"
                value={postDescription}
                onChange={e => setPostDescription(e.target.value)}
              />
            </div>
            <div className="flex w-full justify-end gap-4">
              <button
                className="w-28 rounded-lg border border-gray-700 bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-400"
                type="button"
                onClick={() => {
                  setPostTitle("");
                  setPostDescription("");
                }}
              >
                Cancel
              </button>
              <button
                className="w-28 rounded-lg border border-gray-700 bg-[#050708] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#050708]/90 focus:outline-none focus:ring-4 focus:ring-[#050708]/50"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Create;
