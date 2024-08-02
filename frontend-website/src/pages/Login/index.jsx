import React, { useEffect, useState } from "react";
import { loginAdminApi } from "../../utils/apis";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../../utils/storages";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdminApi(formData);
      if (response.status === 200) {
        setItem("profile", response?.data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data.error === "email")
          return setFormError({ email: error.response.data.message });
        if (error.response.data.error === "password")
          return setFormError({ password: error.response.data.message });
      } else {
        console.log(error.response);
      }
    }
  };

  const CheckUser = () => {
    const response = getItem("profile");
    if (response) {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-3 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form className="space-y-6" onSubmit={HandleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={
                "w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:bg-white focus:outline-none " +
                (formError.email && "border-red-500")
              }
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {formError.email && (
              <p className="text-sm text-red-500">{formError.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={
                "w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-md focus:border-blue-500 focus:bg-white focus:outline-none " +
                (formError.password && "border-red-500")
              }
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {formError.password && (
              <p className="text-sm text-red-500">{formError.password}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
