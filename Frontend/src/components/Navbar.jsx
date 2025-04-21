import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";
import React from "react";

const Navbar = () => {
  const { user, logoutUser, loginUser } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdowns and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Add scroll listener for shadow and background effect
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (window.scrollY > 10) {
        navbar.classList.add("shadow-lg", "bg-blue-900");
        navbar.classList.remove("shadow-md", "bg-blue-950");
      } else {
        navbar.classList.add("shadow-md", "bg-blue-950");
        navbar.classList.remove("shadow-lg", "bg-blue-900");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    logoutUser();
    if (["/add-product", "/admin", "/edit-product"].includes(window.location.pathname)) {
      navigate("/");
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUser = { ...user, photo: reader.result };
        loginUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameSave = () => {
    if (newName.trim() !== "") {
      const updatedUser = { ...user, name: newName };
      loginUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setEditingName(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLinkClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-950 text-white sticky top-0 z-50 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-4 lg:space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center" onClick={handleLinkClick}>
              <div className="flex items-center">
                <svg
                  className="h-8 w-8 text-amber-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.5a2 2 0 00-1.732 1L2.5 12.5a2 2 0 001 3.464h2v5a1 1 0 001 1h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a1 1 0 001-1v-5h2a2 2 0 001-3.464l-7.768-9A2 2 0 0012 2.5z" />
                </svg>
                <span className="ml-2 text-xl font-bold text-amber-300 hidden sm:block">
                  QuickShop
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link
                to="/"
                className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              {/* <Link
                to="/products"
                className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Products
              </Link> */}
              <Link
                to="/deals"
                className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-200 hover:text-white px-2 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full" ref={searchRef}>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900 transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Button - Mobile */}
            <button
              className="md:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
              onClick={() => navigate("/search")}
              aria-label="Search"
            >
              <FiSearch className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
              onClick={handleLinkClick}
            >
              <FiShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Auth / Profile */}
            {!user ? (
              <div className="hidden sm:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-900 transition-all duration-200"
                  onClick={handleLinkClick}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-md text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 transition-all duration-200"
                  onClick={handleLinkClick}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center rounded-full bg-blue-950 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-blue-950 transition-all duration-200"
                  id="user-menu"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-label="Toggle user menu"
                >
                  <span className="sr-only">Open user menu</span>
                  {user.photo ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover border-2 border-amber-300"
                      src={user.photo}
                      alt="User profile"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-800 border-2 border-amber-300 flex items-center justify-center">
                      <FiUser className="h-4 w-4 text-amber-300" />
                    </div>
                  )}
                </button>

                {/* Profile Dropdown */}
                {dropdownOpen && (
                  <div
                    className="origin-top-right absolute right-0 mt-2 w-64 rounded-lg shadow-xl bg-white border border-gray-100 focus:outline-none z-50 transition-all duration-300 ease-in-out transform opacity-0 scale-95"
                    style={{ animation: "dropdown 0.3s ease-in-out forwards" }}
                  >
                    {/* Profile Header */}
                    <div className="px-4 py-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {user.photo ? (
                            <img
                              className="h-10 w-10 rounded-full border-2 border-amber-300 object-cover"
                              src={user.photo}
                              alt="User profile"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-800 border-2 border-amber-300 flex items-center justify-center">
                              <FiUser className="h-5 w-5 text-amber-300" />
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          {editingName ? (
                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                                className="flex-1 block w-full px-2 py-1 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900"
                                autoFocus
                              />
                              <button
                                onClick={handleNameSave}
                                disabled={!newName.trim()}
                                className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
                              >
                                Save
                              </button>
                            </div>
                          ) : (
                            <div className="flex justify-between items-center">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {user.name}
                              </p>
                              <button
                                onClick={() => {
                                  setEditingName(true);
                                  setNewName(user.name);
                                }}
                                className="text-gray-400 hover:text-gray-500"
                                aria-label="Edit name"
                              >
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                              </button>
                            </div>
                          )}
                          <p className="text-xs text-gray-500 mt-1 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-1 border-t border-gray-100">
                      <label className="group flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md cursor-pointer">
                        <svg
                          className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlePhotoUpload}
                        />
                      </label>
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          className="group flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                          onClick={handleLinkClick}
                        >
                          <svg
                            className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        to="/orders"
                        className="group flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        onClick={handleLinkClick}
                      >
                        <svg
                          className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="group flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md"
                        onClick={handleLinkClick}
                      >
                        <svg
                          className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                        Wishlist
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="p-1 border-t border-gray-100">
                      <button
                        onClick={handleLogout}
                        className="group flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md w-full text-left"
                      >
                        <svg
                          className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-200 hover:text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden border-t border-blue-800 transition-all duration-300 ease-in-out transform translate-y-0"
            ref={mobileMenuRef}
            style={{ animation: "slideIn 0.3s ease-in-out forwards" }}
          >
            <div className="px-4 py-4 bg-blue-900 shadow-lg">
              {/* Search Bar - Mobile */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Home
              </Link>
              {/* <Link
                to="/products"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Products
              </Link> */}
              <Link
                to="/deals"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Deals
              </Link>
              <Link
                to="/about"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                onClick={handleLinkClick}
              >
                Contact
              </Link>

              {/* Mobile Auth Links
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 mt-2 transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-3 py-2 rounded-md text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 mt-2 transition-colors duration-200"
                    onClick={handleLinkClick}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="border-t border-blue-800 mt-2 pt-2">
                    <Link
                      to="/wishlist"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      Wishlist
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      My Orders
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-3 py-2 rounded-md text-sm font-medium text-gray-200 hover:text-white hover:bg-blue-800 transition-colors duration-200"
                        onClick={handleLinkClick}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-red-300 hover:text-red-200 hover:bg-blue-800 mt-2 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )} */}
            </div>
          </div>
        )}
      </div>

      {/* CSS for Dropdown Animation */}
      <style>{`
        @keyframes dropdown {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;