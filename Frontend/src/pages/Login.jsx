import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await login(formData);
      loginUser(data.user);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
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
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-200">Login to access your account</p>
        </div>
        
        {/* Form section with consistent padding and spacing */}
        <div className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            
            {/* Submit button with matching colors and loading state */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Logging in...' : (
                <>
                  Login <FiArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          
          {/* Forgot password link with consistent link styling */}
          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-amber-400 hover:text-amber-500 font-medium transition-colors">
              Forgot password?
            </a>
          </div>
          
          {/* Signup link with consistent styling */}
          <div className="mt-6 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{' '}
              <button
                onClick={() => navigate("/signup")}
                className="text-amber-400 font-medium hover:text-amber-500 transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;