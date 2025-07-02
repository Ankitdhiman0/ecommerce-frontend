import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import useLenis from "../utils/useLenis";

function Home() {
  const [category, setCategory] = useState(""); // Show all initially
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useLenis();

  useEffect(() => {
    const fetchProducts = async () => {
      let url =
        "https://ecommerce-backend-production-6406.up.railway.app/api/products";
      if (category) url += `?category=${category}`;

      const res = await axios.get(url);
      setProducts(res.data);
    };

    fetchProducts();
  }, [category]);

  const filterProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <main className="h-screen w-full font-[Bahnschrift] ">
        <Navbar search={search} setSearch={setSearch} />
        <section className="hero-crousuel">
          <Carousel />
        </section>

        {/* Categories button */}
        <section className="h-auto w-full flex items-center justify-center ">
          <div className=" w-[95%] rounded-2xl border border-gray-400 flex justify-center gap-4 py-4 mt-3 md:mt-10">
            {["male", "female", "kids", "electronics"].map((categ, i) => (
              <button
                key={i}
                onClick={() => setCategory(categ)}
                className={`px-2 cursor-pointer py-2 rounded-xl ${
                  category === categ ? "bg-blue-600 text-white" : "bg-gray-300"
                }  hover:bg-blue-600 transition ease-in duration-200 hover:text-white`}
              >
                {categ === "" ? "All" : categ.toUpperCase()}
              </button>
            ))}
            <button
              className="px-2 py-2 rounded-xl bg-red-200 cursor-pointer text-[13px] hover:text-white hover:bg-red-400 transition duration-200 ease-in"
              onClick={() => setCategory("")}
            >
              Remove Filter
            </button>
          </div>
        </section>
        {/* 
        {/* products Area */}
        <div className="products-container w-full flex justify-center p-4 md:p-8 bg-gray-50 min-h-screen">
          <div className="products flex flex-wrap justify-center gap-6 w-full max-w-7xl">
            {filterProducts.map((prod) => (
              <div
                key={prod._id}
                onClick={() => navigate(`/product/${prod._id}`)}
                className="w-[47%] sm:w-[47%] md:w-[30%] lg:w-[23%] xl:w-[22%]  h-[20em] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col items-center text-center cursor-pointer"
              >
                <img
                  src={prod.image}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-lg text-gray-800">
                  {prod.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{prod.description}</p>
                <p className="text-xl font-bold text-blue-600 mt-3">
                  ₹{prod.price}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}

export default Home;
