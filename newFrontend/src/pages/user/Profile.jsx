import { useState } from "react";
import { useSelector } from "react-redux";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import { handleError, handleSuccess } from "../../utils/Toast";
import { FaUser, FaEnvelope, FaPhone, FaMapMarker, FaLock, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../store/authSlice";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from "react";
import api from "../../features/api/Api";

const libraries = ["places"];


const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const role = user.data.role;
  const userId = user.data._id;
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [editingSection, setEditingSection] = useState(null); // Tracks which section is being edited

  

  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'API_KEY',
    libraries,
  });

  const handleOnPlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const fullAddress = places[0].formatted_address;
        setFormData({ ...formData, currentAddress: fullAddress });
      }
    }
  };

  const [formData, setFormData] = useState({
    fullName: user?.data.fullName || "",
    mobileNumber: user?.data.mobileNumber || "",
    currentAddress: user?.data.currentAddress || "",
    email: user?.data.email || "",
    code: "",
    newEmail: user?.data.email || "",
    oldPassword: "",
    newPassword: "",
  });
  const [isOtpStep, setIsOtpStep] = useState(false); // Tracks OTP step for email update

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (section) => {
    setEditingSection(section);
    if (section === "email" && user.data.isEmailUpdating === false) setIsOtpStep(false)
    else if (section === "email" && user.data.isEmailUpdating === true) setIsOtpStep(true)
  };

  const handleSave = async (section) => {
    if (section === "profile") {
      try {
        const response = await api.patch(UserSummaryApi.EditUserProfile(role, userId).url, {
          fullName: formData.fullName,
          mobileNumber: formData.mobileNumber,
          currentAddress: formData.currentAddress,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        handleSuccess(response.data.message || "Profile updated successfully.");
        setEditingSection(null); // Exit edit mode
      } catch (error) {
        handleError(error.response.data.message || "Profile update failed. Please try again.");
      }

      // Fetch user details
      const userResponse = await axios.get(UserSummaryApi.UserDetials.url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const user = userResponse.data;
      dispatch(setUserData(user));

    }
    if (section === "password") {
      try {
        const response = await axios.patch(UserSummaryApi.ChangeUserPassword(role, userId).url, {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        handleSuccess("Password updated successfully.");
        setEditingSection(null); 
        setFormData({ ...formData, oldPassword: "", newPassword: "" });
        
      } catch (error) {
        handleError("Password update failed. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setEditingSection(null); // Reset editing section on cancel
    setIsOtpStep(false); // Reset OTP step
  };

  const handleSendOtpToNewEmail = async () => {
    if (!formData.newEmail) {
      return handleError("Please enter a new email address.");
    }
    try {
      const response = await axios.patch(UserSummaryApi.ChangeUserEmail.url, {
        email: formData.newEmail,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      handleSuccess(response.data.message || "OTP sent to new email address.");
      if (response.data.success) {
        setIsOtpStep(true);
      }
    }
    catch (error) {
      handleError(error.response.data.message || "Failed to send OTP to new email address.");
    }

  };

  const handleResendOtp = async () => {

    try {
      const response = await axios.post(UserSummaryApi.ResendNewOtp.url, {
        email: formData.newEmail,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      handleSuccess("OTP sent");
    }
    catch (error) {
      handleError(error.response.data.message || "Failed to send OTP to new email address.");
    }
  };

  const handleVerifyNewEmail = async () => {
    try {
      const response = await axios.post(UserSummaryApi.VerifyNewEmail.url, {
        code: formData.code,
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      handleSuccess(response.data.message || "Email verified successfully.");
      setFormData({ ...formData, code: "" });
      setEditingSection(null); // Exit edit mode
    } catch (error) {
      handleError(error.response.data.message || "Failed to verify email. Please try again.");
    }
    // Fetch user details
    const userResponse = await axios.get(UserSummaryApi.UserDetials.url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const user = userResponse.data;
    dispatch(setUserData(user));
  }


  return (
    <div className="min-h-screen md:pt-52 pt-32 bg-gradient-to-r from-blue-50 to-purple-50 py-10 px-4 sm:px-6 lg:px-8">
      {user ? (
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-20 md:h-32 relative">
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">{user.data.fullName}</h1>
              <p className="text-gray-600">{user.data.email}</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaUser className="text-blue-600" /> Personal Information
                </h2>
                {editingSection !== "profile" ? (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    onClick={() => handleEdit("profile")}
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                      onClick={() => handleSave("profile")}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                      onClick={handleCancel}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
              {editingSection === "profile" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    />
                  </div>
                  {/* address  */}
                  <div>
                    <label className="block text-gray-700 font-semibold">Address</label>
                    {isLoaded && (
                      <StandaloneSearchBox
                        onLoad={(ref) => (inputRef.current = ref)}
                        onPlacesChanged={handleOnPlaceChanged}
                      >
                        <input
                          type="text"
                          name="currentAddress"
                          value={formData.currentAddress || ""}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                          placeholder="Enter your address"
                        />
                      </StandaloneSearchBox>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Full Name</label>
                    <p className="text-lg font-semibold text-gray-800">{user.data.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
                    <p className="text-lg font-semibold text-gray-800">{user.data.mobileNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Current Address</label>
                    <p className="text-lg font-semibold text-gray-800">{user.data.currentAddress}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Email Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaEnvelope className="text-blue-600" /> Email
                </h2>
                {editingSection !== "email" ? (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    onClick={() => handleEdit("email")}
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                      onClick={handleCancel}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
              {editingSection === "email" ? (
                <div className="space-y-4">
                  {!isOtpStep ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">New Email</label>
                      <input
                        type="email"
                        name="newEmail"
                        value={formData.newEmail}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                      />
                      <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition mt-4"
                        onClick={() => {
                          // Send OTP to new email
                          handleSendOtpToNewEmail();
                        }}
                      >
                        Request OTP
                      </button>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-600">Enter OTP</label>
                      <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                      />
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mt-4 mr-5"
                        onClick={() => handleVerifyNewEmail()}
                      >
                        Verify & Save
                      </button>
                      <button
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition mt-4"
                        onClick={() => handleResendOtp()}
                      >
                        Resend OTP
                      </button>

                    </div>
                  )}
                </div>
              ) : (
                <p className="text-lg font-semibold text-gray-800">{user.data.email}</p>
              )}
            </div>

            {/* Password Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <FaLock className="text-blue-600" /> Password
                </h2>
                {editingSection !== "password" ? (
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    onClick={() => handleEdit("password")}
                  >
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                      onClick={() => handleSave("password")}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                      onClick={handleCancel}
                    >
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
              {editingSection === "password" ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Current Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg mt-1"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-lg font-semibold text-gray-800">********</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600 text-center">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;