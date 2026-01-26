import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    inStock: true,
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchCar = async () => {
      const res = await api.get(`/car/${id}`);
      setForm({
        name: res.data.name,
        price: res.data.price,
        description: res.data.description,
        brand: res.data.brand,
        model: res.data.model,
        year: res.data.year,
        mileage: res.data.mileage,
        inStock: res.data.inStock,
      });
      setExistingImages(res.data.images || []);
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    images.forEach((img) => data.append("images", img));

    await api.put(`/car/update/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Car updated successfully");
    navigate("/admin/managecar");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Edit Car</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          multiple
          onChange={(e) => setImages([...e.target.files])}
        />
        <div className="flex gap-3 mt-3">
          {existingImages.map((img, i) => (
            <img
              key={i}
              src={`${IMAGE_URL}/uploads/${img}`}
              className="w-24 h-16 object-cover rounded"
            />
          ))}
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
