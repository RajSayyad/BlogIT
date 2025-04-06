import React, { useState, useRef } from "react";

const ThreeDotMenu = ({ handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      {/* Three Dots Button */}
      <button
        className="rounded-full p-2 hover:bg-gray-200 focus:outline-none"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <svg
          className="h-6 w-6 text-gray-700"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="5" cy="12" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="19" cy="12" r="2" />
        </svg>
      </button>
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-28 rounded-md border bg-white shadow-lg">
          <button
            className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotMenu;
