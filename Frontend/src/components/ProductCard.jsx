import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiShoppingCart, FiEye, FiTrash2, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductCard = ({ product, onDelete }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    // Add to cart logic here
    toast.success(`${product.name} added to cart`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${product._id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete(product._id);
  };

  return (
    <div
      className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full"
      onClick={handleNavigate}
    >
      <div className="relative pt-[70%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discount && (
          <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-lg font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span className="capitalize">{product.category}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1">({product.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between space-x-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <FiShoppingCart className="h-4 w-4" />
            <span className="text-sm">Add to Cart</span>
          </button>

          {user?.role === "admin" && (
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                {/* <FiEdit className="h-4 w-4" /> */}
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                title="Delete"
              >
                {/* <FiTrash2 className="h-4 w-4" /> */}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
