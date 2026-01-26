import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import api from "../../services/api";

const MobileNavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [user]);

  const fetchCartCount = async () => {
    if (user) {
      try {
        const res = await api.get(
          `/cart/${user._id}`
        );
        const count = res.data.items?.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
        setCartCount(count || 0);
      } catch {
        setCartCount(0);
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(
        cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
      );
    }
  };

  const handleProfileClick = () => {
    setMenuOpen(false);
    user ? navigate(`/profile/${user._id}`) : navigate("/login");
  };

  const handleSearch = (e) => {
    const value = e.target.value.trim();
    navigate(value ? `/cars?search=${value}` : "/cars");
    setMenuOpen(false);
  };

  return (
    <header className="md:hidden w-full bg-white shadow-md sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="flex items-center justify-between px-4 py-4">
        <img src={Logo} alt="Carnova" className="w-10" />

        <div className="flex items-center gap-4">
          <NavLink to="/cart" className="relative">
            <FaShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </NavLink>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* DROPDOWN MENU */}
      {menuOpen && (
        <div className="bg-white border-t px-4 py-4 space-y-4">
          <input
            type="text"
            placeholder="Search cars..."
            onChange={handleSearch}
            className="w-full border p-2 rounded-md"
          />

          <NavLink to="/" onClick={() => setMenuOpen(false)} className="block">
            Home
          </NavLink>

          <NavLink to="/cars" onClick={() => setMenuOpen(false)} className="block">
            Cars
          </NavLink>

          <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block">
            About
          </NavLink>

          <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block">
            Contact
          </NavLink>

          <button
            onClick={handleProfileClick}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            {user ? "Profile" : "Login / Signup"}
          </button>
        </div>
      )}
    </header>
  );
};

export default MobileNavBar;
