import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FiCheckCircle,
  FiShoppingBag,
  FiTruck,
  FiCreditCard,
  FiHome,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("State order:", location.state?.order);
    const orderFromState = location.state?.order;

    if (orderFromState) {
      setOrder(orderFromState);
    } else {
      const orders = JSON.parse(localStorage.getItem("orders")) || [];
      console.log("Orders from localStorage:", orders);
      const latestOrder = orders.length > 0 ? orders[orders.length - 1] : null;
      console.log("Latest order:", latestOrder);
      if (latestOrder) {
        setOrder(latestOrder);
      } else {
        navigate("/");
      }
    }
    setLoading(false);
  }, [navigate, location.state]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Confirmation Header */}
        <div className="text-center mb-10">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <FiCheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Order Confirmed
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Thank you for your purchase,{" "}
            <span className="font-semibold text-gray-900">
              {order.customer.name}
            </span>
            ! We've received your order and will send you a confirmation email
            shortly.
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900 flex items-center">
              <FiShoppingBag className="mr-2" />
              Order Summary
            </h2>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center mb-3">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiTruck className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Order Number
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {order.orderId}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <FiCreditCard className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Payment Method
                  </h3>
                  <p className="text-lg font-semibold text-gray-900 capitalize">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <FiCheckCircle className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Order Total
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-3">
                  <FiHome className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Shipping Address
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {order.customer.address}, {order.customer.city},{" "}
                    {order.customer.state} {order.customer.zipCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details and Order Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Details */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">
                  Customer Details
                </h2>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-center mb-4">
                  <FiMail className="text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">
                      {order.customer.email}
                    </p>
                  </div>
                </div>
                {order.customer.phone && (
                  <div className="flex items-center">
                    <FiPhone className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">
                        {order.customer.phone}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">
                  Order Items ({order.cart.length})
                </h2>
              </div>
              <div className="divide-y divide-gray-200">
                {order.cart.map((item) => (
                  <div key={item._id} className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">
                    Total
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-10 bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-medium text-gray-900">What's Next?</h2>
          </div>
          <div className="px-6 py-5">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-green-600 mr-3 mt-0.5">
                  <FiCheckCircle className="h-full w-full" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    Order confirmation sent
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    We've sent a confirmation email to {order.customer.email} with
                    your order details.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600 mr-3 mt-0.5">
                  <FiTruck className="h-full w-full" />
                </div>
                <div>
                  <p className="text-base font-medium text-gray-900">
                    Shipping updates
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    You'll receive another email when your order ships with
                    tracking information.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
          >
            Continue Shopping
          </button>
          <p className="mt-4 text-sm text-gray-500">
            Need help?{" "}
            <a
              href="/contact"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;