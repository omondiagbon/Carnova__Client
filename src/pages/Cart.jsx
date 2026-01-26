import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import api from "../services/api";

const Cart = () => {
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`);
      setCart(res.data);
    } catch (err) {
      console.error(err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const updateCart = async (items) => {
    const cleanItems = items.map((item) => ({
      carId: item.carId._id || item.carId,
      quantity: item.quantity,
    }));

    const res = await api.post(`/cart/${userId}`, {
      items: cleanItems,
    });

    setCart(res.data.cart);
  };

  const increaseQty = (carId) => {
    const updated = cart.items.map((item) =>
      (item.carId._id || item.carId) === carId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    updateCart(updated);
  };

  const decreaseQty = (carId) => {
    const updated = cart.items
      .map((item) =>
        (item.carId._id || item.carId) === carId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  const removeItem = async (carId) => {
    const res = await api.delete(
      `/cart/${userId}/${carId}`
    );
    setCart(res.data.cart);
  };

  if (loading) return <p className="p-5">Loading...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="p-5">Your cart is empty</p>;

  const total = cart.items.reduce((sum, item) => {
    if (!item.carId || typeof item.carId === "string") return sum;
    return sum + item.carId.price * item.quantity;
  }, 0);

  const handleClick = () =>{
    navigate('/checkout')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.items.map((item) => {
        if (!item.carId || typeof item.carId === "string") return null;
        const car = item.carId;

        return (
          <div
            key={car._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4"
          >
            <div className="flex gap-4 items-center">
              <img
                src={`${IMAGE_URL}/uploads/${car.images[0]}`}
                alt={car.name}
                className="w-24 h-16 object-cover rounded"
              />
              <div>
                <h2 className="font-semibold">{car.name}</h2>
                <p className="text-gray-600">₦{car.price.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(car._id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQty(car._id)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(car._id)}
              className="text-red-600 font-semibold"
            >
              Remove
            </button>
          </div>
        );
      })}

      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Total: ₦{total.toLocaleString()}</h2>

       
        <Button 
        title={'Checkout'}
        others={'bg-black text-sm text-white rounded'}
        handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Cart;
