import React, { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signup(formData);
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      {/* Form container with consistent shadow and rounded corners */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden max-w-md w-full">
        {/* Header with matching gradient and typography */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
          <p className="mt-2 text-sm text-gray-200">Join us today</p>
        </div>
        
        {/* Form section with consistent padding and spacing */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name input with consistent styling */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiUser className="text-gray-500 h-5 w-5" />
              </div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
            
            {/* Email input with consistent styling */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-500 h-5 w-5" />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
            
            {/* Password input with consistent styling */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-500 h-5 w-5" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 text-sm sm:text-base"
              />
            </div>
            
            {/* Role select with consistent styling */}
            <div className="relative">
              <select
                name="role"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 text-sm sm:text-base appearance-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {/* Submit button with matching colors and loading state */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating account...' : (
                <>
                  Sign Up <FiArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          
          {/* Login link with consistent styling */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Already have an account?{' '}
              <button
                onClick={() => navigate("/login")}
                className="text-amber-400 font-medium hover:text-amber-500 transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;