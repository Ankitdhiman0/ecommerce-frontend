import React from "react";
import Navbar from "../Components/Navbar";

function OrderSuccess() {
  return (
    <>
      <div className="text-center">
        <Navbar />
        <h1 className="text-3xl font-bold text-green-600 mt-20">
          ✅ Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mt-4">Thank you for shopping with us 🎉</p>
      </div>
    </>
  );
}

export default OrderSuccess;
