import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";

const WishlistPage = () => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  // Load wishlist from localStorage on mount
  useEffect(() => {
    if (user) {
      const storedWishlist = JSON.parse(localStorage.getItem(`wishlist_${user._id}`)) || [];
      setWishlist(storedWishlist);
    } else {
      setWishlist([]);
    }
  }, [user]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item._id !== productId);
    localStorage.setItem(`wishlist_${user._id}`, JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
    toast.success("Item removed from wishlist", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Please Sign In
          </h3>
          <p className="mt-2 text-gray-500">
            Sign in to view your wishlist.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <FiHeart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Your Wishlist is Empty
          </h3>
          <p className="mt-2 text-gray-500">
            Add items to your wishlist while shopping.
          </p>
          <button
            onClick={() => navigate("/products")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Wishlist</h1>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <ul className="divide-y divide-gray-200">
          {wishlist.map((product) => (
            <li
              key={product._id}
              className="py-4 flex items-center hover:bg-gray-50 cursor-pointer"
              onClick={() => handleNavigate(product._id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-md object-cover border"
              />
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-medium text-gray-900">
                  {product.name}
                </h4>
                <p className="text-sm text-gray-500">
                  ${product.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {product.category}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
                >
                  <FiShoppingCart className="h-3 w-3" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(product._id);
                  }}
                  className="p-1.5 text-gray-600 hover:text-red-600 transition-colors"
                  title="Remove from Wishlist"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WishlistPage;