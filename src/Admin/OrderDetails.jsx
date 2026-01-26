import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api"

const OrderDetails = () => {
  const { id } = useParams(); // order id from URL
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await api.get(
        `/orders/${id}`
      );

      if (res.data.success) {
        setOrder(res.data.order);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-6">Loading order...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto ">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline cursor-pointer"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Order Details</h1>

      {/* ORDER INFO */}
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Customer:</strong>   {order.shippingAddress?.Firstname || "N/A"}{" "} {order.shippingAddress?.Lastname || "N/A"}</p>
        <p><strong>Email:</strong> {order.user?.email}</p>
        <p><strong>Status:</strong> {order.paymentStatus}</p>
        <p><strong>Total:</strong> ₦{order.totalAmount.toLocaleString()}</p>
        <p><strong>Address:</strong> {order.shippingAddress.address}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Car</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {order.items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-4">{item.car?.name}</td>
                <td className="p-4">₦{item.price.toLocaleString()}</td>
                <td className="p-4">{item.quantity}</td>
                <td className="p-4 font-semibold">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
