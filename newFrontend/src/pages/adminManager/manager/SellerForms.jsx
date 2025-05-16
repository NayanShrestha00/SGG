import { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi';
import { useSelector } from 'react-redux';

const SellerForms = () => {
  const [sellerForms, setSellerForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchSellerForms = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.SellerForms.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setSellerForms(response.data.data);
      } catch (error) {
        console.error("Error fetching Seller Forms:", error);
      }
    };
    fetchSellerForms();
  }, [accessToken]);

  const handleShowData = async (sellerId) => {
    try {
      const response = await axios.get(AdminManagerSummaryApi.SingleSellerData(sellerId).url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedForm(response.data.data);
    } catch (error) {
      console.error("Error fetching Seller Form data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedForm(null);
  };

  const handleSellerState = async (sellerId, newState) => {
    try {
      const response = await axios.patch(AdminManagerSummaryApi.ChangeSellerState(sellerId).url, { state: newState }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const updatedForms = sellerForms.map((form) =>
        form._id === sellerId ? { ...form, state: newState } : form
      );
      setSellerForms(updatedForms);
      console.log(response);
    } catch (error) {
      console.error("Error changing Seller State:", error);
    }
  };

  const handleStateChange = (sellerId, event) => {
    const newState = event.target.value;
    handleSellerState(sellerId, newState);
  };
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Seller Forms</h1>

      {/* Seller Forms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellerForms.length > 0 ? (
          sellerForms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
            >
              <div className="space-y-2" onClick={() => handleShowData(form._id)}>
                <p className="text-lg font-semibold text-gray-800">{form.fullName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Discription:</span> {form.discription}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Mobile Number:</span> {form.mobileNumber}</p>
              </div>
              <select
                value={form.state}
                onChange={(event) => handleStateChange(form._id, event)}
                className="mt-3 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No seller forms available.</p>
        )}
      </div>

      {/* Modal for Selected Form Details */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seller Form Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Full Name:</span> {selectedForm.fullName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Land Type:</span> {selectedForm.landType}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land Address:</span> {selectedForm.landAddress}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Provience:</span> {selectedForm.provience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {selectedForm.state}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Mobile Number:</span> {selectedForm.mobileNumber}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Land Category:</span> {selectedForm.landCategory}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Property Title:</span> {selectedForm.propertyTitle}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Facilities:</span> {selectedForm.facilities.join(', ')}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Discription:</span> {selectedForm.discription}</p>
              </div>
            </div>
            <button
              className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerForms;