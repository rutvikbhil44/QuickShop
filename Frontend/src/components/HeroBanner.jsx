import React, { useEffect, useState } from "react";

const images = [
  { src: "/Banner1.jpg", caption: "Biggest Sale of the Year" },
  { src: "/Banner2.jpg", caption: "Top Deals on Electronics" },
  { src: "/Banner3.webp", caption: "Fashion Fiesta is Live!" },
];

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden shadow-md">
      <img
        src={images[currentIndex].src}
        alt="Hero Banner"
        className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-center">
        <h2 className="text-xl md:text-4xl font-bold drop-shadow-md">{images[currentIndex].caption}</h2>
      </div>
    </div>
  );
};

export default HeroBanner;
