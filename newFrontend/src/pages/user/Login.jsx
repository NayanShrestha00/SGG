import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/api/AuthServices";
import { loginWithGoogle } from "../../features/api/AuthServices";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth); // Get auth state
  const accessToken = useSelector((state) => state.auth.accessToken);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log(isAuthenticated);

  console.log(accessToken);


  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateInputs = () => {
    if (!data.email.trim() || !data.password.trim()) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      const response = await dispatch(login({ email: data.email, password: data.password }));
      if (response) {
        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Continue with Google
  const continueWithGoogle = async() => {
    // console.log("Google login clicked");
    try {
      const response = await dispatch(loginWithGoogle());
      if (response) {
        navigate('/');
      }
    } catch (error) {
      console.log("Google login failed:", error);
      
    }
  };

  return (
    <div className="flex md:pt-60 pt-44 flex-col justify-center items-center min-h-screen p-6 bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Card Container */}
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 relative">
        {/* Logo */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white p-2 border-8 border-white rounded-full shadow-lg">
          <img src="/LogoOnly.png" alt="logo" className="w-20 h-20" />
        </div>

        {/* Login Form */}
        <form className="mt-10" onSubmit={handleSubmit}>
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h3>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6 relative">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition placeholder-gray-400 pr-12"
                placeholder="Enter your password"
                required
              />
              <div
                className="absolute inset-y-0 right-4 flex items-center text-xl cursor-pointer text-gray-500 hover:text-gray-800 transition"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>


          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link
              to="/forgotpassword"
              className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className={`w-full py-3 font-semibold rounded-lg text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Continue with Google */}
          <button
            type="button"
            className="w-full py-3 mt-4 font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={continueWithGoogle}
          >
            Continue with Google
          </button>

          {/* Signup Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:text-blue-700 transition"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;