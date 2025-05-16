import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { handleError, handleSuccess } from '../../utils/Toast';
import { UserSummaryApi } from '../../features/common/UserSummaryApi';

const Register = () => {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    currentAddress: '',
    password: '',
    confirmPassword: '',
    code: '',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.fullName || !data.email || !data.mobileNumber || !data.currentAddress || !data.password || !data.confirmPassword) {
      return handleError('Please fill in all the required fields.');
    }

    if (data.password !== data.confirmPassword) {
      return handleError('Passwords do not match.');
    }

    setLoading(true);
    try {
      const response = await axios.post(UserSummaryApi.SignUp.url, {
        fullName: data.fullName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        currentAddress: data.currentAddress,
        password: data.password,
      });

      handleSuccess(response.data.message || 'Account created successfully. Please verify your email.');
      setShowOtpSection(true);
    } catch (error) {
      handleError(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!data.code) {
      return handleError('Please enter the OTP.');
    }

    setLoading(true);
    try {
      const response = await axios.post(UserSummaryApi.VerifyEmail.url, {
        code: data.code,
        email: data.email,
      });

      handleSuccess(response.data.message || 'Account verified successfully!');
      navigate('/login');
    } catch (error) {
      handleError(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(UserSummaryApi.ResendOtp.url, {
        email: data.email,
      });

      handleSuccess(response.data.message || 'OTP has been resent to your email.');
    } catch (error) {
      handleError(error.response?.data?.message);
      console.log(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] p-4 mt-20">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-2px_#74b3ce] p-8 relative mt-12">
        <div className="bg-white w-24 h-24 border-[10px] p-1.5 absolute left-0 right-0 mx-auto -top-12 rounded-full overflow-hidden">
          <img src="/LogoOnly.png" alt="logo" className="w-full inline-block" />
        </div>

        {!showOtpSection ? (
          <form className="mt-12" onSubmit={handleSubmit}>
            <h3 className="text-xl font-bold text-[#08689a] mb-8 text-center">Create Account</h3>
            <div className="space-y-4">
              <input
                name="fullName"
                type="text"
                value={data.fullName}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Full Name"
              />
              <input
                name="email"
                type="email"
                value={data.email}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Email"
              />
              <input
                name="mobileNumber"
                type="text"
                value={data.mobileNumber}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Mobile Number"
              />
              <input
                name="currentAddress"
                type="text"
                value={data.currentAddress}
                onChange={handleOnChange}
                className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 focus:bg-transparent outline-blue-700 transition-all"
                placeholder="Current Address"
              />
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={data.password}
                  onChange={handleOnChange}
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 pr-12 focus:bg-transparent outline-blue-700 transition-all"
                  placeholder="Password"
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
              <div className="relative">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  className="bg-gray-100 w-full text-sm text-gray-800 px-4 py-4 pr-12 focus:bg-transparent outline-blue-700 transition-all"
                  placeholder="Confirm Password"
                />
                {data.confirmPassword && (
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl cursor-pointer text-gray-600 hover:text-gray-800"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={`w-full py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none ${
                  loading && 'opacity-75 cursor-not-allowed'
                }`}
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-[#08689a] font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        ) : (
          <form className="mt-12" onSubmit={handleOtpSubmit}>
            <h3 className="text-xl font-bold text-[#08689a] mb-8 text-center">Verify OTP</h3>
            <p className="text-sm text-gray-800 text-center mb-4">
              A verification code has been sent to your email.
            </p>
            <div className="space-y-4">
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
                className={`w-full py-4 px-8 rounded text-lg tracking-wide font-semibold text-white bg-blue-700 hover:bg-blue-600 focus:outline-none ${
                  loading && 'opacity-75 cursor-not-allowed'
                }`}
                disabled={loading}
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
            <p className="text-sm mt-8 text-center text-gray-800">
              Didn’t receive the code?{' '}
              <button
                type="button"
                className="text-[#08689a] font-semibold hover:underline ml-1"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
