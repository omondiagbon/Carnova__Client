import React from "react";
import { useEffect, useState } from "react";
import api from "../services/api"

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    alluser();
  }, []);

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

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2">Name</th>
          <th className="p-2">Email</th>
          <th className="p-2">Joined</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user._id} className="border-t">
            <td className="p-2">{user.username}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">
              {new Date(user.createdAt).toLocaleDateString()}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUsers;
