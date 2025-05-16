import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils/Toast";
import axios from "axios";
import { UserSummaryApi } from '../../features/common/UserSummaryApi';

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
    code: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState(1); // Step 1: Confirm email, Step 2: Reset password
  const [loading, setLoading] = useState(false); // Button loading state

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmEmail = async (e) => {
    e.preventDefault();

    if (!data.email) {
      return handleError("Please enter your email address.");
    }

    try {
      const response = await axios.post(UserSummaryApi.ForgotPassword.url, {
        email: data.email,
      });
      handleSuccess(response.data.message || "OTP sent to your email.");
      setStep(2); // Move to reset password step
    }
    catch (error) {
      handleError(error.response?.data?.message || "Failed to send OTP. Please try again.");
      console.log(error);
      
    }
    
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!data.newPassword || !data.confirmPassword || !data.code) {
      return handleError("Please fill in all fields.");
    }

    if (data.newPassword !== data.confirmPassword) {
      return handleError("Passwords do not match.");
    }

    try {
      const response = await axios.patch(UserSummaryApi.ResetPassword.url, {
        code: data.code,
        newPassword: data.newPassword,
      });
      handleSuccess(response.data.message || "Password reset successful.");
      navigate("/login");
    } catch (error) {
      handleError(error.response?.data?.message || "Failed to reset password. Please try again.");
      console.log(error);
    }
  };

  


  return (
    <div className="flex flex-col justify-center font-[sans-serif] p-4 mt-20">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_#74b3ce] p-8 relative mt-12">
        <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
          <img src="/LogoOnly.png" alt="logo" className="w-full inline-block" />
        </div>

        {step === 1 ? (
          <form className="mt-12" onSubmit={handleConfirmEmail}>
            <h3 className="text-xl font-bold text-[#08689a] mb-8 text-center">Forgot Password</h3>
            <p className="text-sm text-gray-800 text-center mb-4">
              Enter your email address to confirm your identity.
            </p>
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                value={data.email}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Enter email"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none ${loading && "opacity-75 cursor-not-allowed"
                  }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Confirm"}
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">
              Remember your password?{" "}
              <Link to="/login" className="text-[#08689a] font-semibold hover:underline ml-1">
                Login here
              </Link>
            </p>
          </form>
        ) : (
          <form className="mt-12" onSubmit={handleResetPassword}>
            <h3 className="text-xl font-bold text-[#08689a] mb-8 text-center">Reset Password</h3>
            <p className="text-sm text-gray-800 text-center mb-4">
              Enter your new password, confirm it, and provide the OTP sent to your email.
            </p>
            <div className="space-y-4">
              <input
                name="newPassword"
                type="password"
                value={data.newPassword}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Enter new password"
              />
              <input
                name="confirmPassword"
                type="password"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Confirm new password"
              />
              <input
                name="code"
                type="text"
                value={data.code}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Enter OTP"
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none ${loading && "opacity-75 cursor-not-allowed"
                  }`}
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">
              Didn't receive the OTP?{" "}
              
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
