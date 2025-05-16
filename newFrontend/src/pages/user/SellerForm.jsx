import { useState, useEffect } from "react";
import { FaHouseChimney } from "react-icons/fa6";
import { UserSummaryApi } from "../../features/common/UserSummaryApi";
import axios from "axios";
import { useSelector } from "react-redux";
import { handleError, handleSuccess } from "../../utils/Toast";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../../store/loading";
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useRef } from "react";

const libraries = ["places"];

const SellerForm = () => {
  // Predefined options
  const provinces = ["Province1", "Province2", "Province3"];
  const landTypes = ["residential", "commercial"];
  const categories = ["house", "land", "flat", "apartment", "officeSpace"];
  const token = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  // Map 
  const inputRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'API_KEY',
    libraries,
  });

  const [data, setData] = useState({
    propertyTitle: "",
    landAddress: "",
    province: "",
    landType: "",
    landCategory: "",
    mobileNumber: "",
    facilities: [],
    discription: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnPlaceChanged = () => {
    if (inputRef.current) {
      const places = inputRef.current.getPlaces();
      if (places && places.length > 0) {
        const fullAddress = places[0].formatted_address;
        setData({
          ...data,
          landAddress: fullAddress,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(startLoading());
    try {
      const response = await axios.post(UserSummaryApi.SellerForm.url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleSuccess(response.data.message);
      console.log(response);

      setData({
        propertyTitle: "",
        landAddress: "",
        province: "",
        landType: "",
        landCategory: "",
        mobileNumber: "",
        facilities: [],
        discription: "",
      });
    } catch (error) {
      handleError(error.response.data.error);
      console.log(data);

      console.log(error);

    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <section>
      {/* Top Part */}
      <div className="h-[55vh] bg-cover bg-center relative" style={{ backgroundImage: `url("/posts.jpg")` }}>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
        {/* Content */}
        <div className="absolute inset-x-0 top-0 bottom-10 flex items-end text-white">
          <div className="w-[90%] md:w-[67%] mx-auto flex flex-col gap-4 md:gap-6 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-bold capitalize">Seller Form</h2>
            <div className="flex justify-center md:justify-start items-center gap-2">
              <Link to="/">
                <FaHouseChimney className="h-4 w-4 hover:text-[#519fff]" />
              </Link>
              <span>/</span>
              <p>Fill Your Details</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Part */}
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-1/4 bg-gray-200 p-4 flex flex-col items-center">
            <ul className="w-full space-y-4">
              <li className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-lg font-semibold w-full">
                <span className="w-8 h-8 bg-white text-blue-500 flex items-center justify-center rounded-full font-bold">01</span>
                Information
              </li>
            </ul>
            <img src="/sale.png" className="hidden md:block w-full mt-4" alt="SGG Sale" />
          </div>

          {/* Form Section */}
          <div className="md:w-3/4 p-6">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Property Title */}
                <div>
                  <label className="block text-gray-700 font-semibold">Property Title</label>
                  <input
                    name="propertyTitle"
                    value={data.propertyTitle}
                    onChange={handleChange}
                    type="text"
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter property title"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-gray-700 font-semibold">Address</label>
                  {isLoaded && (
                    <StandaloneSearchBox
                      onLoad={(ref) => (inputRef.current = ref)}
                      onPlacesChanged={handleOnPlaceChanged}
                    >
                      <input
                        name="landAddress"
                        value={data.landAddress}
                        onChange={handleChange}
                        type="text"
                        className="w-full border p-2 rounded-lg mt-1"
                        placeholder="Enter address"
                      />
                    </StandaloneSearchBox>
                  )}
                </div>


                {/* Province */}
                <div>
                  <label className="block text-gray-700 font-semibold">Province</label>
                  <select
                    name="province"
                    value={data.province}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="" disabled>Select province</option>
                    {provinces.map((province, index) => (
                      <option key={index} value={province}>{province}</option>
                    ))}
                  </select>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-gray-700 font-semibold">Property Type</label>
                  <select
                    name="landType"
                    value={data.landType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="" disabled>Select property type</option>
                    {landTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Land Category */}
                <div>
                  <label className="block text-gray-700 font-semibold">Land Category</label>
                  <select
                    name="landCategory"
                    value={data.landCategory}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg mt-1"
                  >
                    <option value="" disabled>Select land category</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-gray-700 font-semibold">Mobile Number</label>
                  <input
                    name="mobileNumber"
                    value={data.mobileNumber}
                    onChange={handleChange}
                    type="text"
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter mobile number"
                  />
                </div>

                {/* Facilities */}
                <div>
                  <label className="block text-gray-700 font-semibold">Facilities</label>
                  <input
                    name="facilities"
                    value={data.facilities.join(",")}
                    onChange={(e) => setData({ ...data, facilities: e.target.value.split(",") })}
                    type="text"
                    className="w-full border p-2 rounded-lg mt-1"
                    placeholder="Enter facilities (comma-separated)"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-700 font-semibold">Description</label>
                <textarea
                  name="discription"
                  value={data.discription}
                  onChange={handleChange}
                  className="w-full border p-2 rounded-lg mt-1"
                  placeholder="Enter description"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                >
                  Submit Seller Form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SellerForm;