import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const ManageCars = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Call it as a function

  const fetchCars = async () => {
    try {
      const res = await api.get("/cars/all");
      setCars(res.data?.cars);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch cars");
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;

    try {
      await api.delete(`/car/delete/${id}`);
      fetchCars(); // refresh list
    } catch (error) {
      console.error(error);
      alert("Failed to delete car");
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/update/${id}`); // ✅ Pass car id as argument
  };

  return (
    <div className="bg-gray-100 p-5 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Manage Cars</h2>

      {cars.length === 0 ? (
        <p className="text-gray-500">No cars available</p>
      ) : (
        cars.map((car) => (
          <div
            key={car._id}
            className="flex justify-between items-center bg-white p-4 rounded mb-3 shadow"
          >
            <div className="flex gap-4 items-center">
              <img
                src={
                  car.images && car.images.length > 0
                    ? `${IMAGE_URL}/uploads/${car.images[0]}`
                    : "/no-image.png"
                }
                alt={car.name}
                className="w-32 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <p className="text-gray-600">₦{car.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {car.brand} • {car.model}
                </p>
                <p className="text-xs text-gray-400">
                  {car.images.length} image(s)
                </p>
              </div>
            </div>

            <div className="space-x-4">
              <button
                onClick={() => handleEdit(car._id)} // ✅ Pass car._id here
                className="text-blue-600 hover:underline font-medium cursor-pointer"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCar(car._id)}
                className="text-red-600 hover:underline font-medium cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ManageCars;
