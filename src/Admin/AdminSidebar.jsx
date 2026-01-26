import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {


  return (
      <nav className="space-y-1">
        <a
          href="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Dashboard
        </a>

        <a
          href="/admin/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Orders
        </a>

        <a
          href="/admin/addcars"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Add Cars
        </a>

        <a
          href="/admin/managecar"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Manage Cars
        </a>

        <a
          href="/admin/siteuser"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Users
        </a>
      </nav>
  );
};

export default AdminSidebar;
