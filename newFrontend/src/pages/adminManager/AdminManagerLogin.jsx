import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { AMLogin } from "../../features/api/AuthServices";

const AdminManagerLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "Admin", // Default to admin
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await dispatch(AMLogin({ email: data.email, password: data.password, role: data.role }));
    
    console.log("Login API Response:", response); // Debugging
    
    if (response) {
      // console.log("Navigating to:", data.role === "Admin" ? "/admin/dashboard" : "/manager/dashboard");
      navigate(data.role === "Admin" ? "/admin/dashboard" : "/manager/dashboard");
    } else {
      console.error("Login failed:", response.payload?.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error logging in:", error.message || "Unknown error");
  }
  
  
  
  
};

  return (
    <div className="flex flex-col justify-center font-[sans-serif] p-4 md:pt-48 pt-32">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_#74b3ce] p-8 relative mt-12">
        <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
          <img src="/Logo Only.png" alt="logo" className="w-full inline-block" />
        </div>

        <form className="mt-12" onSubmit={handleSubmit}>
          <h3 className="text-xl font-bold text-[#08689a] mb-8 text-center">
            Admin/Manager Login
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Admin"
                  checked={data.role === "Admin"}
                  onChange={handleOnChange}
                  className="form-radio text-blue-700"
                />
                <span className="text-gray-800">Admin</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="role"
                  value="Manager"
                  checked={data.role === "Manager"}
                  onChange={handleOnChange}
                  className="form-radio text-blue-700"
                />
                <span className="text-gray-800">Manager</span>
              </label>
            </div>
            <input
              name="email"
              type="email"
              value={data.email}
              onChange={handleOnChange}
              className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
              placeholder="Enter email"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 pr-12 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Enter password"
                style={{
                  WebkitTextSecurity: !showPassword && data.password ? "disc" : "none",
                }}
              />
              {data.password && (
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-[#08689a] font-semibold hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none"
            >
              Login
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-800">
            Back to{" "}
            <Link
              to="/"
              className="text-[#08689a] font-semibold hover:underline ml-1"
            >
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminManagerLogin;
