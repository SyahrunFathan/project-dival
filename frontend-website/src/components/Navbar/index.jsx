import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="w-full border">
      <div className="py-2 px-4 bg-white flex items-center">
        <ul className="flex items-center">
          <li className="mr-1">
            <NavLink to={"/dashboard"} className="text-gray-400 text-sm">
              Dashboard
            </NavLink>
          </li>
          <li className="text-gray-600 mr-1">/</li>
          <li className="text-gray-600 mr-1">
            {location.pathname === "/dashboard"
              ? "Dashboard"
              : location.pathname === "/rs"
              ? "Rumah Sakit"
              : location.pathname === "/graph"
              ? "Graph"
              : location.pathname === "/darah"
              ? "Data Darah"
              : ""}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
