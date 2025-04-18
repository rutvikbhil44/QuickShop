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
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Enhanced categories with proper images
  const enhancedCategories = [
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWxlY3Ryb25pY3N8ZW58MHx8MHx8fDA%3D",
      description: "Latest gadgets and devices",
    },
    {
      name: "Jewelery",
      image:
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Beautiful jewelry pieces",
    },
    {
      name: "Men's Clothing",
      image:
        "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Stylish men's fashion",
    },
    {
      name: "Women's Clothing",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Trendy women's outfits",
    },
    {
      name: "Home Appliances",
      image:
        "https://images.unsplash.com/photo-1621529355377-b1685d2a7d77?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG9tZSUyMGFwcGxpYW5jZXN8ZW58MHx8MHx8fDA%3D",
      description: "Smart home tech",
    },
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Bestselling books",
    },
    {
      name: "Sports",
      image:
        "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Sports equipment",
    },
    {
      name: "Beauty",
      image:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      description: "Beauty and cosmetics",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getProducts(),
          fetch(
            "https://quickshop-server-mwtv.onrender.com/api/categories"
          ).then((res) => res.json()),
        ]);

        const allProducts = productsRes.data || [];
        setProducts(allProducts);
        setCategories(categoriesRes || []);
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
    const productsSection = document.getElementById("shop-now");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    setSearchTriggered(true);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    const matchesSearch =
      product.name?.toLowerCase().includes(localSearchQuery.toLowerCase()) ?? false;
    return matchesCategory && (searchTriggered ? matchesSearch : true);
  });

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 lg:mt-10 lg:px-8 xl:mt-12">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold sm:text-4xl md:text-5xl">
                  <span className="block">Summer Collection</span>
                  <span className="block text-amber-400">2023</span>
                </h1>
                <p className="mt-3 text-base text-gray-200 sm:mt-4 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover our new arrivals with up to 40% discount.
                </p>
                <div className="mt-5 sm:mt-6 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <a
                      href="#shop-now"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-amber-400 hover:bg-amber-500 transition-colors md:py-4 md:text-lg md:px-10"
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
            className="h-48 w-full object-cover sm:h-64 md:h-80 lg:w-full lg:h-full transition-transform duration-500 hover:scale-105"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80"
            alt="Fashion model"
            loading="lazy"
          />
        </div>
      </div>

      {/* Shop by Category */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Shop by Category
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
              Discover our curated collections
            </p>
          </div>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                const container = document.querySelector('.categories-container');
                container.scrollBy({ left: -300, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="categories-container flex overflow-x-hidden px-12">
              {enhancedCategories.map((category, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-6 transition-all duration-300"
                >
                  <div
                    className="relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer h-full group"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-semibold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
              onClick={() => {
                const container = document.querySelector('.categories-container');
                container.scrollBy({ left: 300, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
          </div>
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-amber-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Summer Sale - Up to 40% Off
          </h2>
          <p className="text-base text-gray-600 mb-6">
            Limited time offer on selected items.
          </p>
          <button className="px-8 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-base font-medium">
            Shop the Sale
          </button>
        </div>
      </div>

      {/* Main Product Grid */}
      <div id="shop-now" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar */}
          <div className="mb-12">
            <div className="flex max-w-lg mx-auto shadow-sm rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search products..."
                value={localSearchQuery}
                onChange={(e) => {
                  setLocalSearchQuery(e.target.value);
                  if (!e.target.value) setSearchTriggered(false);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="flex-1 px-5 py-3 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-base text-gray-900 placeholder-gray-500 bg-gray-50"
              />
              <button
                onClick={handleSearch}
                className="px-5 py-3 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <FiSearch className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search Results */}
          {searchTriggered && localSearchQuery && filteredProducts.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Search Results for "{localSearchQuery}"
              </h3>
              <div className="relative">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => {
                    const container = document.getElementById("search-results");
                    if (container) container.scrollBy({ left: -300, behavior: "smooth" });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div
                  id="search-results"
                  className="flex overflow-x-hidden space-x-6 pb-4 scroll-container"
                >
                  {filteredProducts.map((product) => (
                    <div key={product._id} className="w-72 flex-shrink-0">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  onClick={() => {
                    const container = document.getElementById("search-results");
                    if (container) container.scrollBy({ left: 300, behavior: "smooth" });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {searchTriggered && localSearchQuery && filteredProducts.length === 0 && (
            <div className="text-center py-16 mb-12">
              <div className="mx-auto h-20 w-20 text-gray-400">
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
              <h3 className="mt-4 text-xl font-medium text-gray-900">
                No products found for "{localSearchQuery}"
              </h3>
              <p className="mt-2 text-base text-gray-600">
                Try adjusting your search.
              </p>
            </div>
          )}

          {/* Category Filter Section */}
          <section className="mb-12">
            {/* ... keep your existing filter section code ... */}
          </section>

          {/* Product Grid Section */}
          <section>
            {isLoading ? (
              <div className="space-y-12">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="flex space-x-6 overflow-hidden">
                      {[...Array(4)].map((_, j) => (
                        <div
                          key={j}
                          className="bg-white rounded-lg shadow-sm overflow-hidden w-72 flex-shrink-0"
                        >
                          <div className="h-48 bg-gray-200"></div>
                          <div className="p-4 space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : selectedCategory ? (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {selectedCategory}
                  </h3>
                  <button
                    onClick={() => handleCategoryClick("")}
                    className="text-blue-600 hover:text-blue-800 text-base font-medium transition-colors"
                  >
                    View All Categories
                  </button>
                </div>
                {/* Display all products in a grid layout without scroll buttons */}
                <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <div key={product._id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {categories.map((category) => {
                  const categoryProducts = products.filter((p) => p.category === category);
                  const safeCategoryId = category.replace(/'/g, '').replace(/\s+/g, '-');

                  return categoryProducts.length > 0 && (
                    <div key={category} className="mb-12">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold text-gray-900">
                          {category}
                        </h3>
                        <button
                          onClick={() => handleCategoryClick(category)}
                          className="text-blue-600 hover:text-blue-800 text-base font-medium transition-colors"
                        >
                          View All
                        </button>
                      </div>
                      <div className="relative">
                        <button
                          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
                          onClick={() => {
                            const container = document.getElementById(`category-${safeCategoryId}`);
                            if (container) container.scrollBy({ left: -300, behavior: "smooth" });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <div
                          id={`category-${safeCategoryId}`}
                          className="flex overflow-x-hidden space-x-6 pb-4 scroll-container"
                        >
                          {categoryProducts.slice(0, 8).map((product) => (
                            <div key={product._id} className="w-72 flex-shrink-0">
                              <ProductCard product={product} />
                            </div>
                          ))}
                        </div>
                        <button
                          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-all duration-300"
                          onClick={() => {
                            const container = document.getElementById(`category-${safeCategoryId}`);
                            if (container) container.scrollBy({ left: 300, behavior: "smooth" });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {filteredProducts.length === 0 && !searchTriggered && (
                  <div className="text-center py-16">
                    <div className="mx-auto h-20 w-20 text-gray-400">
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
                    <h3 className="mt-4 text-xl font-medium text-gray-900">
                      No products found
                    </h3>
                    <p className="mt-2 text-base text-gray-600">
                      Try adjusting your search or filter.
                    </p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-10">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className="h-5 w-5 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 text-base">
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
                    <p className="font-medium text-gray-900 text-base">
                      Sarah Johnson
                    </p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Newsletter</h2>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe for exclusive offers and new product announcements.
          </p>
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 text-base text-gray-900 bg-gray-50"
            />
            <button className="px-6 py-3 bg-amber-400 text-gray-900 rounded-md font-medium hover:bg-amber-500 transition-colors text-base">
              Subscribe
            </button>
          </div>
          <div className="flex justify-center space-x-6 mt-8">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaTwitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              <FaPinterest className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;