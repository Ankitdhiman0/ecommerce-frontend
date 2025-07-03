import React, { useEffect, useRef, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(useGSAP);

function Navbar({ search, setSearch }) {
  const [username, setUsername] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const searchInputRef = useRef();
  const mobileMenuRef = useRef();
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
      tl.to(el, {
        width: "180px",
        height: "30px",
        opacity: 1,
        display: "block",
      });
    } else {
      tl.to(el, { width: 0, opacity: 0 }).set(el, { display: "none" });
    }
  }, [searchOpen]);

  // Animate mobile menu
  useGSAP(() => {
    if (!mobileMenuRef.current) return;

    gsap.to(mobileMenuRef.current, {
      y: menuOpen ? 0 : "-100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.4,
      ease: "power2.out",
      pointerEvents: menuOpen ? "auto" : "none",
    });
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <nav className="font-[Corbel] w-full px-4 md:px-10 py-4 flex flex-wrap items-center justify-between gap-4 bg-white rounded-2xl z-10 relative md:sticky top-0 md:z-50">
        <div
          className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer relative"
          onClick={() => setShowLogout(!showLogout)}
        >
          Welcome! <span className="text-blue-600">{username}</span>
          {showLogout && (
            <div className="absolute md:-top-[18%]  w-auto border border-gray-400 rounded-2xl md:left-[9em]   flex  items-center gap-3 py-2 transition-all ease-in-out  px-2 duration-500">
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
            onClick={() => setSearchOpen((prev) => !prev)}
            className="text-2xl text-gray-600 cursor-pointer hover:text-black"
          >
            <i className="ri-search-line"></i>
          </button>
          <button
            className="text-2xl text-gray-600 cursor-pointer hover:text-black"
            onClick={() => navigate("/cart")}
          >
            <i className="ri-shopping-cart-fill"></i>
          </button>
          <button
            className="text-2xl text-gray-600 cursor-pointer hover:text-black"
            onClick={() => navigate("/bag")}
          >
            <i className="ri-shopping-bag-line"></i>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-600 md:hidden hover:text-black"
          >
            <i className="ri-menu-2-line"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex flex-col justify-center items-center space-y-6 z-40 text-white text-xl font-semibold md:hidden"
        style={{ pointerEvents: "none", opacity: 0 }}
      >
        <button
          className="hover:text-blue-400 transition"
          onClick={() => {
            navigate("/home");
            setMenuOpen(false);
          }}
        >
          Products
        </button>
        <button
          className="hover:text-blue-400 transition"
          onClick={() => setMenuOpen(false)}
        >
          About Us
        </button>
        <button
          onClick={() => setMenuOpen(false)}
          className="mt-10 px-4 py-2 text-sm bg-white text-black rounded-md hover:bg-gray-200"
        >
          Close
        </button>
      </div>
    </>
  );
}

export default Navbar;
