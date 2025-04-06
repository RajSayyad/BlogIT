import React from "react";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

const Form = ({
  categories,
  categoriesDefault,
  setPostCategories,
  setPostTitle,
  setPostDescription,
  postDescription,
  postTitle,
  loading,
}) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div className="mt-6 flex h-full w-full items-center justify-center rounded-lg border border-gray-300 p-6 shadow-lg">
      <div className="flex h-96 w-full flex-col gap-4 rounded-lg bg-white p-4">
        <form className="flex flex-1 flex-col gap-4">
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
                categoriesDefault
                  ? categoriesDefault.map(category => ({
                      value: category.id,
                      label: category.name,
                    }))
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
