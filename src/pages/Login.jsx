import React, { useState } from "react";
import Login_img from "../assets/login-img.jpg";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import api from "../services/api"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = { ...error };
    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (user.email.trim() === "") newError.email = "This field is required";
    else if (!email_regex.test(user.email.trim()))
      newError.email = "Please enter a valid email";
    else newError.email = "";

    if (user.password === "") newError.password = "This field is required";
    else newError.password = "";

    setError(newError);
    if (Object.values(newError).some((x) => x !== "")) return;

    try {
      const response = await api.post(
        "/login",
        user,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      alert("Login Successful ");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data?.error) alert(err.response.data.error);
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left image section */}
      <div className="w-1/2 hidden md:block">
        <img
          src={Login_img}
          alt="login"
          className="w-full h-screen object-cover"
        />
      </div>

      {/* Right form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-[90%] max-w-md">
          <img src={Logo} alt="carnova" width={60} className="mb-5" />

          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-6">
            Sign in to continue your journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p>{error.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p>{error.password}</p>}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              Login
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <hr className="flex-1 border-slate-300 dark:border-slate-700" />
            <NavLink to="/register">
              <p className="text-blue-700 text-lg cursor-pointer"> sign in </p>
            </NavLink>
            <hr className="flex-1 border-slate-300 dark:border-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
