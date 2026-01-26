import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegCreditCard } from "react-icons/fa6";
import axios from "axios";
import api from "../services/api";

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const IMAGE_URL = import.meta.env.VITE_IMAGE_URL;


  const [details, setDetails] = useState({
    Firstname: "",
    Lastname: "",
    email: "",
    address: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
      return;
    }

    const User = JSON.parse(user);
    setUser(User);
    setDetails((prev) => ({ ...prev, email: User.email }));
    fetchCart(User._id);
  }, []);

  const fetchCart = async (userId) => {
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

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const total =
    cart?.items?.reduce((sum, item) => {
      if (!item.carId || !item.carId.price) return sum;
      return sum + item.carId.price * item.quantity;
    }, 0) || 0;

  // PAYSTACK
  const handleCheckout = () => {
    if (!window.PaystackPop) {
      alert("Paystack not loaded");
      return;
    }

    if (!details.Firstname || !details.Lastname || !details.address) {
      alert("Please fill all required fields");
      return;
    }

    if (!total) {
      alert("Cart is empty");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: details.email,
      amount: total * 100,
      currency: "NGN",
      ref: `carnova_${Date.now()}`,

      callback:  function (response) {
        try {
          const verify =  api.post(
            "/order/verify",
            {
              reference: response.reference,
              userId: user._id,
              address: details,
            }
          );

          if (verify.data.success) {
            alert("Payment successful");
            navigate("/cars");
          } else {
            alert("Payment verification failed");
          }
        } catch (err) {
          // console.error(err);
          // alert("Server error during verification");
        }
      },

      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  if (loading) return <p className="p-5">Loading checkout...</p>;
  if (!cart || cart.items.length === 0)
    return <p className="p-5">Your cart is empty</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT SIDE – FORMS */}
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Fill the order below to complete your purchase
          </h1>

          <input
            name="Firstname"
            value={details.Firstname}
            placeholder="First Name"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <input
            name="Lastname"
            value={details.Lastname}
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            value={details.email}
            disabled
            className="border p-3 rounded w-full bg-gray-100"
          />
          <input
            name="address"
            value={details.address}
            placeholder="address"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="city"
            value={details.city}
            placeholder="City"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
          <input
            name="country"
            value={details.country}
            placeholder="Country"
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />

          <div className="flex items-center gap-3 border rounded-lg p-4">
            <FaRegCreditCard size={22} />
            <span className="font-medium">Pay securely with Paystack</span>
          </div>
        </div>

        {/* RIGHT SIDE – ORDER SUMMARY (UNCHANGED) */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Order Summary
          </h1>

          <div className="space-y-4">
            {cart.items.map((item) => {
              if (!item.carId || typeof item.carId === "string") return null;
              const car = item.carId;

              return (
                <div
                  key={car._id}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={`${IMAGE_URL}/uploads/${car.images[0]}`}
                      alt={car.name}
                      className="w-24 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="font-semibold">{car.name}</h2>
                      <p>₦{car.price.toLocaleString()}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>

                  <p className="font-semibold">
                    ₦{(car.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center border-t pt-6">
            <h2 className="text-xl font-bold">
              Total: ₦{total.toLocaleString()}
            </h2>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 cursor-pointer"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
