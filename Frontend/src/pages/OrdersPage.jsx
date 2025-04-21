import React, { useState, useEffect } from "react";
import { FiShoppingBag, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // Load orders from localStorage on component mount
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <FiShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No Orders Found
          </h3>
          <p className="mt-2 text-gray-500">
            You haven't placed any orders yet.
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h1>

      <div className="bg-white shadow-sm rounded-lg p-6">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="border-b border-gray-200 last:border-b-0 py-6"
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Order #{order.orderId}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on{" "}
                  {new Date(order.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              {/* <button
                onClick={() => handleViewOrder(order.orderId)}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View Details
                <FiChevronRight className="ml-1 h-4 w-4" />
              </button> */}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Shipping Information
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {order.customer.name}
                  <br />
                  {order.customer.address}
                  <br />
                  {order.customer.city}, {order.customer.state}{" "}
                  {order.customer.zipCode}
                  <br />
                  {order.customer.email}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-700">
                  Order Summary
                </h3>
                <div className="text-sm text-gray-500 mt-1">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      $
                      {order.cart
                        .reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {order.total -
                        order.cart.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        ) -
                        (order.total * 0.1) ===
                      0
                        ? "Free"
                        : "$5.99"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (10%)</span>
                    <span>${(order.total * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium text-gray-900 mt-2">
                    <span>Total</span>
                    <span>${order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Items Ordered
              </h3>
              <ul className="divide-y divide-gray-200">
                {order.cart.map((item) => (
                  <li key={item._id} className="py-3 flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-md object-cover border"
                    />
                    <div className="ml-4">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toLocaleString()} x {item.quantity}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700">
                Payment Method
              </h3>
              <p className="text-sm text-gray-500 capitalize">
                {order.paymentMethod.replace("_", " ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;