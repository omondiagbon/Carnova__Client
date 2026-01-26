// src/pages/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api"
const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await api.get("/api/logout", {
          withCredentials: true,
        });

        localStorage.removeItem("user");

        navigate("/login");
        window.location.reload();
      } catch (error) {
        console.error("Logout error:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <p className="text-lg font-medium">Logging out....</p>
    </div>
  );
};

export default Logout;
