import React, { useState } from "react";
import Login_img from "../assets/login-img.jpg";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../services/api"

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    let newError = { ...error };

    if (user.username === "") newError.username = "this field is required";
    else newError.username = "";

    const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (user.email.trim() === "") {
      newError.email = "this field is required";
    } else if (!email_regex.test(user.email.trim())) {
      newError.email = "please enter a valid email";
    } else {
      newError.email = "";
    }

    if (user.password === "") {
      newError.password = "this field is required";
    } else {
      newError.password = "";
    }

    setError(newError);

    if (Object.values(newError).some((x) => x !== "")) {
      return;
    }

    try {
      const response = await api.post(
        "/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const createdUser = response.data.user;
      // Save user
      localStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data);
      alert("Registration Successful");

      // clear form after success
      setUser({
        username: "",
        email: "",
        password: "",
      });

      // Redirect to home
      navigate("/");
    } catch (err) {
      console.error(err.response?.data);

      // Show backend errors if any
      if (err.response?.data) {
        setError((prev) => ({ ...prev, ...err.response.data }));
      }
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

          <h1 className="text-3xl font-bold mb-2">Register Your Account Here</h1>
          <p className="text-gray-600 mb-6">
            Sign up to start your journey with carnova.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error && <p>{error.username}</p>}
            </div>

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
              Sign In
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <hr className="flex-1 border-slate-300 dark:border-slate-700" />
            <NavLink to="/login">
              <p className="text-blue-700 text-lg cursor-pointer"> Login </p>
            </NavLink>
            <hr className="flex-1 border-slate-300 dark:border-slate-700" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
