import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router";
import { getItem, removeItem } from "../utils/storages";
import { jwtDecode } from "jwt-decode";
import { removeTokenApi } from "../utils/apis";

const Layouts = ({ children }) => {
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      const profile = getItem("profile");
      if (!profile) {
        navigate("/");
      } else {
        const decode = jwtDecode(profile?.token);
        const currentDate = new Date();

        if (decode.exp * 1000 < currentDate.getTime()) {
          const response = await removeTokenApi(profile.data.userId);
          if (response.status === 200) {
            removeItem("profile");
            navigate("/");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
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
