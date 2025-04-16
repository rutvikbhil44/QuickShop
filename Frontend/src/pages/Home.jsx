import React, { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { FiFilter, FiSearch, FiStar, FiShoppingCart } from "react-icons/fi";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          fetch("https://quickshop-server-mwtv.onrender.com/api/categories").then((res) =>
            res.json()
          ),
        ]);

        const allProducts = productsRes.data || [];
        setProducts(allProducts);
        setCategories(categoriesRes || []);
        setFeaturedProducts(allProducts.sort(() => 0.5 - Math.random()).slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowMobileFilters(false);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch =
      product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50">
      {/* Hero Section - Made more compact for mobile */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8 xl:mt-12">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-2xl tracking-tight font-extrabold sm:text-3xl md:text-4xl">
                  <span className="block">Summer Collection</span>
                  <span className="block text-yellow-400">2023</span>
                </h1>
                <p className="mt-2 text-sm text-gray-300 sm:mt-3 sm:text-base sm:max-w-xl sm:mx-auto md:mt-3 md:text-lg lg:mx-0">
                  Discover our new arrivals with up to 40% discount.
                </p>
                <div className="mt-3 sm:mt-4 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#shop-now"
                      className="w-full flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 md:py-3 md:text-base md:px-8"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion model"
            loading="lazy"
          />
        </div>
      </div>

      {/* Featured Categories - With static images */}
<div className="bg-white py-8 sm:py-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-xl font-bold text-gray-900 mb-6 text-center sm:text-2xl">
      Shop by Category
    </h2>
    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
      {/* Electronics */}
      <div
        className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleCategoryClick("Electronics")}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            alt="Electronics"
            className="w-full h-full object-cover group-hover:opacity-75"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="text-sm font-semibold text-white sm:text-base">Electronics</h3>
          <p className="mt-0.5 text-gray-200 text-xs sm:text-sm">Shop now</p>
        </div>
      </div>

      {/* Clothing */}
      <div
        className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleCategoryClick("Clothing")}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            alt="Clothing"
            className="w-full h-full object-cover group-hover:opacity-75"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="text-sm font-semibold text-white sm:text-base">Clothing</h3>
          <p className="mt-0.5 text-gray-200 text-xs sm:text-sm">Shop now</p>
        </div>
      </div>

      {/* Home */}
      <div
        className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleCategoryClick("Home")}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            alt="Home"
            className="w-full h-full object-cover group-hover:opacity-75"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="text-sm font-semibold text-white sm:text-base">Home</h3>
          <p className="mt-0.5 text-gray-200 text-xs sm:text-sm">Shop now</p>
        </div>
      </div>

      {/* Books */}
      <div
        className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
        onClick={() => handleCategoryClick("Books")}
      >
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
            alt="Books"
            className="w-full h-full object-cover group-hover:opacity-75"
            loading="lazy"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="text-sm font-semibold text-white sm:text-base">Books</h3>
          <p className="mt-0.5 text-gray-200 text-xs sm:text-sm">Shop now</p>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Featured Products - 2 columns on mobile */}
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Featured Products
            </h2>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium sm:text-base">
              View All
            </button>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner - More compact */}
      <div className="bg-yellow-50 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2 sm:text-2xl">
            Summer Sale - Up to 40% Off
          </h2>
          <p className="text-sm text-gray-600 mb-4 sm:text-base">
            Limited time offer on selected items.
          </p>
          <button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm sm:text-base">
            Shop the Sale
          </button>
        </div>
      </div>

      {/* Main Product Grid */}
      <div id="shop-now" className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Section */}
          <section className="mb-8 sm:mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 md:mb-0 sm:text-2xl">
                {selectedCategory || "All Products"}
              </h2>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg shadow-sm text-xs font-medium text-gray-700 hover:bg-gray-50 sm:text-sm"
              >
                <FiFilter className="h-4 w-4" />
                Filters
              </button>

              {/* Search Summary */}
              {searchQuery && (
                <p className="text-gray-600 text-xs sm:text-sm md:text-base">
                  Results for: <span className="font-semibold">"{searchQuery}"</span>
                </p>
              )}
            </div>

            {/* Category Filters - Scrollable on mobile */}
            <div className={`${showMobileFilters ? "block" : "hidden"} md:block overflow-x-auto pb-2`}>
              <div className="flex flex-nowrap gap-2 md:flex-wrap md:gap-3 w-max md:w-full">
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap sm:text-sm ${
                    selectedCategory === ""
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-200 whitespace-nowrap sm:text-sm ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Product Grid Section - 2 columns on mobile */}
          <section>
            {isLoading ? (
              <div className="grid gap-4 grid-cols-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-40 bg-gray-200 sm:h-48"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
                  <p className="text-xs text-gray-600 sm:text-sm">
                    Showing <span className="font-semibold">{filteredProducts.length}</span> products
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                  <div className="flex items-center text-xs text-gray-500 sm:text-sm">
                    <FiSearch className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Click product for details</span>
                  </div>
                </div>

                <div className="grid gap-4 grid-cols-2 sm:gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 text-gray-400 sm:h-20 sm:w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900 sm:mt-4">
                  No products found
                </h3>
                <p className="mt-1 text-gray-500 text-sm sm:text-base">
                  {searchQuery
                    ? "Try adjusting your search or filter."
                    : "No products available in this category."}
                </p>
                <button
                  onClick={() => handleCategoryClick("")}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none text-sm sm:text-base"
                >
                  View all products
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Testimonials - Single column on mobile */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-center text-gray-900 mb-8 sm:text-2xl">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="bg-white p-4 rounded-lg shadow-md sm:p-6"
              >
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-yellow-400 sm:h-5 sm:w-5"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-3 text-sm sm:text-base">
                  "I absolutely love my purchase! The quality exceeded my
                  expectations and shipping was super fast."
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${
                      testimonial + 40
                    }.jpg`}
                    alt="Customer"
                    className="h-8 w-8 rounded-full mr-2 sm:h-10 sm:w-10"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      Sarah Johnson
                    </p>
                    <p className="text-xs text-gray-500 sm:text-sm">
                      Verified Buyer
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter - More compact */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl font-bold mb-3 sm:text-2xl">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            Subscribe for exclusive offers and new product announcements.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-2 rounded-md focus:outline-none text-gray-900 text-sm sm:text-base"
            />
            <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md font-medium hover:bg-yellow-500 transition-colors text-sm sm:text-base sm:px-6">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center space-x-4 mt-6 sm:space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebook className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaPinterest className="h-5 w-5 sm:h-6 sm:w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;