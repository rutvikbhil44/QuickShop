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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <FiArrowLeft className="mr-2" />
          Continue Shopping
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <FiShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            Your cart is empty
          </h3>
          <p className="mt-2 text-gray-500">
            Browse our products and add items to your cart
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 bg-gray-50 p-4 border-b text-sm font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-5">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item._id} className="p-4">
                    <div className="grid grid-cols-12 items-center gap-4">
                      <div className="col-span-5 flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-md object-cover border"
                        />
                        <div className="ml-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="col-span-2 text-center text-gray-900 font-medium">
                        ${item.price.toLocaleString()}
                      </div>

                      <div className="col-span-3 flex justify-center">
                        <div className="flex items-center border rounded-md">
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity - 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-center w-12">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item._id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 text-right text-gray-900 font-medium">
                        ${(item.price * item.quantity).toLocaleString()}
                      </div>

                      <div className="col-span-1 text-right">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500"
                          aria-label="Remove item"
                        >
                          <FiTrash2 />
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
          <div>
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">
                    ${totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shippingFee === 0
                      ? "Free"
                      : `$${shippingFee.toLocaleString()}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (10%)</span>
                  <span className="text-gray-900">${tax.toLocaleString()}</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-medium text-gray-900">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    ${grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiCreditCard className="h-5 w-5" />
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
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
