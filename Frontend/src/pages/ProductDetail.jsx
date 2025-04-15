import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import {
  FiStar,
  FiShoppingCart,
  FiChevronRight,
  FiTruck,
  FiShield,
  FiRefreshCw,
} from "react-icons/fi";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://quickshop-server-mwtv.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);

        if (data) {
          setProduct({
            ...data,
            images: [
              data.image,
              `https://source.unsplash.com/random/300x300?product=${id}&2`,
              `https://source.unsplash.com/random/300x300?product=${id}&3`,
              `https://source.unsplash.com/random/300x300?product=${id}&4`,
            ],
          });
        }
      } catch (error) {
        toast.error("Failed to load product details");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const rating = 4.7;
  const totalReviews = 128;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
          <div>
            <Skeleton height={300} className="rounded-xl sm:h-[500px]" />
            <div className="grid grid-cols-4 gap-2 sm:gap-4 mt-2 sm:mt-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={80} className="rounded-lg sm:h-[100px]" />
              ))}
            </div>
          </div>
          <div>
            <Skeleton width={200} height={32} className="mb-4 sm:mb-6 sm:h-[40px]" />
            <Skeleton width={120} height={24} className="mb-3 sm:mb-4 sm:h-[30px]" />
            <div className="flex items-center mb-6">
              <Skeleton width={80} height={24} />
              <Skeleton width={80} height={24} className="ml-2 sm:ml-4" />
            </div>
            <Skeleton count={3} className="mb-2 sm:mb-4" />
            <Skeleton width={160} height={40} className="mt-6 sm:mt-8 sm:h-[50px]" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <svg
            className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-3 text-lg font-medium text-gray-900 sm:mt-4">
            Product not found
          </h3>
          <p className="mt-1 text-sm text-gray-500 sm:mt-2 sm:text-base">
            The product you're looking for doesn't exist or may have been
            removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Breadcrumbs - Made single line with ellipsis for mobile */}
      <nav className="flex mb-4 sm:mb-6 overflow-hidden" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 sm:space-x-4 whitespace-nowrap">
          <li>
            <div className="flex items-center">
              <a href="/" className="text-xs text-gray-400 hover:text-gray-500 sm:text-sm">
                Home
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <FiChevronRight className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
              <a
                href="/"
                className="ml-1 text-xs text-gray-400 hover:text-gray-500 sm:ml-4 sm:text-sm"
              >
                {product.category.length > 10 ? `${product.category.substring(0, 10)}...` : product.category}
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <FiChevronRight className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5" />
              <span className="ml-1 text-xs font-medium text-gray-500 sm:ml-4 sm:text-sm">
                {product.name.length > 12 ? `${product.name.substring(0, 12)}...` : product.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        {/* Image Gallery - Adjusted for mobile */}
        <div>
          <div className="bg-gray-50 rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-64 sm:h-96 object-contain mx-auto"
              loading="lazy"
            />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-md sm:rounded-lg overflow-hidden border transition-all ${
                  selectedImage === index
                    ? "border-blue-500 border-2"
                    : "border-transparent hover:border-gray-300 border"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-full h-16 sm:h-24 object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info - Adjusted spacing and font sizes for mobile */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <div className="flex items-center mt-1 sm:mt-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`h-4 w-4 sm:h-5 sm:w-5 ${
                        star <= Math.floor(rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-xs sm:text-sm font-medium text-gray-600">
                  {rating} ({totalReviews} reviews)
                </span>
              </div>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium bg-green-100 text-green-800">
              In Stock
            </span>
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <>
                  <span className="ml-2 text-lg sm:text-xl text-gray-500 line-through">
                    ${product.originalPrice.toLocaleString()}
                  </span>
                  <span className="ml-2 text-base sm:text-lg font-medium text-green-600">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % Off
                  </span>
                </>
              )}
            </div>
            <p className="mt-0.5 text-xs sm:text-sm text-gray-500">Inclusive of all taxes</p>
          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">Description</h3>
            <div className="mt-2 sm:mt-4 space-y-2 sm:space-y-4 text-sm sm:text-base text-gray-600">
              <p>{product.description}</p>
              <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
                <li>Premium quality materials</li>
                <li>Eco-friendly packaging</li>
                <li>1-year manufacturer warranty</li>
                <li>Free returns within 30 days</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center border rounded-md w-full sm:w-auto">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-2 sm:px-4 py-2 text-center w-12">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                Add to Cart
              </button>
            </div>
            <button className="mt-3 sm:mt-4 w-full px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 rounded-md text-sm sm:text-base font-medium hover:bg-gray-50 transition-colors">
              Buy Now
            </button>
          </div>

          <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start">
                <FiTruck className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mt-0.5" />
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    Free Shipping
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">On orders over $500</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiRefreshCw className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mt-0.5" />
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    Easy Returns
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiShield className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 mt-0.5" />
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">
                    Secure Payment
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">100% secure checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section - Adjusted for mobile */}
      <div className="mt-8 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Customer Reviews</h2>
        <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-8">
          <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      star <= 5
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 sm:ml-2 text-sm font-medium text-gray-900">
                5.0
              </span>
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">
                Perfect product!
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                This exceeded all my expectations. The quality is outstanding
                and it arrived earlier than expected. Will definitely purchase
                again!
              </p>
            </div>
            <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
              <span>John D.</span>
              <span className="mx-1">•</span>
              <span>Verified Buyer</span>
              <span className="mx-1">•</span>
              <span>2 days ago</span>
            </div>
          </div>

          <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      star <= 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-1 sm:ml-2 text-sm font-medium text-gray-900">
                4.0
              </span>
            </div>
            <div className="mt-2 sm:mt-4">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Great value</h3>
              <p className="mt-1 text-xs sm:text-sm text-gray-600">
                Very happy with my purchase. The product works well and looks
                exactly as shown in the pictures. Shipping was fast too.
              </p>
            </div>
            <div className="mt-2 sm:mt-4 flex items-center text-xs sm:text-sm text-gray-500">
              <span>Sarah M.</span>
              <span className="mx-1">•</span>
              <span>Verified Buyer</span>
              <span className="mx-1">•</span>
              <span>1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;