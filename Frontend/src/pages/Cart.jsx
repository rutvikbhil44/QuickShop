import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  FiTrash2,
  FiShoppingCart,
  FiArrowLeft,
  FiCreditCard,
} from "react-icons/fi";
import { toast } from "react-toastify";
import React from "react";

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } =
    useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingFee = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shippingFee + tax;

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex items-center mb-6 sm:mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 text-sm sm:text-base"
        >
          <FiArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Continue Shopping
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 text-center">
          <FiShoppingCart className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">
            Your cart is empty
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-500">
            Browse our products and add items to your cart
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 sm:mt-6 px-4 py-2 bg-blue-600 text-white text-sm sm:text-base rounded-md shadow-sm hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="hidden sm:grid grid-cols-12 bg-gray-50 p-3 sm:p-4 border-b text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="p-3 sm:p-4">
                    <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4">
                      <div className="col-span-12 sm:col-span-5 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-md object-cover border flex-shrink-0"
                        />
                        <div className="ml-3 sm:ml-4 flex-1">
                          <h3 className="text-sm sm:text-base font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 capitalize">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-2 text-gray-900 font-medium sm:text-center mt-2 sm:mt-0">
                        <span className="sm:hidden text-xs text-gray-500">
                          Price:{" "}
                        </span>
                        ${item.price.toLocaleString()}
                      </div>

                      <div className="col-span-12 sm:col-span-3 flex sm:justify-center mt-2 sm:mt-0">
                        <div className="flex items-center border rounded-md w-28 sm:w-32">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="px-2 sm:px-3 py-1 text-center w-12 sm:w-14 text-sm sm:text-base">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="px-2 sm:px-3 py-1 text-gray-600 hover:bg-gray-100 text-sm sm:text-base"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-12 sm:col-span-2 flex justify-between items-center sm:text-right mt-2 sm:mt-0">
                        <div className="text-gray-900 font-medium text-sm sm:text-base">
                          <span className="sm:hidden text-xs text-gray-500">
                            Total:{" "}
                          </span>
                          ${(item.price * item.quantity).toLocaleString()}
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <FiTrash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearCart}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-lg p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shippingFee === 0
                      ? "Free"
                      : `$${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="text-gray-900">${tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 flex justify-between text-sm sm:text-base">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-base sm:text-lg text-gray-900">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-4 sm:mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiCreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-xs sm:text-sm text-gray-500">
                or{" "}
                <button
                  onClick={() => navigate("/")}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;