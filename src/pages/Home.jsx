import axios from "axios";
import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Navbar from "../Components/Navbar";
import Carousel from "../Components/Carousel";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

function Home() {
  const [category, setCategory] = useState(""); // Show all initially
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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
                className={`px-2 cursor-pointer py-[4px] rounded-xl ${
                  category === categ ? "bg-blue-600 text-white" : "bg-gray-300"
                }  hover:bg-blue-600 transition ease-in duration-200 hover:text-white`}
              >
                {categ === "" ? "All" : categ.toUpperCase()}
              </button>
            ))}
            <button
              className="px-2 py-[4px] rounded-lg bg-red-200 cursor-pointer text-[13px] hover:text-white hover:bg-red-400 transition duration-200 ease-in"
              onClick={() => setCategory("")}
            >
              All
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
                className="w-[44%] sm:w-[47%] md:w-[30%] lg:w-[23%] xl:w-[22%]  h-[24em] bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex flex-col justify-center items-center text-center cursor-pointer"
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <img
                    src={prod.image}
                    alt={prod.title}
                    loading="lazy"
                    className="w-full h-60 object-contain bg-blend-lighten rounded-xl mb-4"
                  />
                </Suspense>

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
