import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://e-commerce-backend-production-0ed1.up.railway.app/api/products/${id}`
        );
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error Fetching Product", err);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <main className="h-screen bg-[#f9f9fb] font-[Bahnschrift] p-4 md:p-10">
      <Navbar />
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-lg flex flex-col md:flex-row overflow-hidden translate-y-[5em] ">
        {/* Left Section - Product Image */}
        <div className="md:w-1/2 w-full bg-[#f2f4f7] flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-[18rem] md:h-[26rem] rounded-xl object-contain"
          />
        </div>

        {/* Right Section - Product Info */}
        <div className="md:w-1/2 w-full p-6 md:p-10 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
            {product.description}
          </p>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            ₹{product.price}
          </p>
          <p className="text-sm text-gray-500 capitalize mb-4">
            Category: {product.category} / {product.subcategory}
          </p>

          <button
            onClick={() => {
              addToCart(product);
              navigate("/cart");
            }}
            className="bg-blue-600 text-white cursor-pointer px-6 py-3 rounded-lg mt-4 hover:bg-blue-700 transition duration-200 w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;
