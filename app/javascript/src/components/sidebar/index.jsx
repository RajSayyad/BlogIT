import React from "react";

import { Book, ListStart, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: <Book size={16} />, path: "/" },
    { name: "Blog Posts", icon: <ListStart size={16} />, path: "/about" },
  ];

  const menuItems1 = [
    { name: "Settings", icon: <Settings size={16} />, path: "/settings" },
    { name: "Logout", icon: <LogOut size={16} />, path: "/logout" },
  ];

  return (
    <div>
      {/* Toggle Button */}
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full transform bg-white shadow-lg ${"w-16"} flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* {!isOpen ? (
          <button
            className="m-3 rounded-lg bg-gray-200 p-2 hover:bg-gray-300"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={24} />
          </button>
        ) : (
          <div className="flex items-center justify-between border-b p-4">
            <span className="text-lg font-semibold text-cyan-700">BLOG-IT</span>
            {isOpen && (
              <button
                className="rounded-full p-1 hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>
            )}
          </div>
        )} */}
        {/* Menu Items */}
        <ul className="space-y-2 p-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                to={item.path}
                className={`flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 ${
                  location.pathname === item.path ? "bg-gray-200" : ""
                }`}
              >
                {item.icon}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <ul className="fixed bottom-0 left-0 w-full space-y-2 bg-gray-800 p-4 text-center text-white">
            {menuItems1.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-600 ${
                    location.pathname === item.path ? "bg-gray-800" : ""
                  }`}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
