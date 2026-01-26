import React from "react";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-20 px-6">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4">
        {/* Brand */}
        <div>
          <img src={Logo} alt="Carnava" className="w-32 mb-5" />
          <p className="text-sm leading-6 mb-6">
            The smarter way to buy and sell premium vehicles online. Trusted,
            transparent, and built for modern car buyers.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#" className="hover:text-white transition">
              <i className="bx bxl-facebook text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="bx bxl-instagram text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="bx bxl-twitter text-xl"></i>
            </a>
            <a href="#" className="hover:text-white transition">
              <i className="bx bxl-youtube text-xl"></i>
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/contact" className="hover:text-white transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Delivery
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
          <p className="text-sm mb-5">
            Get updates on new arrivals, exclusive deals, and premium vehicles.
          </p>

          <div className="flex rounded-xl overflow-hidden border border-gray-800">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none"
            />
            <button className="px-6 bg-white text-black text-sm font-semibold hover:bg-gray-200 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto">
        <hr className="border-gray-800 my-12" />
      </div>

      {/* Bottom */}
      <div className="pb-8 text-center text-sm text-gray-500">
        © 2025 Carnava. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
