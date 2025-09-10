import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({ username: "", password: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
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
      .get(
        "https://e-commerce-backend-production-0ed1.up.railway.app/api/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setOrders(res.data);
      })
      .then()
      .catch((err) => console.log(err));

    axios
      .get(
        "https://e-commerce-backend-production-0ed1.up.railway.app/api/products"
      )
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, [token]);

  const totalUsers = users.length;
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const deliveredOrders = orders.filter((o) => o.isDelivered).length;
  const pendingOrders = orders.filter((o) => !o.isDelivered).length;

  const handleDeleteOrder = (orderId) => {
    axios
      .delete(
        `https://e-commerce-backend-production-0ed1.up.railway.app/api/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      })
      .catch((err) => console.log(err));
  };

  const openEditUser = (user) => {
    setEditingUser(user);
    setEditData({ username: user.username, password: "" });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = () => {
    axios
      .put(
        `https://e-commerce-backend-production-0ed1.up.railway.app/api/users/${editingUser._id}`,
        editData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        setUsers((prev) =>
          prev.map((u) => (u._id === editingUser._id ? res.data : u))
        );
        setEditingUser(null);
      })
      .catch((err) => console.log(err));
  };
  const calcTotal = (order) => {
    return order.products.reduce((sum, p) => sum + (p.price || 0), 0);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center md:text-left">
        Owner Dashboard 👑
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Users</h3>
          <p className="text-2xl font-bold text-indigo-600">{totalUsers}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Orders</h3>
          <p className="text-2xl font-bold text-emerald-600">{totalOrders}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition text-center">
          <h3 className="text-gray-500 text-sm">Products</h3>
          <p className="text-2xl font-bold text-blue-600">{totalProducts}</p>
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

      {/* Users and Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Section */}
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
                  </div>
                  <button
                    onClick={() => openEditUser(u)}
                    className="mt-2 sm:mt-0 bg-indigo-500 text-white px-3 py-1 rounded text-xs hover:bg-indigo-600 transition"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found.</p>
            )}
          </div>
        </div>

        {/* Orders Section */}
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
                      Amount: ₹{calcTotal(o)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <span
                      className={`inline-block ${
                        o.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      } px-3 py-1 rounded-full text-xs`}
                    >
                      {o.status}
                    </span>
                    <button
                      onClick={() => handleDeleteOrder(o._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No orders found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Edit User</h3>
            <input
              type="text"
              name="username"
              value={editData.username}
              onChange={handleEditChange}
              placeholder="Username"
              className="border w-full p-2 rounded mb-3"
            />
            <input
              type="password"
              name="password"
              value={editData.password}
              onChange={handleEditChange}
              placeholder="New Password"
              className="border w-full p-2 rounded mb-3"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setEditingUser(null)}
                className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;
