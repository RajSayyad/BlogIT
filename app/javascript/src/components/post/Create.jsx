import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import categoryApi from "../../apis/categories";
import postsAPI from "../../apis/posts";
import { HeadingView } from "../commons";

const animatedComponents = makeAnimated();

const Create = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [postCategories, setPostCategories] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await categoryApi.fetchCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        Logger.log(error);
        history.push("/");
      }
    };
    fetchCat();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await postsAPI.create({
        title: postTitle,
        description: postDescription,
        user_id: 1,
        organization_id: 1,
        category_ids: postCategories,
      });

      toast.success("New Post Created");
      setPostTitle("");
      setPostDescription("");
      history.push("/dashboard");
    } catch (error) {
      toast.error("Error");
      Logger.error("Error creating post:", error);
    }
  };

  if (loading) return <HeadingView heading="Loading" />;

  return (
    <>
      <HeadingView heading="New Blog Post" />
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
              <Select
                isMulti
                closeMenuOnSelect={false}
                components={animatedComponents}
                defaultValue={
                  categories?.length > 5
                    ? [
                        { value: categories[0].id, label: categories[0].name },
                        { value: categories[4].id, label: categories[4].name },
                      ]
                    : []
                }
                options={
                  categories
                    ? categories.map(category => ({
                        value: category.id,
                        label: category.name,
                      }))
                    : []
                }
                onChange={selectedOptions =>
                  setPostCategories(selectedOptions.map(option => option.value))
                }
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
