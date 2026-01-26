import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"
const AllOrder = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/all/order");

      if (res.data.success) {
        setOrders(res.data.orders);
        setTotalRevenue(res.data.totalRevenue);
      } else {
        setError("No orders found");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading orders...</p>;
  }
  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  const handleClick = (id) => {
    navigate(`/admin/order/${id}`);
  };

  return (
    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">All Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td
                  onClick={() => handleClick(order._id)}
                  className="p-4 text-sm cursor-pointer"
                >
                  {order._id}
                </td>
                <td className="p-4">
                  {order.shippingAddress?.Firstname || "N/A"}{" "}
                  {order.shippingAddress?.Lastname || "N/A"}
                </td>
                <td className="p-4">{order.user?.email || "N/A"}</td>
                <td className="p-4 font-semibold">
                  ₦{order.totalAmount.toLocaleString()}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="p-6 text-center text-gray-500">No orders found</p>
        )}
      </div>
    </div>
  );
};

export default AllOrder;
