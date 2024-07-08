import React from "react";
import { IoMdLogOut } from "react-icons/io";
import {
  IoBicycleOutline,
  IoCarOutline,
  IoFlameOutline,
  IoHomeOutline,
  IoMedkitOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="w-[20%] bg-gray-800 flex flex-col shadow-sm p-4 h-screen fixed">
      <NavLink
        to={"/dashboard"}
        className="flex items-start pb-4 border-b border-b-gray-700"
      >
        <img
          src={"https://placehold.co/32x32"}
          className="w-8 h-8 rounded object-cover"
          alt=""
        />
        <span className="text-lg font-bold text-white ml-3">DONOR</span>
      </NavLink>
      <ul className="mt-4 flex-1">
        <li
          className={
            "mb-1 group " + (location.pathname === "/dashboard" ? "active" : "")
          }
        >
          <NavLink
            to={"/dashboard"}
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoHomeOutline className="mr-3 text-lg" />
            Dashboard
          </NavLink>
          <ul className="pl-2">
            <li>
              <span className="text-gray-300 text-sm">Menu</span>
            </li>
          </ul>
        </li>
        <li
          className={
            "mb-1 group " + (location.pathname === "/rs" ? "active" : "")
          }
        >
          <NavLink
            to={"/rs"}
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoMedkitOutline className="mr-3 text-lg" />
            Rumah Sakit
          </NavLink>
        </li>
        <li
          className={
            "mb-1 group " + (location.pathname === "/graph" ? "active" : "")
          }
        >
          <NavLink
            to={"/graph"}
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoBicycleOutline className="mr-3 text-lg" />
            Graph
          </NavLink>
        </li>
        <li
          className={
            "mb-1 group " + (location.pathname === "/darah" ? "active" : "")
          }
        >
          <NavLink
            to={"/darah"}
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoFlameOutline className="mr-3 text-lg" />
            Darah
          </NavLink>
          <ul className="pl-2">
            <li>
              <span className="text-gray-300 text-sm">Master</span>
            </li>
          </ul>
        </li>
        <li
          className={
            "mb-1 group " +
            (location.pathname === "/pengantaran" ? "active" : "")
          }
        >
          <NavLink
            to={"/pengantaran"}
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoCarOutline className="mr-3 text-lg" />
            Pengantaran
          </NavLink>
        </li>
        <li className="mb-1 group">
          <a
            href="#"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoPersonOutline className="mr-3 text-lg" />
            User
          </a>
        </li>
      </ul>
      <ul className="border-t border-t-gray-700">
        <li className="mb-1 group">
          <a
            href="#"
            className="flex items-center py-2 px-4 text-gray-300 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-700 group-[.active]:text-white"
          >
            <IoMdLogOut className="mr-3 text-lg" />
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
