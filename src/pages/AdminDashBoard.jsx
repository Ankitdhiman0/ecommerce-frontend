import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function AdminDashBoard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        "https://e-commerce-backend-production-0ed1.up.railway.app/api/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));

    axios
      .get(" http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalAmount = (orders) => {
    return orders.products.reduce((sum, p) => sum + (p.price || 0), 0);
  };

  // Analytics
  const totalUsers = users.length;
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter((o) => o.isDelivered).length;
  const pendingOrders = orders.filter((o) => !o.isDelivered).length;

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center md:text-left">
        Admin Dashboard 👨‍💼
      </h1>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Total Users</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalUsers}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Total Orders</h3>
          <p className="text-2xl font-bold text-emerald-600">{totalOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Delivered</h3>
          <p className="text-2xl font-bold text-green-600">{deliveredOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-2xl font-bold text-yellow-500">{pendingOrders}</p>
        </div>
      </div>

      {/* User and Orders sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-emerald-600 mb-4">Users</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400">
            {users.length > 0 ? (
              users.map((u) => (
                <div
                  key={u._id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{u.username}</p>
                    <p className="text-gray-500 text-sm">{u.email}</p>
                  </div>
                  <span className="inline-block mt-2 sm:mt-0 bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs">
                    {u.role}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        </div>

        {/* Orders */}
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <h2 className="text-xl font-semibold text-emerald-600 mb-4">
            Orders
          </h2>
          <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400">
            {orders.length > 0 ? (
              orders.map((o) => (
                <div
                  key={o._id}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      User ID: {o.user._id}
                    </p>
                    <p className="font-medium text-gray-800">
                      Username: {o.user.username}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Total: ₹{totalAmount(o)}
                    </p>
                  </div>
                  <span
                    className={`inline-block mt-2 sm:mt-0 ${
                      o.status === "delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    } px-3 py-1 rounded-full text-xs`}
                  >
                    {o.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
