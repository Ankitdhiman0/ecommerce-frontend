import React from "react";
import { useCart } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart() {
  const { cart, clearCart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();
  const handleOrder = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place an order");
      return;
    }

    try {
      const res = await axios.post(
        "https://e-commerce-backend-production-0ed1.up.railway.app/api/orders",
        {
          products: cart.map((item) => item._id), // 👈 ONLY product IDs
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Order Placed", res.data);
      clearCart();
      navigate("/order-success");
    } catch (err) {
      console.error("Order Failed:", err.response?.data || err.message);
      alert("Order failed. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 min-h-screen font-[Bahnschrift]">
        <Navbar />
        <div className="flex justify-between items-center mb-6">
          {cart.length > 0 && (
            <button
              onClick={clearCart}
              className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center text-lg mt-10">
              Your cart is empty 🛒
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-600 font-medium cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            <h3 className="text-right text-2xl font-bold text-blue-700 mt-8">
              Total: ₹{totalPrice}
            </h3>
            <button
              onClick={() => handleOrder()}
              className="py-3 px-4 cursor-pointer text-teal-600 bg-teal-400 rounded-xl "
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
