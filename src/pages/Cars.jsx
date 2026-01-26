import React, { useEffect, useState } from "react";
import Pagination from "../components/common/Pagination";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Cars = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;

  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 8;
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const fetchCars = async () => {
    try {
      const res = await api.get("/cars/all");
      setCars(res.data?.cars || []);
    } catch (error) {
      console.error("Failed to fetch cars:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleClick = (id) => {
    if (!userId) {
      navigate("/login");
      return;
    }
    navigate(`/cars/${id}`);
  };

  // Pagination logic
  const indexOfLastCar = currentPage * itemsPerPage;
  const indexOfFirstCar = indexOfLastCar - itemsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(cars.length / itemsPerPage);

  return (
    <>
      <p className="mx-16 my-10 font-bold text-4xl text-gray-800">
        Find Your New Car
      </p>

      <div className="mx-6 md:mx-12 lg:mx-16 my-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {currentCars.map((car) => (
          <div
            key={car._id}
            className="group bg-white rounded-2xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={
                  car.images?.length > 0
                    ? `${IMAGE_URL}/uploads/${car.images[0]}`
                    : "/no-image.png"
                }
                alt={car.name}
                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Price badge */}
              <span
                className="absolute top-3 right-3 bg-black/80 text-white 
        text-sm font-semibold px-3 py-1 rounded-full"
              >
                ₦{Number(car.price).toLocaleString()}
              </span>
            </div>

            {/* Content */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-900">{car.name}</h3>
                <span className="text-sm text-gray-500">{car.year}</span>
              </div>

              <p className="text-sm text-gray-500">
                Mileage: <span className="font-medium">{car.mileage} mi</span>
              </p>

              <button
                onClick={() => handleClick(car._id)}
                className="mt-4 w-full bg-black text-white py-2.5 rounded-xl font-medium tracking-wide hover:bg-gray-800 transition-colors duration-200"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      <br />
    </>
  );
};

export default Cars;
