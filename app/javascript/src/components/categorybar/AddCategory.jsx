import React, { useState } from "react";

import { X } from "lucide-react";

const AddCategory = ({ isAddCategory, handleAddCategory }) => {
  const [categoryTitle, setCategoryTitle] = useState("");

  return (
    <>
      {isAddCategory && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg">
            <div className="flex">
              <h2 className="mb-1  text-lg font-semibold">New Category</h2>
              <X className="ml-52" size={20} onClick={handleAddCategory} />
            </div>
            <label className="text-sm text-gray-400">Category title</label>
            <input
              className="w-full rounded-md border border-gray-300 p-2"
              placeholder=""
              type="text"
              value={categoryTitle}
              onChange={e => setCategoryTitle(e.target.value)}
            />
            <div className="mt-4 flex w-1/2 justify-start gap-4">
              <button
                className="align-items-center w-14 rounded-md border border-gray-700 bg-[#050708] py-1 text-xs text-white hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-[#050708]/50"
                type="submit"
              >
                Add
              </button>
              <button
                className="align-items-center w-14 rounded-md bg-white py-1 text-sm text-black hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-gray-400"
                type="button"
                onClick={() => {
                  setCategoryTitle("");
                  handleAddCategory();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCategory;
