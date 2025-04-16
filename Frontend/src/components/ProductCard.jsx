import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; // Add this import
import { FiShoppingCart, FiTrash2, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductCard = ({ product, onDelete }) => {
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext); 
  const navigate = useNavigate();

  const handleNavigate = (e) => {
    if (e.target.closest("button")) return;
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 }); // Add product to cart with quantity 1
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
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
      className="group bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="relative pt-[70%] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {product.discount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      <div className="p-3 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-blue-600">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center text-xs text-gray-500 mb-2">
          <span className="capitalize">{product.category}</span>
          <span className="mx-1">•</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < product.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-0.5 text-xs">({product.reviewCount})</span>
          </div>
        </div>

        <p className="text-gray-500 text-xs mb-3 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex justify-between space-x-1.5">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs"
          >
            <FiShoppingCart className="h-3 w-3" />
            <span>Add to Cart</span>
          </button>

          {user?.role === "admin" && (
            <div className="flex space-x-1">
              <button
                onClick={handleEdit}
                className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors"
                title="Edit"
              >
                {/* <FiEdit className="h-4 w-4" /> */}
              </button>
              <button
                onClick={handleDeleteClick}
                className="p-1.5 text-gray-600 hover:text-red-600 transition-colors"  
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