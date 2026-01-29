import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {


  return (
      <nav className="space-y-1">
        <Link
          to="/admin/dashboard"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Orders
        </Link>

        <Link
          to="/admin/addcars"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
          Add Cars
        </Link>

        <Link
          to="/admin/managecar"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
          Manage Cars
        </Link>

        <Link
          to="/admin/siteuser"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
        >
          <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
          Users
        </Link>
      </nav>
  );
};

export default AdminSidebar;
