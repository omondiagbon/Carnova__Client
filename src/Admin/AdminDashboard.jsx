import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"
import AllOrder from "./AllOrder";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logoutBtn = () => {
    localStorage.removeItem("admin");

    const confirmed = window.confirm("are you sure you want to logout?");
    if (!confirmed) return;

    navigate("/admin-login");
  };

  const [orders, setOrders] = useState([]);
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchOrders();
    alluser();
    allcars();
  }, []);

  const allcars = async () => {
    try {
      const res = await api.get("/cars/all");
      if (res.data.success) {
        setCars(res.data.cars);
      } else {
        setError("No Car In Stock");
      }
    } catch (err) {
      console.error("FETCH ERROR:", err.response?.data || err.message);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

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

  const alluser = async () => {
    try {
      const res = await api.get("/alluser");

      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <p className="text-2xl font-bold">Admin Dashboard</p>

        <button
          onClick={logoutBtn}
          className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div>
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Total Revenue */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Total Revenue</p>
              <h2 className="text-2xl font-bold text-gray-800">
                ₦{totalRevenue.toLocaleString()}
              </h2>
              <div className="mt-3 h-1 w-12 bg-green-500 rounded-full" />
            </div>

            {/* Total Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Total Orders</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {orders.length}
              </h2>
              <div className="mt-3 h-1 w-12 bg-blue-500 rounded-full" />
            </div>
            {/* {total car in stack} */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Total Cars In Stock</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {cars.length}
              </h2>
              <div className="mt-3 h-1 w-12 bg-blue-500 rounded-full" />
            </div>

            {/* Paid Orders */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Paid Orders</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {orders.filter((o) => o.paymentStatus === "paid").length}
              </h2>
              <div className="mt-3 h-1 w-12 bg-purple-500 rounded-full" />
            </div>

            {/* Users */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Total Users</p>
              <h2 className="text-2xl font-bold text-gray-800">
                {users.length}
              </h2>
              <div className="mt-3 h-1 w-12 bg-orange-500 rounded-full" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-6 mt-[80px]">All Orders</h1>

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
      </div>
    </div>
  );
};

export default AdminDashboard;
