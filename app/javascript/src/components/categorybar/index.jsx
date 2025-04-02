import React, { useState, useEffect } from "react";

import Logger from "js-logger";
import { Search, Plus } from "lucide-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import categoryApi from "../../apis/categories";

const animatedComponents = makeAnimated();

const CategoryBar = ({ setPostCategories }) => {
  const [categories, setCategories] = useState(null);

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
  }, []);

  return (
    <div className="fixed left-16">
      <div className="h-screen w-[300px] bg-gray-300">
        <div className="flex space-x-4">
          <div className="mr-20 mt-9">
            <h1 className="text-md ml-6 font-semibold">CATEGORIES</h1>
          </div>
          <div className="mt-10">
            <Search className="text-gray-500" size={18} />
          </div>
          <div className="mt-10">
            <Plus className="text-gray-500" size={18} />
          </div>
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
  );
};

export default CategoryBar;
