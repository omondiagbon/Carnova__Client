import React from "react";
import Button from "../common/Button";
import Featured from "../home/Featured";
import icon from "../../assets/react.svg";
import Offer from "./Offer";

import { useNavigate } from "react-router-dom";
//icon
import { FaCar } from "react-icons/fa";

//image
import Homebg_img from "../../assets/bghomeimg.jpeg";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const HomeHeader = () => {
  const navigate = useNavigate()

  const handleShop = () =>{
    navigate("/cars")
  }
     
  return (
    <div>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 bg-black/40"></div>

        <img
          src={Homebg_img}
          alt="Background"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center text-white px-16">
          <h1 className="text-4xl md:text-6xl font-bold capitalize mb-3">
            Find your next dream
          </h1>

          <p className="text-2xl font-semibold mb-10">
            Explore thousands of new and used cars
          </p>

          <Button
            title={"Shop All Cars"}
            others={"text-white bg-blue-500 hover:bg-blue-700"}
            icon={true}
            handleClick={handleShop}
          />
        </div>
      </div>

      <Featured />

      <div className="text-center mt-20 mb-20 px-6 ">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="capitalize text-4xl font-extrabold text-gray-900">
            Buy your car in 3 easy steps
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            A seamless experience from browsing to delivery.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <FaCar size={70} className="w-16 mx-auto mb-5" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Find Your Car
            </h2>
            <p className="text-gray-600">
              Browse our extensive inventory and find the perfect vehicle for
              you.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <MdOutlinePayment size={70} className="w-16 mx-auto mb-5" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Secure Payment
            </h2>
            <p className="text-gray-600">
              Make a safe and smooth payment with our trusted and secure system.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
            <TbTruckDelivery  size={70} className="w-16 mx-auto mb-5" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Fast Delivery
            </h2>
            <p className="text-gray-600">
              Sit back and relax — your car will be delivered to your doorstep.
            </p>
          </div>
        </div>
      </div>

       <Offer />
    </div>
  );
};

export default HomeHeader;
