import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-12 sm:mb-20 bg-gradient-to-b from-blue-50 to-white py-10 sm:py-16 rounded-xl">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight">
          About QuickShop
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          At QuickShop, we’re passionate about making online shopping fast, affordable, and delightful. Our mission is to bring you high-quality products with unbeatable deals, backed by exceptional customer service.
        </p>
        <a
          href="/products"
          className="mt-6 inline-flex items-center px-6 py-3 bg-amber-500 text-white text-sm sm:text-base font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
        >
          Shop Now
        </a>
      </div>

      {/* Our Story */}
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-10 mb-12 sm:mb-20 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          Our Story
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
          <div className="flex flex-col justify-center">
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 leading-relaxed">
              Founded in 2023, QuickShop started with a simple idea: to create a seamless shopping experience that prioritizes quality and value. From humble beginnings, we’ve grown into a trusted platform offering a wide range of products, from electronics to home essentials.
            </p>
            <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
              We work closely with top brands and suppliers to ensure every product meets our high standards. Our team is dedicated to curating deals that save you money without compromising on quality.
            </p>
          </div>
          <div className="flex justify-center">
            <img
              src="https://source.unsplash.com/random/500x400?store"
              alt="QuickShop store"
              className="rounded-lg object-cover w-full h-48 sm:h-64 md:h-96 transform hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-12 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Customer First",
              description: "Your satisfaction is our priority. We’re here to make your shopping experience smooth and enjoyable.",
              icon: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
            },
            {
              title: "Quality Assurance",
              description: "Every product is carefully vetted to meet our rigorous quality standards.",
              icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z",
            },
            {
              title: "Affordable Prices",
              description: "We believe great products shouldn’t break the bank. Our deals save you more.",
              icon: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-4">
                <svg
                  className="w-10 h-10 mx-auto text-amber-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={value.icon} />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      <div className="text-center mb-12 sm:mb-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-12">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              name: "Jane Doe",
              role: "Founder & CEO",
              image: "https://source.unsplash.com/random/200x200?person1",
            },
            {
              name: "John Smith",
              role: "Head of Operations",
              image: "https://source.unsplash.com/random/200x200?person2",
            },
            {
              name: "Emily Brown",
              role: "Customer Success Lead",
              image: "https://source.unsplash.com/random/200x200?person3",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 sm:p-8 transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full mx-auto mb-4 object-cover border-2 border-amber-300"
                loading="lazy"
              />
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateX(-20px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slideIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default About;