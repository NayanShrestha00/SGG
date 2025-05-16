import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { AdminManagerSummaryApi } from "../../../features/common/AdminManagerSummaryApi";
import { handleError, handleSuccess } from "../../../utils/Toast";
import { useNavigate } from "react-router-dom";

const CreateManager = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    address: "",
    password: "",
    avatar: null,
    avatarPreview: null,
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: file,
          avatarPreview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      handleError("Please upload a valid image file.");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.fullName || !formData.email || !formData.mobileNumber || !formData.address || !formData.password) {
      handleError("All fields are required.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "avatarPreview") {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await axios.post(AdminManagerSummaryApi.CreateManager.url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      handleSuccess(response.data.message);
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        address: "",
        password: "",
        avatar: null,
        avatarPreview: null,
      });
      navigate("/admin/dashboard");
    } catch (error) {
      handleError(error.response?.data?.message || "Failed to create manager!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Create Manager</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { label: "Full Name", type: "text", name: "fullName" },
                { label: "Email", type: "email", name: "email" },
                { label: "Mobile Number", type: "tel", name: "mobileNumber" },
                { label: "Address", type: "text", name: "address" },
                { label: "Password", type: "password", name: "password" },
              ].map(({ label, type, name }) => (
                <div key={name} className="space-y-2">
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
              />
              {formData.avatarPreview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={formData.avatarPreview}
                    alt="Avatar Preview"
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-md"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 text-white font-semibold rounded-lg shadow-lg transition duration-300 ${
                  loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
              >
                {loading ? "Submitting..." : "Create Manager"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateManager;