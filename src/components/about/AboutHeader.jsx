import React from "react";
import AboutValue from "./AboutValue";
import SemiFooter from "../layout/SemiFooter";
import Bgimage from "../../assets/aboutimg.jpg";
import Bgimage2 from "../../assets/aboutimg2.jpg";

const AboutHeader = () => {
 
  return (
    <div>
      <div className="bg-gray-100 py-16 px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="relative">
            <img
              src={Bgimage}
              alt="Car showcase"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Driving the Future of Car Buying
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Experience the easiest way to buy cars online. We’re replacing the
              hassle with transparency, trust, and complete peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href=""
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition"
              >
                Browse Inventory
              </a>

              <a
                href=""
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-gray-300 text-gray-800 font-medium hover:bg-gray-100 transition"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-10">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Years in Business</p>
            <h2 className="text-2xl font-bold text-gray-800">12+</h2>
            <div className="mt-3 h-1 w-12 bg-green-500 rounded-full" />
          </div>

          {/* Total Orders */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Happy Customer</p>
            <h2 className="text-2xl font-bold text-gray-800">50K</h2>
            <div className="mt-3 h-1 w-12 bg-blue-500 rounded-full" />
          </div>

          {/* Paid Orders */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Cars Available</p>
            <h2 className="text-2xl font-bold text-gray-800">2.5K+</h2>
            <div className="mt-3 h-1 w-12 bg-purple-500 rounded-full" />
          </div>

          {/* Users */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <p className="text-sm text-gray-500 mb-2">Cities Served</p>
            <h2 className="text-2xl font-bold text-gray-800">500+</h2>
            <div className="mt-3 h-1 w-12 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Section */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Our Mission{" "}
            </h1>

            <p className="text-lg text-gray-600 max-w-lg">
              Our mission is to transform the way people buy cars by making the
              process simple, transparent, and stress-free. We believe
              purchasing a car should be exciting not complicated. We are
              committed to providing trusted vehicles, clear pricing, and a
              seamless online experience that puts customers first. By combining
              technology, integrity, and innovation, we help buyers make
              confident decisions and drive away with peace of mind.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href=""
                className="inline-flex items-center justify-center px-6 py-0.5 rounded-2xl bg-green-200 text-green-900 font-medium"
              >
                Certified Dealer
              </a>

              <a
                href=""
                className="inline-flex items-center justify-center px-6 py-0.5 rounded-2xl bg-blue-200 text-gray-800 font-medium"
              >
                Top Rated 2024
              </a>
            </div>
          </div>
          {/* Image Section */}
          <div className="relative">
            <img
              src={Bgimage2}
              alt="Car showcase"
              className="w-full rounded-2xl shadow-lg object-cover"
            />
          </div>
        </div>
      </div>

      <AboutValue />
      <SemiFooter />
    </div>
  );
};

export default AboutHeader;
