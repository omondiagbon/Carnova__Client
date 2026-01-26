import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const AddCars = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    features: "",
    inStock: true,
  });

  const [image, setImage] = useState(null); // single image

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle single image
  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // only the first file
  };

  // Submit form
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const data = new FormData();

    // Append all form fields
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    // Append single image
    data.append("image", image); // must match upload.single('image')

    try {
      await api.post("/cars/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Car uploaded successfully");
      // Optionally reset form
      setFormData({
        name: "",
        price: "",
        description: "",
        brand: "",
        model: "",
        year: "",
        mileage: "",
        features: "",
        inStock: true,
      });
      setImage(null);
      navigate('/admin/managecar')
    } catch (error) {
      console.error(error);
      alert("Upload failed: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Add New Car</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Car Name" onChange={handleChange} className="input" />
        <input name="brand" placeholder="Brand" onChange={handleChange} className="input" />
        <input name="model" placeholder="Model" onChange={handleChange} className="input" />
        <input name="year" placeholder="Year" onChange={handleChange} className="input" />
        <input name="mileage" placeholder="Mileage" onChange={handleChange} className="input" />
        <input name="price" placeholder="Price" onChange={handleChange} className="input" />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="input" />
        <input name="features" placeholder="Features (comma separated)" onChange={handleChange} className="input" />
        <input type="file" name="image" onChange={handleImageChange} className="cursor-pointer"/>
        <button className="bg-black text-white px-6 py-2 rounded cursor-pointer">Upload Car</button>
      </form>
    </div>
  );
};

export default AddCars;
