import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("admin", true);
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
      console.log(import.meta.env.VITE_ADMIN_EMAIL);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-80">
        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          type="email"
          placeholder="Admin Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
