import React, { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

function Navbar({ search, setSearch }) {
  const [username, setUsername] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const [showLogout, setShowLogout] = useState(false);

  const searchInputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUsername(user.username);
    }
  }, []);

  // Animate search bar
  useGSAP(() => {
    if (!searchInputRef.current) return;

    const el = searchInputRef.current;
    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.out" },
    });

    if (searchOpen) {
      el.classList.remove("hidden");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        // Animations for tablets & above
        gsap.to(el, { width: "200px", opacity: 1, display: "block" });
      });

      mm.add("(max-width: 768px)", () => {
        // Animations for mobile
        gsap.to(el, { width: "140px", opacity: 1, display: "block" });
      });
    } else {
      tl.to(el, { width: 0, opacity: 0 }).set(el, { display: "none" });
    }
  }, [searchOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="font-[Corbel] w-full px-4 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl z-10 relative md:sticky top-0 md:z-50 overflow-hidden">
        <div
          className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer relative"
          onClick={() => {
            setShowLogout(!showLogout);
          }}
        >
          Hey!{" "}
          <span className="text-blue-600" onClick={() => searchOpen(false)}>
            {username}
          </span>
          {showLogout && (
            <div className="absolute left-36 -top-[.3em] md:-top-[18%]  w-auto border border-gray-400 rounded-[8px] md:left-[9em] font-light   flex  items-center gap-3 py-1 transition-all ease-in-out  px-2 duration-500">
              <button
                className=" text-xl  w-[90%] rounded-xl"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              <button
                className="text-xl  w-[90%] rounded-xl"
                onClick={() => navigate("/home")}
              >
                Products
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <input
            ref={searchInputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search..."
            className="bg-gray-100 px-3 py-1 rounded-full text-sm md:text-base outline-none w-0 opacity-0 hidden transition-all"
          />
          <button
            onClick={() => {
              setSearchOpen((prev) => !prev);
              setShowLogout(false);
            }}
            className="text-lg md:text-2xl text-gray-600 cursor-pointer hover:text-black"
          >
            <i className="ri-search-line"></i>
          </button>
          <button
            className="text-lg md:text-2xl text-gray-600 cursor-pointer hover:text-black"
            onClick={() => navigate("/cart")}
          >
            <i className="ri-shopping-cart-fill"></i>
          </button>
          <button
            className="text-lg md:text-2xl text-gray-600 cursor-pointer hover:text-black"
            onClick={() => navigate("/bag")}
          >
            <i className="ri-shopping-bag-line"></i>
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
