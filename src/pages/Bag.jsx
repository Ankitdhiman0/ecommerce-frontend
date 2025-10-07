import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";

const Bag = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("No token found");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      setOrders(res.data);
    } catch (err) {
      console.log("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsDelivered = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status: "delivered" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchOrders();
    } catch (err) {
      console.log("Error updating order status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-teal-600 text-xl font-semibold animate-pulse">
          Loading your orders...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen p-4">
      <Navbar />
      <h1 className="text-4xl font-bold text-center text-teal-600 mt-8 mb-6">
        My Orders 🛍️
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No orders yet. Start shopping!
        </p>
      ) : (
        <div className="flex flex-col items-center space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="w-full max-w-md bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-700">
                  Order #{order._id.slice(-6)}
                </h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : order.status === "delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="flex flex-col space-y-4">
                {order.products.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-4 border rounded-lg p-3 hover:bg-gray-50 transition"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-20 w-20 object-contain rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-700 truncate">
                        {product.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        ₹{product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {order.status !== "delivered" && (
                <button
                  onClick={() => markAsDelivered(order._id)}
                  className="mt-5 bg-green-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Mark as Delivered
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bag;
