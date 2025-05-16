import { useState, useEffect } from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleError, handleSuccess } from "../../utils/Toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading";


const EnquiryForm = () => {

  // Predefined options
  const provinces = ["Province1", "Province2", "Province3"];
  const propertyTypes = ["Residential", "Commercial"];
  const purposes = ["Buy", "Rent"];

  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [data, setData] = useState({
    fullName: "",
    province: "",
    propertyType: "",
    mobileNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation check: Ensure no empty fields
    if (!data.fullName || !data.address || !data.propertyType || !data.purpose || !data.mobileNumber || !data.message) {
      console.log(data);
      handleError("All fields are required!");
      return;
    }
    dispatch(startLoading());
    try {
      const res = await axios.post(UserSummaryApi.EnqueryForm.url, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 || res.status === 201) {
        handleSuccess("Enquiry submitted successfully!");
        setData({ fullName: "", address: "", propertyType: "", purpose: "", mobileNumber: "", message: "" }); // Reset form
      } else {
        handleError("Something went wrong, please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      handleError(error.response?.data?.message || "Failed to submit enquiry!");
    }
    finally {
      dispatch(stopLoading());
    }
  };


  return (
    <section>
      {/* Top Part  */}
      <div className="h-[55vh] bg-cover bg-center relative" style={{ backgroundImage: `url("/posts.jpg")` }}>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        {/* Content */}
        <div className="absolute inset-x-0 top-0 bottom-10 flex items-end text-white">
          <div className="w-[67%] mx-auto flex flex-col gap-6">
            <h2 className="text-5xl font-bold capitalize">Enquary Form</h2>
            <div className="flex items-center gap-2">
              <Link to="/">
                <FaHouseChimney className="h-4 w-4 hover:text-[#519fff]" />
              </Link>
              <span>/</span>
              <p>Connect With Us</p>
            </div>
          </div>
        </div>

      </div>
      {/* Bottom Part */}
      <div className="max-w-6xl mx-auto py-12 p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-gray-200 p-4 flex flex-col items-center">
            <ul className="w-full space-y-4">
              <li className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg font-semibold w-full">
                <span className="w-8 h-8 bg-white text-blue-500 flex items-center justify-center rounded-full font-bold">
                  01
                </span>
                Information
              </li>
            </ul>
            <img
              src="/fsearch.png"
              className="hidden md:block w-full mt-4"
              alt="SGG Enquiry"
            />
          </div>

          {/* Form Section */}
          <div className="md:w-3/4 p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    value={data.fullName}
                    onChange={handleChange}
                    type="text"
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter your full name"
                  />
                </div>
                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Mobile Number
                  </label>
                  <input
                    name="mobileNumber"
                    value={data.mobileNumber}
                    onChange={handleChange}
                    type="text"
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter your mobile number"
                  />
                </div>
                {/* Property Type */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Property Type
                  </label>
                  <select
                    name="propertyType"
                    value={data.propertyType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="" disabled>Select property type</option>
                    {propertyTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Provience */}
                <div>
                  <label className="block text-gray-700 font-semibold">
                    Address
                  </label>
                  <select
                    name="province"
                    value={data.province}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="" disabled>Select province</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Message */}
                <div className="sm:col-span-2">
                  <label className="block text-gray-700 font-semibold">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter your message"
                  ></textarea>
                </div>
              </div>
              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryForm;
