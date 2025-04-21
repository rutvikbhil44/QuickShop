import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (replace with actual API call)
    toast.success("Message sent! We'll get back to you soon.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: true,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
          Have questions or need assistance? Reach out to our friendly team, and we’ll respond as soon as possible.
        </p>
      </div>

      {/* Contact Form and Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12">
        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
            Send Us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900"
                placeholder="Your email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-gray-900"
                placeholder="Your message"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div>
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
              Get in Touch
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Email
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  <a
                    href="mailto:support@quickshop.com"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    support@quickshop.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Phone
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  <a
                    href="tel:+18001234567"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    +1 (800) 123-4567
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  Address
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  123 QuickShop Lane, Suite 100
                  <br />
                  San Francisco, CA 94105, USA
                </p>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            <img
              src="https://source.unsplash.com/random/500x300?map"
              alt="QuickShop location map"
              className="w-full h-48 sm:h-64 object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;