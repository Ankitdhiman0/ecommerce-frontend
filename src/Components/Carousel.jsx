import React, { useEffect, useState } from "react";

const slides = [
  {
    image: "/Airpods Max.jpg",
    buttonText: "Shop Now",
    text: "Check out the new exciting deals with headphones",
  },
  {
    image: "/Jeans.jpg",
    buttonText: "Explore",
    text: "Grow with the fashion, try something new",
  },
  {
    image: "/ps5.jpg",
    buttonText: "Learn More",
    text: "Get a chance to win PS5",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[96vw] lg:h-[50vh] tb:h-[50vh] mtb:h-[50vh] xl:h-[90vh]  h-1/2 mx-auto overflow-hidden relative rounded-4xl shadow-xl">
      <div
        className="relative flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className="relative w-full h-1/2 tb:h-[50vh] mtb:h-[50vh] lg:h-[50vh]   xl:h-[90vh] flex-shrink-0"
          >
            <img
              src={slide.image}
              alt={`slide-${idx}`}
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-8 right-8 md:bottom-15 md:right-15 bg-black text-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition duration-300">
              {slide.buttonText}
            </button>
            <p className="absolute bottom-14 rounded-2xl left-15 px-4 py-2 w-auto text-white bg-black text-center md:text-md font-bold font-[Corbel] hidden md:block ">
              {`${slide.text} ->`}
            </p>
          </div>
        ))}
      </div>
      <section className="hidden md:flex flex-col items-center absolute -bottom-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p className=" text-white md:text-md">Scroll Down To Explore</p>
        <i className="ri-arrow-down-wide-line text-white md:text-2xl"></i>
      </section>
    </div>
  );
}
