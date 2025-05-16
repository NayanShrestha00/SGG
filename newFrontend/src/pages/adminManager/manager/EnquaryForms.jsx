import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminManagerSummaryApi } from '../../../features/common/AdminManagerSummaryApi';
import { useSelector } from 'react-redux';

const EnquaryForms = () => {
  const [enquaryForms, setEnquaryForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const fetchEnquaryForms = async () => {
      try {
        const response = await axios.get(AdminManagerSummaryApi.EnquaryForms.url, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setEnquaryForms(response.data.data);
      } catch (error) {
        console.error("Error fetching Enquary Forms:", error);
      }
    };
    fetchEnquaryForms();
  }, [accessToken]);

  const handleShowData = async (formId) => {
    try {
      const response = await axios.get(AdminManagerSummaryApi.SingleEnquaryData(formId).url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setSelectedForm(response.data.data);
    } catch (error) {
      console.error("Error fetching Enquary Form data:", error);
    }
  };

  const handleCloseModal = () => {
    setSelectedForm(null);
  };

  const handleEnquaryState = async (enqueryId, newState) => {
    try {
      const response = await axios.patch(AdminManagerSummaryApi.ChangeEnquaryState(enqueryId).url, { state: newState }, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const updatedForms = enquaryForms.map((form) =>
        form._id === enqueryId ? { ...form, state: newState } : form
      );
      setEnquaryForms(updatedForms);
      console.log(response);
    } catch (error) {
      console.error("Error changing Enquary State:", error);
    }
  };

  const handleStateChange = (enqueryId, event) => {
    const newState = event.target.value;
    handleEnquaryState(enqueryId, newState);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Enquary Forms</h1>

      {/* Enquary Forms List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enquaryForms.length > 0 ? (
          enquaryForms.map((form) => (
            <div
              key={form._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 cursor-pointer"
            >
              <div className="space-y-2" onClick={() => handleShowData(form._id)}>
                <p className="text-lg font-semibold text-gray-800">{form.fullName}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Current Address:</span> {form.currentAddress}</p>
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
          <p className="text-gray-600">No enquary forms available.</p>
        )}
      </div>

      {/* Modal for Selected Form Details */}
      {selectedForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Enquary Form Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Full Name:</span> {selectedForm.fullName}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Current Address:</span> {selectedForm.currentAddress}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Email:</span> {selectedForm.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600"><span className="font-medium">Mobile Number:</span> {selectedForm.mobileNumber}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Property Type:</span> {selectedForm.propertyType}</p>
                  <p className="text-sm text-gray-600"><span className="font-medium">Purpose:</span> {selectedForm.purpose}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600"><span className="font-medium">Address:</span> {selectedForm.address}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">Message:</span> {selectedForm.message}</p>
                <p className="text-sm text-gray-600"><span className="font-medium">State:</span> {selectedForm.state}</p>
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

export default EnquaryForms;