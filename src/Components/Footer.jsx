import React from "react";

function Footer() {
  return (
    <footer className="bg-[#1e1f23] text-white w-full px-6 py-12 font-[Bahnschrift] rounded-t-3xl overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 justify-between items-center">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Explore the Future of Shopping?
            </h2>
            <div className="text-gray-300 text-sm space-y-2">
              <p>
                <span className="font-semibold text-white">Phone:</span> +91
                81681 *****
              </p>
              <p>
                <span className="font-semibold text-white">Email:</span>{" "}
                ankitdhiman4567@gmailcom
              </p>
            </div>
          </div>

          {/* Email & Description Input */}

          {/* Social Icons */}
          <div className="flex gap-4 mt-6 text-2xl text-gray-400">
            <a href="https://www.instagram.com/___ankit._______?igsh=cmx0Y282OG0yZG11">
              <i className="ri-instagram-line hover:text-white cursor-pointer transition"></i>
            </a>
            <a href="www.linkedin.com/in/ankit-dhiman-976a372a4">
              <i className="ri-linkedin-fill hover:text-white cursor-pointer transition"></i>
            </a>
          </div>
        </div>

        {/* Right Section - Product Card */}
        <div className="w-full lg:w-1/2 flex justify-center items-center">
          <div className="bg-[#2a2c33] p-4 sm:p-6 rounded-2xl w-[80%] sm:max-w-sm flex flex-col items-center text-center">
            <img
              src="/my.png"
              alt="Product"
              className="rounded-xl w-full object-cover mb-5"
            />
            <p className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
              Thanks For Visiting
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center text-sm text-gray-400 mt-10">
        © 2025 YourStore. All rights reserved. |{" "}
        <span className="underline cursor-pointer">Privacy Policy</span> |{" "}
        <span className="underline cursor-pointer">Terms & Conditions</span>
      </div>
    </footer>
  );
}

export default Footer;
