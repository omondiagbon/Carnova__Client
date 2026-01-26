import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import api from "../../services/api"

const NavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Fetch cart count from backend if logged in, or from localStorage for guests
  const fetchCartCount = async () => {
    if (user) {
      try {
        const res = await api.get(
          `/cart/${user._id}`
        );
        const count = res.data.items
          ? res.data.items.reduce((sum, item) => sum + item.quantity, 0)
          : 0;
        setCartCount(count);
      } catch (err) {
        console.error("Failed to fetch cart count:", err);
        setCartCount(0);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setCartCount(count);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for updates from other tabs/windows
    const handleStorage = () => fetchCartCount();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [user]);

  const handleClick = () => {
    if (user) {
      navigate(`/profile/${user._id}`);
    } else {
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.trim() === "") {
      navigate("/cars");
    } else {
      navigate(`/cars?search=${value}`);
    }
  };

  return (
    <div className="hidden md:block w-full bg-[#ffffff] shadow-md sticky top-0 z-100">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-6">
        <img src={Logo} alt="carnova" width={50} height={30} />

        <nav className="flex items-center gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-700"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cars"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-700"
            }
          >
            Cars
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-700"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-semibold" : "text-gray-700"
            }
          >
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-6">
          {/* CART BUTTON WITH BADGE */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-blue-500"
          >
            <FaShoppingCart size={15} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <input
            type="text"
            placeholder="Search cars..."
            onChange={handleSearch}
            className="border p-1 rounded-md"
          />

          {user ? (
            <p
              onClick={handleClick}
              className="text-gray-700 font-medium cursor-pointer hover:text-blue-600"
            >
              Hi, {user.username}
            </p>
          ) : (
            <button
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login/Signup
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
