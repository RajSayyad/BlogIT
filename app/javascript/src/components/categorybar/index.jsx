import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Search, Plus } from "lucide-react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import AddCategory from "./AddCategory";

import categoryApi from "../../apis/categories";

const animatedComponents = makeAnimated();

const CategoryBar = ({ setPostCategories, setIsOpen }) => {
  const [categories, setCategories] = useState(null);
  const [isAddCategory, setIsAddCategory] = useState(false);

  const location = useLocation();

  const handleAddCategory = () => {
    setIsAddCategory(!isAddCategory);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const response = await categoryApi.fetchCategories();
        setCategories(response.data);
      } catch (error) {
        Logger.log(error);
      }
    };
    fetchCat();
  }, [categories.length]);

  return (
    <>
      <div className="fixed left-16">
        <div className="h-screen w-[300px] bg-gray-300">
          <div className="flex space-x-4">
            <div className="mr-20 mt-9">
              <h1 className="text-md ml-6 font-semibold">CATEGORIES</h1>
            </div>
            <div className="mt-10">
              <Search className="text-gray-500" size={18} />
            </div>
            <button className="mt-10" onClick={handleAddCategory}>
              <Plus className="text-gray-500" size={18} />
            </button>
          </div>
          <div className="m-5 mt-9 w-[250px]">
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
        </div>
      </div>
      <AddCategory
        handleAddCategory={handleAddCategory}
        isAddCategory={isAddCategory}
      />
    </>
  );
};

export default CategoryBar;
