import React, { useState } from "react";

const SaveAndPublish = ({ handleClick }) => {
  const [currentAction, setCurrentAction] = useState("Publish");

  // const handleClick = () => {
  //   if (currentAction === "Publish") {
  //     console.log("Publishing...");
  //   } else {
  //     console.log("Saving as draft...");
  //   }
  // };

  const handleDropdownClick = () => {
    if (currentAction === "Publish") {
      setCurrentAction("Save as Draft");
    } else {
      setCurrentAction("Publish");
    }
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseLeave={() => {}} // prevents flickering in some edge cases
    >
      {/* Hover container for button + dropdown */}
      <div className="group inline-block">
        <button
          className="inline-flex items-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          type="button"
          onClick={handleClick}
        >
          {currentAction}
          <svg
            aria-hidden="true"
            className="ms-3 h-2.5 w-2.5"
            fill="none"
            viewBox="0 0 10 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 4 4-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
        <div className="absolute right-0 z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow-lg group-hover:block dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {currentAction !== "Save as Draft" ? (
              <li
                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleDropdownClick}
              >
                Save as Draft
              </li>
            ) : (
              <li
                className="block cursor-pointer px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                onClick={handleDropdownClick}
              >
                Publish
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SaveAndPublish;
