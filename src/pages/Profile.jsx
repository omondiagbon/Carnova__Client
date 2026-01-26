import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import api from "../services/api"

const Profile = () => {
  const navigate = useNavigate();
  const { profileid } = useParams();

  const [user, setUser] = useState(null);
  const [userorders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    fetchOrders(parsedUser._id);
  }, []);

  const fetchOrders = async (userId) => {
    try {
      const res = await api.get(
        `/user/order/${userId}`
      );

      if (res.data.success) {
        setUserOrders(res.data.orders); 
      } else {
        setError("No orders found");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    navigate("/logout");
  };

  return (
    <section className="min-h-screen bg-gray-950 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back,{" "}
            <span className="text-blue-500">
              {user ? user.username : "Loading..."}
            </span>
          </h1>
          <p className="text-gray-400 mt-2">
            Here’s a summary of your account and recent activity.
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* LEFT: USER INFO */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
                {user?.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold">
                  {user ? user.username : "Loading..."}
                </p>
                <p className="text-sm text-gray-400">Profile ID: {profileid}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full py-3 mt-4 rounded-xl bg-red-600 hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          </div>

          {/* RIGHT: DETAILS */}
          <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">Account Details</h2>

            <div className="space-y-4">
              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Username</span>
                <span>{user ? user.username : "Loading..."}</span>
              </div>

              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Email</span>
                <span>{user?.email || "Not available"}</span>
              </div>

              <div className="flex justify-between border-b border-gray-800 pb-3">
                <span className="text-gray-400">Account Status</span>
                <span className="text-green-500 font-medium">Active</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-400">Member Since</span>
                <span>{user?.createdAt || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          
          <div className="space-y-4">
            {userorders.map((order) => (
              <div
                key={order._id}
                className="border border-gray-800 rounded-xl p-4 flex justify-between"
              >
                <div>
                  <p className="font-medium">Order ID</p>
                  <p className="text-sm text-gray-400">{order._id}</p>
                </div>

                <div>
                  <p className="font-medium">Total</p>
                  <p className="text-green-500 font-semibold">
                    ₦{order.totalAmount?.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-blue-400 capitalize">
                    {order.paymentStatus}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
