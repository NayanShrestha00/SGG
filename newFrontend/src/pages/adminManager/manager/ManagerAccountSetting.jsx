import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../../utils/Toast"; // Import toast utilities

const ManagerAccountSetting = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const navigate = useNavigate();

  const changepassword = () => {
    setShowPasswordChange(!showPasswordChange);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.currentPassword.value;
    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (newPassword !== confirmPassword) {
      handleError("New password and confirm password do not match");
      return;
    }

    const role = user.role;
    const id = user._id;

    try {
      const response = await axios.patch(
        AdminManagerSummaryApi.ManagerChangePassword(role, id).url,
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      handleSuccess("Password updated successfully.");
      setShowPasswordChange(false); // Close the password change modal
      e.target.reset(); // Reset the form
    } catch (error) {
      console.error("Error changing password", error);
      handleError(error.response?.data?.message || "Failed to update password. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center  ${showPasswordChange ? 'blur-background' : ''}`}>
      <div className="w-full max-w-[95%] max-h-[90vh] p-8 bg-gray-800 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-3xl font-bold text-white mb-6">Account Settings</h1>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.fullName}
                disabled
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.email}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-300">Role</label>
              <input
                type="text"
                id="role"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.role}
                disabled
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Phone</label>
              <input
                type="text"
                id="phone"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.phone}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
              <input
                type="text"
                id="address"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.address}
                disabled
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-300">City</label>
              <input
                type="text"
                id="city"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.city}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-300">State</label>
              <input
                type="text"
                id="state"
                className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={user.state}
                disabled
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={changepassword}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {showPasswordChange && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
            <form className="space-y-6" onSubmit={handleChangePassword}>
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={changepassword}
                  className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerAccountSetting;