import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiCheckCircle, FiShoppingBag, FiTruck, FiHome } from "react-icons/fi";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const orderNumber = state?.orderNumber || Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                {/* Header */}
                <div className="bg-green-50 px-6 py-8 text-center">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <FiCheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h1 className="mt-4 text-3xl font-bold text-gray-900">Order Confirmed!</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Thank you for your purchase. Your order #{orderNumber} has been received.
                    </p>
                </div>

                {/* Order Summary */}
                <div className="px-6 py-8 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Shipping Address</h3>
                            <p className="text-gray-900">
                                123 Main Street<br />
                                New York, NY 10001<br />
                                United States
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 mb-2">Delivery Method</h3>
                            <div className="flex items-center">
                                <FiTruck className="h-5 w-5 text-gray-400 mr-2" />
                                <span className="text-gray-900">Standard Delivery (3-5 business days)</span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Estimated delivery: {estimatedDelivery.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-8 border-b border-gray-200">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Items in your order</h3>
                    <div className="space-y-6">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex">
                                <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden border border-gray-200">
                                    <img
                                        src={`https://source.unsplash.com/random/300x300?product=${item}`}
                                        alt="Product"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h4 className="text-sm font-medium text-gray-900">Product {item}</h4>
                                    <p className="mt-1 text-sm text-gray-500">Color: Black</p>
                                    <p className="mt-1 text-sm text-gray-500">Size: Medium</p>
                                    <p className="mt-2 text-sm font-medium text-gray-900">$29.99</p>
                                </div>
                                <div className="ml-4 text-sm text-gray-500">
                                    Qty: 1
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Order Total */}
                <div className="px-6 py-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Total</h3>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="text-gray-900">$89.97</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-gray-900">Free</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Tax</span>
                            <span className="text-gray-900">$8.10</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-4">
                            <span className="font-medium text-gray-900">Total</span>
                            <span className="font-bold text-lg text-gray-900">$98.07</span>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gray-50 px-6 py-8 text-center">
                    <p className="text-gray-600 mb-6">
                        We've sent a confirmation email with your order details.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button
                            onClick={() => navigate("/")}
                            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => navigate("/orders")}
                            className="px-6 py-3 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            View Order Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;