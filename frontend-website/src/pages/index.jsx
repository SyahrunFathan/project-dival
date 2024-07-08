import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layouts = ({ children }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col w-screen h-screen overflow-x-hidden">
        <div className="flex flex-row">
          <Sidebar />
          <div className="flex flex-col w-full ml-64">
            <Navbar />
            <main className="p-4">{children}</main>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layouts;
