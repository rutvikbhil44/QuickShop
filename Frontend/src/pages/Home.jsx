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
          fetch("http://localhost:6001/api/categories").then((res) =>
            res.json()
          ),
        ]);

        const allProducts = productsRes.data || [];
        setProducts(allProducts);
        setCategories(categoriesRes || []);

        // Set featured products (top rated or new arrivals)
        setFeaturedProducts(
          allProducts.sort(() => 0.5 - Math.random()).slice(0, 4)
        );
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
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block">Summer Collection</span>
                  <span className="block text-yellow-400">2023</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover our new arrivals with up to 40% discount. Limited
                  time offer.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#shop-now"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500 md:py-4 md:text-lg md:px-10"
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
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion model"
          />
        </div>
      </div>

      {/* Featured Categories */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {/* Electronics */}
            <div
              className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              onClick={() => handleCategoryClick("Electronics")}
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                  alt="Electronics"
                  className="w-full h-full object-cover group-hover:opacity-75"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white">
                  Electronics
                </h3>
                <p className="mt-1 text-gray-200 text-sm">Shop now</p>
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
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white">Clothing</h3>
                <p className="mt-1 text-gray-200 text-sm">Shop now</p>
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
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white">Home</h3>
                <p className="mt-1 text-gray-200 text-sm">Shop now</p>
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
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-semibold text-white">Books</h3>
                <p className="mt-1 text-gray-200 text-sm">Shop now</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Products
            </h2>
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-yellow-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Summer Sale - Up to 40% Off
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Limited time offer on selected items. Don't miss out!
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
            Shop the Sale
          </button>
        </div>
      </div>

      {/* Main Product Grid */}
      <div id="shop-now" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Section */}
          <section className="mb-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">
                {selectedCategory || "All Products"}
              </h2>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="md:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FiFilter className="h-5 w-5" />
                Filters
              </button>

              {/* Search Summary */}
              {searchQuery && (
                <p className="text-gray-600 text-sm md:text-base">
                  Showing results for:{" "}
                  <span className="font-semibold">"{searchQuery}"</span>
                </p>
              )}
            </div>

            {/* Category Filters */}
            <div
              className={`${showMobileFilters ? "block" : "hidden"} md:block`}
            >
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button
                  onClick={() => handleCategoryClick("")}
                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
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
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
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

          {/* Product Grid Section */}
          <section>
            {isLoading ? (
              <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse"
                  >
                    <div className="h-60 bg-gray-200"></div>
                    <div className="p-4 space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    Showing{" "}
                    <span className="font-semibold">
                      {filteredProducts.length}
                    </span>{" "}
                    products
                    {selectedCategory && ` in ${selectedCategory}`}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiSearch className="mr-2 h-4 w-4" />
                    <span>Click product for details</span>
                  </div>
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-400">
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
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  No products found
                </h3>
                <p className="mt-2 text-gray-500">
                  {searchQuery
                    ? "Try adjusting your search or filter to find what you're looking for."
                    : "There are currently no products available in this category."}
                </p>
                <button
                  onClick={() => handleCategoryClick("")}
                  className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
                >
                  View all products
                </button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "I absolutely love my purchase! The quality exceeded my
                  expectations and shipping was super fast."
                </p>
                <div className="flex items-center">
                  <img
                    src={`https://randomuser.me/api/portraits/women/${
                      testimonial + 40
                    }.jpg`}
                    alt="Customer"
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to get exclusive offers, new product announcements, and
            style inspiration.
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-l-md focus:outline-none text-gray-900"
            />
            <button className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-r-md font-medium hover:bg-yellow-500 transition-colors">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-300 hover:text-white">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white">
              <FaPinterest className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
