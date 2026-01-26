import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

const CarDetails = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const res = await api.get(`/car/${id}`);
        setCar(res.data);
      } catch (error) {
        console.error("Fetch car error:", error);
      }
    };

    fetchCar();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }

    if (!car || !car._id) {
      alert("Car not found");
      return;
    }

    try {
      const userId = user._id;

      // Get current cart
      let cartItems = [];
      try {
        const res = await api.get(`/cart/${userId}`);
        cartItems = res.data.items || [];
      } catch {
        cartItems = [];
      }

      // Check if car already exists
      const existing = cartItems.find((item) => {
        const id = item.carId?._id || item.carId;
        return id === car._id;
      });

      if (existing) {
        existing.quantity += 1;
      } else {
        cartItems.push({
          carId: car._id.toString(),
          quantity: 1,
        });
      }

      // Prepare clean items
      const cleanItems = cartItems
        .filter((item) => item.carId) // remove items without carId
        .map((item) => ({
          carId: item.carId?._id?.toString() || item.carId.toString(),
          quantity: item.quantity,
        }));

      await api.post(`/cart/${userId}`, {
        items: cleanItems,
      });

      navigate("/cart");
    } catch (error) {
      console.error(
        "Add to cart error:",
        error.response?.data || error.message,
      );
      alert("Failed to add to cart.");
    }
  };

  if (!car) return <h2 className="p-5">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Car Image */}
        <div className="w-full">
          <img
            src={
              car.images?.[0]
                ? `${IMAGE_URL}/uploads/${car.images[0]}`
                : "/placeholder.png"
            }
            alt={car.name}
            className="w-full h-[420px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Car Details */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">
              {car.name}
            </h1>
            <p className="text-lg text-gray-500 mt-1">{car.brand}</p>
          </div>

          {/* Price */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 inline-block">
            <p className="text-3xl font-bold text-red-600">
              ₦{car.price?.toLocaleString() || "N/A"}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed">
            {car.description || "No description available."}
          </p>

          {/* Specs */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col bg-gray-100 rounded-lg p-3">
              <span className="text-gray-500">Model</span>
              <span className="font-semibold">{car.model}</span>
            </div>

            <div className="flex flex-col bg-gray-100 rounded-lg p-3">
              <span className="text-gray-500">Year</span>
              <span className="font-semibold">{car.year}</span>
            </div>

            <div className="flex flex-col bg-gray-100 rounded-lg p-3">
              <span className="text-gray-500">Mileage</span>
              <span className="font-semibold">{car.mileage}</span>
            </div>

            <div className="flex flex-col bg-gray-100 rounded-lg p-3">
              <span className="text-gray-500">Features</span>
              <span className="font-semibold truncate">{car.features}</span>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={handleAddToCart}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl transition duration-300 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
